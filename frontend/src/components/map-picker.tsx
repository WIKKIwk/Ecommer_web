"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Crosshair, Loader2, MapPin, Search } from "lucide-react";
import clsx from "clsx";

type Coordinates = {
  lat: number;
  lng: number;
};

type Suggestion = {
  placeId: string;
  name: string;
  coordinates: Coordinates;
};

type MapPickerProps = {
  coordinates: Coordinates | null;
  onCoordinatesChange: (coords: Coordinates) => void;
  address: string;
  onAddressChange: (value: string) => void;
};

const DEFAULT_CENTER: Coordinates = {
  lat: 41.311081,
  lng: 69.240562,
};

const MapCanvas = dynamic(() => import("./map-picker-map").then((mod) => mod.MapPickerMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 flex-col items-center justify-center text-neutral-500">
      <Loader2 className="mb-2 h-6 w-6 animate-spin" />
      Xarita yuklanmoqda…
    </div>
  ),
});

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const NOMINATIM_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@custom-ecommer.local";

export function MapPicker({ coordinates, onCoordinatesChange, address, onAddressChange }: MapPickerProps) {
  const [viewCoords, setViewCoords] = useState<Coordinates>(coordinates ?? DEFAULT_CENTER);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (coordinates) {
      setViewCoords(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        const url = new URL(NOMINATIM_URL);
        url.searchParams.set("q", search);
        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("limit", "5");
        url.searchParams.set("accept-language", "uz");
        url.searchParams.set("email", NOMINATIM_EMAIL);
        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Nominatim qidiruvida xatolik");
        }
        const data = (await response.json()) as Array<{
          place_id: number;
          display_name: string;
          lat: string;
          lon: string;
        }>;
        setSuggestions(
          data.map((item) => ({
            placeId: String(item.place_id),
            name: item.display_name,
            coordinates: { lat: Number(item.lat), lng: Number(item.lon) },
          })),
        );
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.warn("Nominatim error:", error);
          setSuggestions([]);
        }
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 350);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  const handleSuggestSelect = useCallback(
    (suggestion: Suggestion) => {
      setViewCoords(suggestion.coordinates);
      onCoordinatesChange(suggestion.coordinates);
      onAddressChange(suggestion.name);
      setSuggestions([]);
      setSearch("");
    },
    [onAddressChange, onCoordinatesChange],
  );

  const [locating, setLocating] = useState(false);
  const helperText = useMemo(
    () =>
      "Xaritadan manzilni belgilang yoki qidiruvdan toping. Belgilangan koordinatalar buyurtma bilan yuboriladi.",
    [],
  );

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setViewCoords(coords);
        onCoordinatesChange(coords);
        setLocating(false);
      },
      () => {
        alert("Joylashuvni aniqlab bo‘lmadi. Brauzer ruxsatini tekshiring.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Manzil qidiruvi (masalan, Chilonzor 17, 12-uy)"
          className="w-full rounded-2xl border border-neutral-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleLocateMe}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 text-neutral-600 hover:border-neutral-300"
          title="Joylashuvni aniqlash"
        >
          {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crosshair className="h-4 w-4" />}
        </button>
        {suggestions.length ? (
          <div className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-neutral-100 bg-white text-sm shadow-xl">
            {suggestions.map((item) => (
              <button
                key={item.placeId}
                type="button"
                onClick={() => handleSuggestSelect(item)}
                className="w-full border-b border-neutral-50 px-4 py-3 text-left hover:bg-neutral-50 last:border-b-0"
              >
                {item.name}
              </button>
            ))}
          </div>
        ) : search.trim() ? (
          <div className="absolute z-20 mt-2 w-full rounded-2xl border border-neutral-100 bg-white px-4 py-3 text-sm text-neutral-500 shadow-xl">
            Manzil topilmadi. Boshqa variantni kiriting.
          </div>
        ) : null}
        {loadingSuggestions ? (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-neutral-400" />
        ) : null}
      </div>
      <div className="rounded-[28px] border border-neutral-100 bg-neutral-50 p-2 shadow-inner">
        <div className="relative h-72 overflow-hidden rounded-[24px]">
          <MapCanvas
            coordinates={viewCoords}
            onMapClick={(coords) => {
              setViewCoords(coords);
              onCoordinatesChange(coords);
            }}
          />
        </div>
        <p className={clsx("mt-3 text-xs text-neutral-500 flex items-center gap-2")}>
          <MapPin className="h-3 w-3" />
          {helperText}
        </p>
      </div>
    </div>
  );
}
