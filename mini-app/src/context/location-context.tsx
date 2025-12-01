import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Branch, DeliveryZone } from '../types';
import { getBranches } from '../lib/api';

type Coordinates = { lat: number; lng: number } | null;

type LocationState = {
    branch: Branch | null;
    zone: DeliveryZone | null;
    address: string;
    coordinates: Coordinates;
};

type LocationContextValue = LocationState & {
    loading: boolean;
    branches: Branch[];
    setLocation: (branch: Branch | null, zone: DeliveryZone | null, address: string) => void;
    setManualLocation: (payload: { address?: string; coordinates?: Coordinates }) => void;
};

const STORAGE_KEY = 'kamolon-location';

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<LocationState>({
        branch: null,
        zone: null,
        address: '',
        coordinates: null,
    });
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loadingBranches, setLoadingBranches] = useState(true);
    const [persistedSelection, setPersistedSelection] = useState<{
        branchId: number | null;
        zoneId: number | null;
        address: string;
        coordinates: Coordinates;
    } | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                setPersistedSelection({
                    branchId: parsed.branchId ?? null,
                    zoneId: parsed.zoneId ?? null,
                    address: parsed.address ?? '',
                    coordinates:
                        typeof parsed.latitude === 'number' && typeof parsed.longitude === 'number'
                            ? { lat: parsed.latitude, lng: parsed.longitude }
                            : null,
                });
            }
        } catch (error) {
            console.warn('Failed to parse location storage', error);
        }
    }, []);

    useEffect(() => {
        let active = true;
        (async () => {
            setLoadingBranches(true);
            const branchList = await getBranches();
            if (!active) return;
            setBranches(branchList);
            setLoadingBranches(false);
        })();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!persistedSelection || !branches.length) return;
        const branch = branches.find((item) => item.id === persistedSelection.branchId) ?? null;
        const zone = branch?.zones.find((item) => item.id === persistedSelection.zoneId) ?? null;
        setState({
            branch,
            zone: zone ?? null,
            address: persistedSelection.address ?? '',
            coordinates: persistedSelection.coordinates ?? null,
        });
        setPersistedSelection(null);
    }, [branches, persistedSelection]);

    const persistState = (next: LocationState) => {
        const payload = {
            branchId: next.branch?.id ?? null,
            zoneId: next.zone?.id ?? null,
            address: next.address ?? '',
            latitude: next.coordinates?.lat ?? null,
            longitude: next.coordinates?.lng ?? null,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    };

    const setLocation = (branch: Branch | null, zone: DeliveryZone | null, address: string) => {
        const nextState: LocationState = {
            branch,
            zone,
            address,
            coordinates: state.coordinates,
        };
        setState(nextState);
        persistState(nextState);
    };

    const setManualLocation = (payload: { address?: string; coordinates?: Coordinates }) => {
        setState((prev) => {
            const next: LocationState = {
                ...prev,
                address: payload.address ?? prev.address,
                coordinates: payload.coordinates === undefined ? prev.coordinates : payload.coordinates,
            };
            persistState(next);
            return next;
        });
    };

    const value = useMemo<LocationContextValue>(
        () => ({
            ...state,
            loading: loadingBranches,
            branches,
            setLocation,
            setManualLocation,
        }),
        [state, loadingBranches, branches]
    );

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
    const ctx = useContext(LocationContext);
    if (!ctx) {
        throw new Error('useLocation must be used within LocationProvider');
    }
    return ctx;
}
