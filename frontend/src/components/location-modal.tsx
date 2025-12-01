"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, MapPin, X } from "lucide-react";
import clsx from "clsx";

import type { Branch, DeliveryZone } from "@/types";

type Props = {
  open: boolean;
  loading: boolean;
  branches: Branch[];
  currentSelection: {
    branch: Branch | null;
    zone: DeliveryZone | null;
    address: string;
  };
  onClose: () => void;
  onApply: (payload: { branch: Branch | null; zone: DeliveryZone | null; address: string }) => void;
};

export function LocationModal({ open, loading, branches, currentSelection, onClose, onApply }: Props) {
  const [branchId, setBranchId] = useState<number | null>(currentSelection.branch?.id ?? null);
  const [zoneId, setZoneId] = useState<number | null>(currentSelection.zone?.id ?? null);
  const [address, setAddress] = useState(currentSelection.address ?? "");

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBranchId(currentSelection.branch?.id ?? null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZoneId(currentSelection.zone?.id ?? null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddress(currentSelection.address ?? "");
  }, [open, currentSelection.branch, currentSelection.zone, currentSelection.address]);

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === branchId) ?? null,
    [branches, branchId],
  );

  const selectedZone = useMemo(
    () => selectedBranch?.zones.find((zone) => zone.id === zoneId) ?? null,
    [selectedBranch, zoneId],
  );

  const handleApply = () => {
    onApply({
      branch: selectedBranch,
      zone: selectedZone,
      address: address.trim(),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-[36px] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Yetkazib berish</p>
            <h3 className="mt-2 text-2xl font-semibold text-neutral-900">Manzilni tanlang</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-neutral-200 p-2 text-neutral-500 hover:text-neutral-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-neutral-500">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="mt-4 text-sm">Filiallar yuklanmoqda…</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_minmax(0,1fr)]">
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => {
                    setBranchId(branch.id);
                    if (!branch.zones.some((zone) => zone.id === zoneId)) {
                      setZoneId(null);
                    }
                  }}
                  className={clsx(
                    "w-full rounded-3xl border px-5 py-4 text-left transition-all",
                    branch.id === branchId
                      ? "border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-neutral-900/20"
                      : "border-neutral-200 text-neutral-700 hover:border-neutral-300",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/10 p-2 text-neutral-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p
                        className={clsx(
                          "text-lg font-semibold",
                          branch.id === branchId ? "text-white" : "text-neutral-900",
                        )}
                      >
                        {branch.name}
                      </p>
                      <p className={clsx("text-sm", branch.id === branchId ? "text-white/80" : "text-neutral-500")}>
                        {branch.address}
                      </p>
                      {branch.workingHours ? (
                        <p className="text-xs text-neutral-400">Ish vaqti: {branch.workingHours}</p>
                      ) : null}
                    </div>
                  </div>
                </button>
              ))}
              {!branches.length ? (
                <div className="rounded-3xl border border-neutral-200 px-5 py-8 text-center text-sm text-neutral-500">
                  Hozircha filiallar ro‘yxati mavjud emas.
                </div>
              ) : null}
            </div>
            <div className="flex flex-col rounded-3xl border border-neutral-200 p-5">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Yetkazib berish zonasi</p>
              {selectedBranch ? (
                <>
                  <div className="mt-4 space-y-3">
                    {selectedBranch.zones.map((zone) => (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setZoneId(zone.id === zoneId ? null : zone.id)}
                        className={clsx(
                          "w-full rounded-2xl border px-4 py-3 text-left",
                          zone.id === zoneId
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300",
                        )}
                      >
                        <p className="text-sm font-semibold">{zone.name}</p>
                        <p className="text-xs">
                          Minimal buyurtma {zone.minOrderAmount.toLocaleString()} so‘m · Yetkazib berish{" "}
                          {zone.deliveryFee.toLocaleString()} so‘m · {zone.etaMinutes} daq.
                        </p>
                      </button>
                    ))}
                    {!selectedBranch.zones.length ? (
                      <div className="rounded-2xl border border-neutral-100 px-4 py-3 text-sm text-neutral-400">
                        Bu filial uchun zonalar hali qo‘shilmagan.
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-6">
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">Manzil</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Shahar, ko‘cha, uy"
                      className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApply}
                    disabled={!selectedBranch}
                    className="mt-6 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white disabled:bg-neutral-300"
                  >
                    Tasdiqlash
                  </button>
                </>
              ) : (
                <div className="mt-6 rounded-2xl bg-neutral-50 px-4 py-12 text-center text-sm text-neutral-500">
                  Avval filialni tanlang.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
