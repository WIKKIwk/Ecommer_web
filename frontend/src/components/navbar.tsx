"use client";

import Link from "next/link";
import { MapPin, ShoppingCart, UserRound, Globe, Check } from "lucide-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useLocation } from "@/context/location-context";
import { useLanguage, useTranslation } from "@/context/language-context";
import { useCategoryNav } from "@/context/category-nav-context";
import { useSiteSettings } from "@/context/site-settings-context";

const menuItems: Array<{ labelKey: string; href: string; external?: boolean }> = [
  { labelKey: "nav.menu", href: "#menyu" },
  { labelKey: "nav.branches", href: "#filiallar" },
  { labelKey: "nav.about", href: "/about", external: true },
  { labelKey: "nav.contact", href: "#contact" },
];

export function Navbar() {
  const { total, items } = useCart();
  const { customer, logout, loading, openLoginModal } = useAuth();
  const { branch, zone, openModal: openLocationModal } = useLocation();
  const { language, setLanguage, options: languageOptions } = useLanguage();
  const { settings } = useSiteSettings();
  const t = useTranslation();
  const { categories: categoryNavItems, activeSlug } = useCategoryNav();
  const pathname = usePathname();
  const router = useRouter();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  const lastScrollY = useRef(0);
  const languageRef = useRef<HTMLDivElement | null>(null);
  const handleProfileClick = () => {
    if (customer) {
      router.push("/profile");
    } else {
      openLoginModal();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };
    if (languageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [languageOpen]);

  const cartCount = items.length;
  const cartTotal = total;
  const currentCustomer = !loading ? customer : null;
  const showCategoryRail = compactNav && categoryNavItems.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const compactThreshold = 160;
      if (currentY > compactThreshold) {
        setCompactNav(true);
      } else {
        setCompactNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) {
      return;
    }
    if (href.startsWith("#")) {
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = compactNav ? 120 : 160;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const scrollTarget = Math.max(elementPosition - offset, 0);
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-[1000] border-b border-neutral-100 bg-white/90 backdrop-blur-md transition-[background,padding] duration-300">
      <div
        className={clsx(
          "mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 transition-[padding,margin] duration-300",
          compactNav ? "py-2" : "py-4",
        )}
      >
        <Link
          href="/"
          onClick={(event) => {
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3"
        >
          <div
            className={clsx(
              "rounded-full border border-neutral-900 px-4 py-2 text-xs font-semibold tracking-[0.2em] transition-all",
              compactNav && "px-3 py-1 text-[10px]",
            )}
          >
            {settings?.site_name || "CUSTOM ECOMMER"}
          </div>
          {!compactNav && settings?.site_tagline && (
            <div className="text-sm uppercase tracking-[0.35em] text-neutral-500">
              {settings.site_tagline}
            </div>
          )}
        </Link>

        {showCategoryRail ? (
          <div className="hidden flex-1 items-center gap-2 overflow-x-auto rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-neutral-600 shadow-inner lg:flex">
            {categoryNavItems.map((item) => (
              <a
                key={item.slug}
                href={`#category-${item.slug}`}
                onClick={(event) => handleSmoothScroll(event, `#category-${item.slug}`)}
                className={clsx(
                  "rounded-full px-3 py-1 transition-colors",
                  activeSlug === item.slug ? "bg-neutral-900 text-white" : "hover:bg-neutral-100",
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        ) : (
          <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-semibold text-neutral-600 lg:flex">
            {menuItems.map((item) => (
              <a
                key={item.labelKey}
                href={item.href}
                onClick={(event) => handleSmoothScroll(event, item.href, item.external)}
                className="hover:text-neutral-900 transition-colors"
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>
        )}

        <div className={clsx("flex items-center gap-3", compactNav && "gap-2")}>
          <button
            type="button"
            onClick={openLocationModal}
            className="flex items-center gap-3 rounded-full border border-neutral-200 px-4 py-2 text-left text-sm text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">{t("nav.location")}</span>
              <span className="font-semibold text-neutral-900">
                {branch ? branch.name : t("nav.selectLocation")}
              </span>
              {zone ? <span className="text-xs text-neutral-500">{zone.name}</span> : null}
            </div>
          </button>
          <div className="relative hidden lg:block" ref={languageRef}>
            <button
              type="button"
              onClick={() => setLanguageOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            >
              <Globe className="h-4 w-4" />
              {languageOptions.find((opt) => opt.value === language)?.label ?? "O‘z"}
            </button>
            {languageOpen ? (
              <div className="absolute right-0 top-[calc(100%+10px)] w-40 rounded-[24px] border border-neutral-100 bg-white p-2 shadow-lg">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.value);
                      setLanguageOpen(false);
                    }}
                    className={clsx(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm",
                      opt.value === language ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-50",
                    )}
                  >
                    <span>{opt.label}</span>
                    {opt.value === language ? <Check className="h-4 w-4" /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            href="/cart"
            className={clsx(
              "flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20",
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            <span suppressHydrationWarning>{cartCount || 0}</span>
            <span className="text-neutral-200">|</span>
            <span suppressHydrationWarning>{(cartTotal / 1000).toFixed(0)} ming so‘m</span>
          </Link>
          <button
            type="button"
            onClick={handleProfileClick}
            className={clsx(
              "rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
              currentCustomer
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 text-neutral-600 hover:text-neutral-900",
            )}
          >
            {currentCustomer ? (
              <span suppressHydrationWarning>{currentCustomer.full_name?.split(" ")[0] ?? "Mijoz"}</span>
            ) : (
              <UserRound className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
          <nav className="flex w-full items-center justify-center gap-4 border-t border-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-600 lg:hidden">
        {menuItems.map((item) => (
          <a key={item.labelKey} href={item.href} className="hover:text-neutral-900 transition-colors">
            {t(item.labelKey)}
          </a>
        ))}
      </nav>
    </header>
  );
}
