"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onRequestCode: (phone: string) => Promise<boolean>;
  onVerify: (params: { phone: string; code: string; fullName?: string }) => Promise<void>;
};

export function LoginModal({ open, onClose, onRequestCode, onVerify }: Props) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("+998");
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [needsName, setNeedsName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!open) {
      setStep("phone");
      setPhone("+998");
      setCode("");
      setError(null);
      setTimer(0);
      setFullName("");
      setNeedsName(false);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (timer <= 0) return undefined;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleRequestCode = async () => {
    try {
      setLoading(true);
      setError(null);
      const isNew = await onRequestCode(phone);
      setNeedsName(isNew);
      setStep("code");
      setCode("");
      setFullName("");
      setTimer(60);
    } catch {
      setError("Kod yuborishda xatolik. Qayta urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError(null);
      await onVerify({ phone, code, fullName: needsName ? fullName : undefined });
      onClose();
    } catch {
      setError("Kod noto‘g‘ri yoki eskirgan.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-black/40 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 text-center shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-neutral-900">Tizimga kirish</h3>
            <p className="text-sm text-neutral-500">Telefon raqamingiz bilan tizimga kiring</p>
          </div>
          <button type="button" className="rounded-full bg-neutral-100 p-2" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 space-y-4 text-left">
          {step === "phone" ? (
            <>
              <label className="text-sm font-semibold text-neutral-600">Telefon raqam</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                placeholder="+998 90 123 45 67"
              />
            </>
          ) : (
            <>
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
                <div className="flex items-center justify-between">
                  <span>{phone}</span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-neutral-900"
                    onClick={() => {
                      setStep("phone");
                      setCode("");
                      setNeedsName(false);
                      setFullName("");
                      setTimer(0);
                      setError(null);
                    }}
                  >
                    O‘zgartirish
                  </button>
                </div>
                <p className="text-xs text-neutral-400">Ushbu raqamga tasdiqlash kodi yuborildi</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-600">Tasdiqlash kodi</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  placeholder="0000"
                />
                <p className="text-xs text-neutral-500">
                  {timer > 0 ? `Qayta yuborish ${timer}s` : "Qayta kod so‘rashingiz mumkin."}
                </p>
              </div>
              {needsName ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-600">Ismingiz</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    placeholder="Ismingiz"
                  />
                </div>
              ) : null}
            </>
          )}
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
        </div>
        <button
          type="button"
          disabled={
            loading ||
            (step === "code"
              ? code.length < 4 || (needsName && fullName.trim().length < 2)
              : phone.replace(/[^0-9+]/g, "").length < 9)
          }
          onClick={step === "code" ? handleVerify : handleRequestCode}
          className="mt-6 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white disabled:bg-neutral-300"
        >
          {step === "code" ? "Tasdiqlash" : "Kod yuborish"}
        </button>
      </div>
    </div>
  );
}
