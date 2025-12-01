import type { Branch } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

async function safeFetch<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`${API_BASE_URL}${path}`);
        if (!res.ok) {
            throw new Error(`Request failed ${res.status}`);
        }
        return (await res.json()) as T;
    } catch (error) {
        console.warn('[api] Error fetching data:', error);
        return null;
    }
}

export async function getBranches(): Promise<Branch[]> {
    type DeliveryZoneResponse = {
        id: number;
        name: string;
        min_order_amount: string | number;
        delivery_fee: string | number;
        eta_minutes: number;
    };
    type BranchResponse = {
        id: number;
        name: string;
        slug: string;
        address: string;
        phone: string;
        map_url?: string | null;
        latitude?: number | null;
        longitude?: number | null;
        working_hours?: string | null;
        delivery_radius_km?: number | null;
        zones: DeliveryZoneResponse[];
    };

    const data = await safeFetch<BranchResponse[]>('/branches/');
    if (!data) {
        return [];
    }

    return data.map((branch) => ({
        id: branch.id,
        name: branch.name,
        slug: branch.slug,
        address: branch.address,
        phone: branch.phone,
        mapUrl: branch.map_url ?? null,
        latitude: branch.latitude ?? null,
        longitude: branch.longitude ?? null,
        workingHours: branch.working_hours ?? null,
        deliveryRadiusKm: branch.delivery_radius_km ?? null,
        zones: (branch.zones ?? []).map((zone) => ({
            id: zone.id,
            name: zone.name,
            minOrderAmount: Number(zone.min_order_amount),
            deliveryFee: Number(zone.delivery_fee),
            etaMinutes: zone.eta_minutes,
        })),
    }));
}
