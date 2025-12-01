"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Clock, CreditCard, Minus, Plus, UserRound } from "lucide-react";

import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useLocation } from "@/context/location-context";
import { MapPicker } from "@/components/map-picker";

const DEFAULT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=400&q=60";

const DELIVERY_TIME_OPTIONS = [
  { id: "asap", label: "Tezkor (30-40 daqiqa)", helper: "Eng yaqin kur’er darhol yo‘l oladi" },
  { id: "scheduled", label: "Bugun (60-70 daqiqa)", helper: "Pik soatda biroz ko‘proq vaqt talab etiladi" },
];

const PAYMENT_METHODS = [
  { id: "cash", label: "Naqd", icon: CreditCard },
  { id: "terminal", label: "Payme/Terminal", icon: CreditCard },
  { id: "click", label: "Click", icon: CreditCard },
];

export default function CheckoutPage() {
  const { items, total, addToCart, decrement, removeFromCart } = useCart();
  const { customer } = useAuth();
  const { branch, zone, address, coordinates, setManualLocation, openModal } = useLocation();

  const [contactName, setContactName] = useState(customer?.full_name ?? "");
  const [contactPhone, setContactPhone] = useState(customer?.phone ?? "+998");
  const [addressLine, setAddressLine] = useState(address ?? "");
  const [homeDetails, setHomeDetails] = useState({
    home: "",
    floor: "",
    apartment: "",
    entrance: "",
    note: "",
  });
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContactName(customer?.full_name ?? "");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContactPhone(customer?.phone ?? "+998");
  }, [customer?.full_name, customer?.phone]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddressLine(address ?? "");
  }, [address]);

  const handleAddressChange = (value: string) => {
    setAddressLine(value);
    setManualLocation({ address: value });
  };

  const handleCoordinatesChange = (coords: { lat: number; lng: number }) => {
    setManualLocation({ coordinates: coords, address: addressLine });
  };

  const shippingFee = useMemo(() => (zone ? zone.deliveryFee : 0), [zone]);
  const finalTotal = total + shippingFee;

  const handlePlaceOrder = () => {
    alert("Demo rejim: buyurtma ma’lumotlari keyinchalik backendga yuboriladi.");
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <p className="text-2xl font-semibold text-neutral-900">Savat bo‘sh</p>
          <p className="mt-2 text-neutral-500">Avval menyudan taom tanlab, keyin to‘lov sahifasiga o‘ting.</p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Menyuga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 via-white to-neutral-50 pb-20">
      <section className="mx-auto w-full max-w-6xl px-4 pt-10">
        <div className="overflow-hidden rounded-[40px] bg-neutral-900 p-6 text-white shadow-[0_40px_80px_rgba(15,23,42,0.35)]">
          <div className="flex items-center justify-between text-sm text-white/70">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
            >
              ← Menyuga qaytish
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-white hover:bg-white/10"
            >
              Savatchaga qaytish →
            </Link>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.6em] text-white/60">Buyurtma jarayoni</p>
              <h1 className="mt-3 text-3xl font-bold">Manzil va to‘lovni tasdiqlang</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Savatchangiz tayyor. Keyingi qadamda manzil, yetkazib berish va to‘lov usulini aniqlab, buyurtmani yakunlang.
                Tizim barcha ma’lumotlarni avtomatik tarzda kur’erlarga uzatadi.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-[32px] bg-white/10 px-6 py-4 text-sm backdrop-blur">
              <div className="flex items-center justify-between text-white">
                <span>Mahsulotlar</span>
                <span className="text-lg font-semibold">{items.length}</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Jami qiymat</span>
                <span>{total.toLocaleString()} so‘m</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>Filial</span>
                <span>{branch ? branch.name : "Tanlanmagan"}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold tracking-[0.4em] text-white/60">
            {["Savat", "Ma’lumot", "Manzil", "To‘lov"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    index === 3 ? "bg-white text-neutral-900" : "border border-white/40"
                  }`}
                >
                  {index + 1}
                </span>
                <span>{step}</span>
                {index < 3 ? <div className="mx-2 h-px w-10 bg-white/30" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="glass-panel divide-y divide-neutral-100">
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Shaxsiy ma’lumot</p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">Mijoz tafsilotlari</h3>
              </div>
              <UserRound className="h-6 w-6 text-neutral-300" />
            </div>
            <div className="space-y-4 px-6 py-5 text-sm">
              <div>
                <label className="text-neutral-500">Ism</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-neutral-200 px-4 py-3 font-semibold text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  placeholder="Ismingiz"
                />
              </div>
              <div>
                <label className="text-neutral-500">Telefon raqami</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-neutral-200 px-4 py-3 font-semibold text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  placeholder="+998 90 123 45 67"
                />
              </div>
            </div>
          </div>

          <div className="glass-panel px-6 py-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Yetkazib berish manzili</p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                  {branch ? branch.name : "Filial tanlanmagan"}
                </h3>
                <p className="text-sm text-neutral-500">
                  {zone ? `${zone.name} zonasi · Yetkazib berish ${zone.deliveryFee.toLocaleString()} so‘m` : "Zonani tanlang"}
                </p>
              </div>
              <button
                type="button"
                onClick={openModal}
                className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600"
              >
                O‘zgartirish
              </button>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-neutral-600">Manzil</label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => handleAddressChange(e.target.value)}
                placeholder="Shahar, ko‘cha, uy"
                className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
              />
              <MapPicker
                coordinates={coordinates}
                onCoordinatesChange={handleCoordinatesChange}
                address={addressLine}
                onAddressChange={handleAddressChange}
              />
              <div className="grid gap-3 text-sm text-neutral-600 sm:grid-cols-2 lg:grid-cols-4">
                {["home", "floor", "apartment", "entrance"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    value={homeDetails[field as keyof typeof homeDetails]}
                    onChange={(e) =>
                      setHomeDetails((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    placeholder={field === "home" ? "Uy" : field === "floor" ? "Qavat" : field === "apartment" ? "Kvartira" : "Podyezd"}
                    className="rounded-2xl border border-neutral-200 px-4 py-3 focus:border-neutral-900 focus:outline-none"
                  />
                ))}
              </div>
              <textarea
                value={homeDetails.note}
                onChange={(e) =>
                  setHomeDetails((prev) => ({
                    ...prev,
                    note: e.target.value,
                  }))
                }
                placeholder="Kur’er uchun izoh (masalan, eshik paroli, yetkazish vaqti)."
                className="min-h-[100px] w-full rounded-3xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="glass-panel divide-y divide-neutral-100">
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Yetkazib berish vaqti</p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">Qaysi vaqtda qabul qilasiz?</h3>
              </div>
              <Clock className="h-6 w-6 text-neutral-300" />
            </div>
            <div className="grid gap-3 px-6 py-5 sm:grid-cols-2">
              {DELIVERY_TIME_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDeliveryTime(option.id)}
                  className={`rounded-3xl border px-4 py-3 text-left ${
                    deliveryTime === option.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-600"
                  }`}
                >
                  <p className="text-sm font-semibold">{option.label}</p>
                  <p className="text-xs">{option.helper}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel px-6 py-5">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">To‘lov usuli</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-semibold ${
                    paymentMethod === method.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-600"
                  }`}
                >
                  <method.icon className="h-4 w-4" />
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Buyurtma tafsilotlari</p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">Tanlangan taomlar</h3>
              </div>
            </div>
            <div className="mt-4 divide-y divide-neutral-100">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                    <Image
                      src={item.product.image ?? DEFAULT_PLACEHOLDER}
                      alt={item.product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-neutral-900">{item.product.name}</p>
                    {item.option ? <p className="text-xs text-neutral-500">Variant: {item.option.name}</p> : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-full border border-neutral-200 p-2 text-neutral-600"
                      onClick={() => decrement(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      className="rounded-full border border-neutral-200 p-2 text-neutral-600"
                      onClick={() => addToCart(item.product, item.option)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right text-sm font-semibold text-neutral-900">
                    {(item.quantity * (item.option?.price ?? item.product.price)).toLocaleString()} so‘m
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-neutral-200 p-2 text-neutral-400 hover:text-neutral-900"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-10 h-fit w-full max-w-md rounded-[36px] bg-white/90 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.12)] ring-1 ring-neutral-100 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Umumiy</p>
          <div className="mt-4 space-y-4 text-sm text-neutral-600">
            <div className="flex items-center justify-between">
              <span>Mahsulotlar</span>
              <span className="font-semibold text-neutral-900">{total.toLocaleString()} so‘m</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Yetkazib berish</span>
              <span className="font-semibold text-neutral-900">
                {shippingFee ? `${shippingFee.toLocaleString()} so‘m` : "Filialga bog‘liq"}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-base font-semibold text-neutral-900">
              <span>To‘lov uchun</span>
              <span>{finalTotal.toLocaleString()} so‘m</span>
            </div>
          </div>
          <div className="mt-6 space-y-3 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 px-5 py-4 text-sm text-white shadow-lg shadow-neutral-900/30">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/20 p-2">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold">Kur’er chaqiruvi</p>
                <p className="text-white/80">
                  Yetkazib berishdan avval ko‘rsatilgan raqamga tasdiqlash qo‘ng‘irog‘i amalga oshiriladi.
                </p>
              </div>
            </div>
            <p className="text-white/70">Yakuniy narx filial va zonaga qarab aniqlanadi.</p>
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="mt-6 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-transform"
          >
            Buyurtma qilish
          </button>
          <Link href="/cart" className="mt-4 block text-center text-sm font-semibold text-neutral-500 hover:text-neutral-900">
            ← Savatchaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16m-9 4v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12m-9-3h4a2 2 0 0 1 2 2v1H7V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
