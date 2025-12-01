"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";

import type { Product, ProductOption } from "@/types";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
};

export function ProductModal({ product, open, onClose }: Props) {
  const { addToCart } = useCart();
  const { customer, openLoginModal } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>();

  if (!open || !product) return null;

  const handleAdd = () => {
    if (!customer) {
      openLoginModal();
      return;
    }
    Array.from({ length: quantity }).forEach(() => addToCart(product, selectedOption));
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="glass-panel flex w-full max-w-4xl gap-6 p-6">
        <div className="relative hidden min-h-[420px] flex-1 overflow-hidden rounded-3xl bg-neutral-100 lg:block">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col">
          <button type="button" onClick={onClose} className="self-end rounded-full border border-neutral-200 p-2 text-neutral-500">
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Osh marosimi</p>
          <h3 className="mt-2 text-3xl font-black text-neutral-900">{product.name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">{product.description}</p>
          {product.options && product.options.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">Qo‘shimcha</p>
              <div className="flex flex-wrap gap-3">
                {product.options.map((option) => {
                  const active = selectedOption?.id === option.id;
                  return (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setSelectedOption(active ? undefined : option)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                      }`}
                    >
                      {option.name} · {option.price.toLocaleString()} so‘m
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className="mt-auto flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Narx</p>
              <p className="text-3xl font-black text-neutral-900">
                {(selectedOption?.price ?? product.price).toLocaleString()} so‘m
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-full border border-neutral-200">
                <button type="button" className="p-3" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button type="button" className="p-3" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20"
              >
                Savatga {quantity > 1 ? `(${quantity})` : ""} qo‘shish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
