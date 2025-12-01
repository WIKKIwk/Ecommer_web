"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

import type { Category } from "@/types";
import { ProductCard } from "./product-card";
import { useCategoryNav } from "@/context/category-nav-context";

type Props = {
  categories: Category[];
};

export function CategorySections({ categories }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const { setCategories, setActiveSlug, activeSlug } = useCategoryNav();

  useEffect(() => {
    const navItems = categories.map((category) => ({
      name: category.name,
      slug: category.slug,
    }));
    setCategories(navItems);
    setActiveSlug(navItems[0]?.slug ?? null);
    return () => {
      setCategories([]);
      setActiveSlug(null);
    };
  }, [categories, setCategories, setActiveSlug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-category-slug");
            setActiveSlug(slug);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    const sections = document.querySelectorAll<HTMLElement>("[data-category-slug]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories, setActiveSlug]);

  return (
    <section id="menyu" className="mx-auto mt-12 max-w-6xl px-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Menyu</p>
          <h2 className="mt-2 text-3xl font-black text-neutral-900">Custom Ecommer menyusi</h2>
        </div>
      </div>
      <div
        ref={navRef}
        className="mt-6 flex gap-3 overflow-x-auto border-b border-neutral-100 pb-4 text-sm font-semibold text-neutral-600"
      >
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#category-${category.slug}`}
            onClick={(event) => {
              event.preventDefault();
              const target = document.querySelector(`#category-${category.slug}`);
              if (target) {
                const offset = 160;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: Math.max(position, 0), behavior: "smooth" });
              }
            }}
            className={clsx(
              "rounded-full border border-transparent px-5 py-2 text-neutral-600 hover:border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900",
              activeSlug === category.slug && "border-neutral-900 bg-neutral-900 text-white shadow-lg",
            )}
          >
            {category.name}
          </a>
        ))}
      </div>
      <div className="mt-10 space-y-16">
        {categories.map((category) => (
          <div key={category.id} id={`category-${category.slug}`} data-category-slug={category.slug}>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-neutral-900">{category.name}</h3>
              <p className="text-sm text-neutral-500">{category.products.length} ta taom</p>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
