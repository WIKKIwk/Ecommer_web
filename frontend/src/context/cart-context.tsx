"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { nanoid } from "nanoid";

import type { CartItem, Product, ProductOption } from "@/types";
import { useAuth } from "@/context/auth-context";

type CartAction =
  | { type: "HYDRATE"; state: CartState }
  | { type: "ADD"; product: Product; option?: ProductOption }
  | { type: "REMOVE"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "CLEAR" }
  | { type: "RESET" };

const STORAGE_PREFIX = "kamolon-cart";

type CartState = {
  items: CartItem[];
  total: number;
};

const defaultState: CartState = {
  items: [],
  total: 0,
};

function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity * (item.option?.price ?? item.product.price), 0);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return {
        items: action.state.items,
        total: calculateTotal(action.state.items),
      };
    case "ADD": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === action.product.id && (item.option?.id ?? null) === (action.option?.id ?? null),
      );

      const updatedItems = [...state.items];
      if (existingIndex !== -1) {
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
      } else {
        updatedItems.push({
          id: nanoid(),
          product: action.product,
          option: action.option,
          quantity: 1,
        });
      }
      return { items: updatedItems, total: calculateTotal(updatedItems) };
    }
    case "REMOVE": {
      const updatedItems = state.items.filter((item) => item.id !== action.id);
      return { items: updatedItems, total: calculateTotal(updatedItems) };
    }
    case "DECREMENT": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
        )
        .filter((item) => item.quantity > 0);
      return { items: updatedItems, total: calculateTotal(updatedItems) };
    }
    case "CLEAR":
      return { items: [], total: 0 };
    case "RESET":
      return defaultState;
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  total: number;
  addToCart: (product: Product, option?: ProductOption) => void;
  removeFromCart: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { customer, loading, openLoginModal } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, defaultState);
  const [storageKey, setStorageKey] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || loading) return;

    if (!customer) {
      setStorageKey(null);
      dispatch({ type: "RESET" });
      setIsHydrated(true);
      return;
    }

    setIsHydrated(false);
    const key = `${STORAGE_PREFIX}-${customer.id}`;
    setStorageKey(key);
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({
          type: "HYDRATE",
          state: {
            items: parsed.items ?? [],
            total: calculateTotal(parsed.items ?? []),
          },
        });
      } else {
        dispatch({ type: "RESET" });
      }
    } catch (error) {
      console.warn("Failed to parse cart storage", error);
      dispatch({ type: "RESET" });
    } finally {
      setIsHydrated(true);
    }
  }, [customer, loading]);

  useEffect(() => {
    if (typeof window === "undefined" || !storageKey || !isHydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey, isHydrated]);

  const value = useMemo(() => {
    const ensureAuthenticated = () => {
      if (!customer) {
        openLoginModal();
        return false;
      }
      return true;
    };

    return {
      items: state.items,
      total: state.total,
      addToCart: (product: Product, option?: ProductOption) => {
        if (!ensureAuthenticated()) return;
        dispatch({ type: "ADD", product, option });
      },
      removeFromCart: (id: string) => {
        if (!ensureAuthenticated()) return;
        dispatch({ type: "REMOVE", id });
      },
      decrement: (id: string) => {
        if (!ensureAuthenticated()) return;
        dispatch({ type: "DECREMENT", id });
      },
      clear: () => {
        if (!ensureAuthenticated()) return;
        dispatch({ type: "CLEAR" });
      },
    };
  }, [state.items, state.total, customer, openLoginModal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
