"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

import type { HeroSlide } from "@/types";

type Props = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (direction: "prev" | "next") => {
    setIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? slides.length - 1 : prev - 1;
      }
      return (prev + 1) % slides.length;
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goTo("next"),
    onSwipedRight: () => goTo("prev"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <section className="relative mx-auto mt-8 max-w-6xl px-4">
      <div
        className="relative overflow-hidden rounded-[36px] border border-neutral-100 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
        {...handlers}
      >
        <div
          className="flex h-[440px] w-full transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="relative min-w-full" key={slide.id}>
              {slide.image ? (
                <>
                  <Image src={slide.image} alt={slide.title} fill unoptimized className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-black via-neutral-900 to-neutral-800" />
              )}
              <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/70">
                  {slide.badge ? (
                    <span className="rounded-full bg-white px-4 py-1 text-[11px] font-semibold text-neutral-900">
                      {slide.badge}
                    </span>
                  ) : null}
                  <span>Custom Ecommer</span>
                </div>
                <div className="max-w-xl space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">{slide.subtitle}</p>
                  <h1 className="text-4xl font-black leading-tight lg:text-5xl">{slide.title}</h1>
                  <p className="text-base text-white/80">{slide.description}</p>
                  {slide.ctaLabel ? (
                    <Link
                      href={slide.ctaUrl || "#menyu"}
                      className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {slide.ctaLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo("prev")}
          className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 p-3 text-neutral-900 shadow-xl"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => goTo("next")}
          className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 p-3 text-neutral-900 shadow-xl"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((slide, slideIndex) => (
          <span
            key={slide.id}
            className={`h-2 w-10 rounded-full transition-all ${
              slideIndex === index ? "bg-neutral-900" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
