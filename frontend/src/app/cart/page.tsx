"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/context/cart-context";

const DEFAULT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=400&q=60";

export default function CartPage() {
  const { items, total, addToCart, decrement, removeFromCart, clear } = useCart();

  return (
    <div className="min-h-screen bg-neutral-50 pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-10 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="glass-panel flex items-center justify-between px-6 py-4 text-sm">
            <Link href="/" className="font-semibold text-neutral-900">
              ← Menyuga qaytish
            </Link>
            {items.length ? (
              <button type="button" onClick={clear} className="text-neutral-500 hover:text-neutral-900">
                Savatni tozalash
              </button>
            ) : null}
          </div>
          <div className="glass-panel divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">Savat bo‘sh. Menyudan taom qo‘shing.</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-neutral-100">
                    <Image
                      src={item.product.image ?? DEFAULT_PLACEHOLDER}
                      alt={item.product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-base font-semibold text-neutral-900">{item.product.name}</p>
                    {item.option ? (
                      <p className="text-xs text-neutral-500">Variant: {item.option.name}</p>
                    ) : null}
                    <p className="text-sm text-neutral-500">{item.product.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-full border border-neutral-200 p-2 text-neutral-600"
                      onClick={() => decrement(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      className="rounded-full border border-neutral-200 p-2 text-neutral-600"
                      onClick={() => addToCart(item.product, item.option)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500">Jami</p>
                    <p className="text-lg font-semibold text-neutral-900">
                      {(item.quantity * (item.option?.price ?? item.product.price)).toLocaleString()} so‘m
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-neutral-200 p-2 text-neutral-400 hover:text-neutral-900"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="glass-panel h-fit w-full max-w-md p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Umumiy</p>
          <div className="mt-4 space-y-3 text-sm text-neutral-600">
            <div className="flex items-center justify-between">
              <span>Mahsulotlar</span>
              <span>{total.toLocaleString()} so‘m</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Yetkazib berish</span>
              <span>Hisoblash kutilmoqda</span>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-base font-semibold text-neutral-900">
              <span>To‘lov uchun</span>
              <span>{total.toLocaleString()} so‘m+</span>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-500">
            Manzil va to‘lov usulini keyingi sahifada tanlaysiz.
          </div>
          <Link
            href={items.length ? "/checkout" : "#"}
            className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold shadow-lg shadow-neutral-900/20 ${
              items.length ? "bg-neutral-900 text-white" : "pointer-events-none bg-neutral-300 text-neutral-500"
            }`}
            aria-disabled={!items.length}
          >
            To‘lov sahifasiga o‘tish
          </Link>
        </div>
      </div>
    </div>
  );
}
