"use client";

import { useAuth } from "@/context/auth-context";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ProfileDrawer({ open, onClose }: Props) {
  const { customer, logout } = useAuth();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-400">Profil</p>
            <h3 className="text-2xl font-semibold text-neutral-900">{customer?.full_name ?? "Mijoz"}</h3>
            <p className="text-sm text-neutral-500">{customer?.phone}</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600"
            onClick={() => {
              logout();
              onClose();
            }}
          >
            Chiqish
          </button>
        </div>
        <div className="mt-6 space-y-3 text-sm text-neutral-500">
          <p>“Mening buyurtmalarim” sahifasi tez orada qo‘shiladi.</p>
        </div>
      </div>
    </div>
  );
}
