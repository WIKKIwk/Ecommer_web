"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CategoryNavItem = {
  name: string;
  slug: string;
};

type CategoryNavContextType = {
  categories: CategoryNavItem[];
  activeSlug: string | null;
  setCategories: (items: CategoryNavItem[]) => void;
  setActiveSlug: (slug: string | null) => void;
};

const CategoryNavContext = createContext<CategoryNavContextType | undefined>(undefined);

export function CategoryNavProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryNavItem[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      categories,
      activeSlug,
      setCategories,
      setActiveSlug,
    }),
    [categories, activeSlug],
  );

  return <CategoryNavContext.Provider value={value}>{children}</CategoryNavContext.Provider>;
}

export function useCategoryNav() {
  const ctx = useContext(CategoryNavContext);
  if (!ctx) {
    throw new Error("useCategoryNav must be used within CategoryNavProvider");
  }
  return ctx;
}
