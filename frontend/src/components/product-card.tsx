"use client";

import Image from "next/image";
import { Plus } from "lucide-react";

import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useTranslation } from "@/context/language-context";

const formatCurrency = (amount: number) =>
  Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { customer, openLoginModal } = useAuth();
  const t = useTranslation();
  const imageSrc =
    product.image && product.image.trim().length > 0
      ? product.image
      : "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80";

  const handleAdd = () => {
    if (!customer) {
      openLoginModal();
      return;
    }
    addToCart(product);
  };

  return (
    <div className="flex flex-col rounded-[32px] border border-neutral-100 bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition-transform duration-500 hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden rounded-[28px] bg-neutral-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold text-neutral-900">{product.name}</h3>
        <p className="mt-2 min-h-[48px] line-clamp-2 text-sm text-neutral-500">{product.description}</p>
        <div className="mt-4 flex items-baseline gap-3">
          <p className="text-xl font-black text-neutral-900">{formatCurrency(product.price)} so‘m</p>
          {product.old_price ? (
            <span className="text-sm text-neutral-400 line-through">
              {formatCurrency(product.old_price)} so‘m
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="mt-auto inline-flex w-full.items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t("actions.addToCart")}
        </button>
      </div>
    </div>
  );
}
