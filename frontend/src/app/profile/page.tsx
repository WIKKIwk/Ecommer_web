"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
  const { customer, logout, loading, openLoginModal, updateProfileName } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFullName(customer?.full_name ?? "");
  }, [customer?.full_name]);

  if (!mounted) {
    return null;
  }

  const handleSave = async () => {
    if (!fullName.trim()) {
      setError("Ismni kiriting");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      await updateProfileName(fullName.trim());
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-neutral-500">
        Profil yuklanmoqda...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 rounded-[32px] bg-white p-12 text-center shadow-xl shadow-neutral-200/60">
        <p className="text-2xl font-semibold text-neutral-900">Profilga kirish uchun avval ro‘yxatdan o‘ting</p>
        <p className="text-neutral-500">Telefon raqamingiz bilan tizimga kirib, buyurtmalar tarixini ko‘ra olasiz.</p>
        <button
          type="button"
          onClick={openLoginModal}
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20"
        >
          Tizimga kirish
        </button>
        <Link href="/" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900">
          ← Menyuga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 pb-16">
      <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-8 px-4">
        <div className="glass-panel rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Profil</p>
              <h1 className="mt-2 text-3xl font-black text-neutral-900">Shaxsiy ma’lumotlar</h1>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            >
              <LogOut className="h-4 w-4" />
              Chiqish
            </button>
          </div>
          <div className="mt-6 rounded-[28px] border border-neutral-100 bg-neutral-50 p-6 text-sm text-neutral-600">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Ism</p>
                  {!editing ? (
                    <button
                      type="button"
                      className="text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                      onClick={() => setEditing(true)}
                    >
                      Tahrirlash
                    </button>
                  ) : null}
                </div>
                {editing ? (
                  <div className="mt-2 flex flex-col gap-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-2xl border border-neutral-200 px-4 py-3 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    />
                    {error ? <p className="text-xs text-red-500">{error}</p> : null}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded-full bg-neutral-900 px-4 py-2 text-xs.font-semibold text-white disabled:bg-neutral-400"
                      >
                        {saving ? "Saqlanmoqda..." : "Saqlash"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setError(null);
                          setFullName(customer.full_name);
                        }}
                        className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600"
                      >
                        Bekor qilish
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-lg font-semibold text-neutral-900">{customer.full_name}</p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Telefon raqam</p>
                <p className="mt-1 text-lg font-semibold text-neutral-900">{customer.phone}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-500">Ma’lumotlarni tahrirlash funksiyasi tez orada qo‘shiladi.</p>
          </div>
        </div>
        <Link href="/" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900">
          ← Menyuga qaytish
        </Link>
      </div>
    </div>
  );
}
