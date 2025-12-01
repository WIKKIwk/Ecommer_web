"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 400);
    const hideTimer = setTimeout(() => setIsVisible(false), 800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-neutral-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-neutral-900 border-t-transparent" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-300 opacity-40 blur-2xl" />
      </div>
      <p className="mt-4 text-sm font-medium text-neutral-500">Sahifa yangilanmoqda…</p>
    </div>
  );
}
