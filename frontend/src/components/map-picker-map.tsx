"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { divIcon } from "leaflet";

type Coordinates = {
  lat: number;
  lng: number;
};

type MapPickerMapProps = {
  coordinates: Coordinates;
  onMapClick: (coords: Coordinates) => void;
};

const markerIcon = divIcon({
  className: "",
  html: `
    <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:4px;
        transform:translateY(-6px);
    ">
      <div style="
          width:16px;
          height:16px;
          border-radius:9999px;
          background:#0f172a;
          box-shadow:0 6px 18px rgba(15,23,42,0.35);
      "></div>
      <div style="
          width:2px;
          height:18px;
          background:linear-gradient(180deg,#0f172a,#6366f1);
      "></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

function MapClickHandler({ onMapClick }: { onMapClick: MapPickerMapProps["onMapClick"] }) {
  useMapEvents({
    click(event) {
      const coords = { lat: event.latlng.lat, lng: event.latlng.lng };
      onMapClick(coords);
    },
  });
  return null;
}

function ViewUpdater({ coordinates }: { coordinates: Coordinates }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([coordinates.lat, coordinates.lng], map.getZoom(), { duration: 0.4 });
  }, [coordinates, map]);
  return null;
}

export function MapPickerMap({ coordinates, onMapClick }: MapPickerMapProps) {
  const marker = useMemo(() => markerIcon, []);
  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> hamjamiyati'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.lat, coordinates.lng]} icon={marker} />
      <MapClickHandler onMapClick={onMapClick} />
      <ViewUpdater coordinates={coordinates} />
    </MapContainer>
  );
}
