"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Branch, DeliveryZone } from "@/types";
import { getBranches } from "@/lib/api";
import { LocationModal } from "@/components/location-modal";

type Coordinates = { lat: number; lng: number } | null;

type LocationState = {
  branch: Branch | null;
  zone: DeliveryZone | null;
  address: string;
  coordinates: Coordinates;
};

type LocationContextValue = LocationState & {
  loading: boolean;
  openModal: () => void;
  setManualLocation: (payload: { address?: string; coordinates?: Coordinates }) => void;
};

const STORAGE_KEY = "kamolon-location";

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LocationState>({ branch: null, zone: null, address: "", coordinates: null });
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [persistedSelection, setPersistedSelection] = useState<{
    branchId: number | null;
    zoneId: number | null;
    address: string;
    coordinates: Coordinates;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPersistedSelection({
          branchId: parsed.branchId ?? null,
          zoneId: parsed.zoneId ?? null,
          address: parsed.address ?? "",
          coordinates:
            typeof parsed.latitude === "number" && typeof parsed.longitude === "number"
              ? { lat: parsed.latitude, lng: parsed.longitude }
              : null,
        });
      }
    } catch (error) {
      console.warn("Failed to parse location storage", error);
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
      address: persistedSelection.address ?? "",
      coordinates: persistedSelection.coordinates ?? null,
    });
    setPersistedSelection(null);
  }, [branches, persistedSelection]);

  const persistState = (next: LocationState) => {
    if (typeof window === "undefined") return;
    const payload = {
      branchId: next.branch?.id ?? null,
      zoneId: next.zone?.id ?? null,
      address: next.address ?? "",
      latitude: next.coordinates?.lat ?? null,
      longitude: next.coordinates?.lng ?? null,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const handleApply = (payload: { branch: Branch | null; zone: DeliveryZone | null; address: string }) => {
    const sanitizedZone =
      payload.branch && payload.zone
        ? payload.branch.zones.find((zone) => zone.id === payload.zone?.id) ?? null
        : null;

    const nextState: LocationState = {
      branch: payload.branch,
      zone: sanitizedZone,
      address: payload.address ?? "",
      coordinates: state.coordinates,
    };
    setState(nextState);
    persistState(nextState);
    setModalOpen(false);
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
      openModal: () => setModalOpen(true),
      setManualLocation,
    }),
    [state, loadingBranches],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
      <LocationModal
        open={isModalOpen}
        loading={loadingBranches}
        branches={branches}
        currentSelection={state}
        onClose={() => setModalOpen(false)}
        onApply={handleApply}
      />
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return ctx;
}
