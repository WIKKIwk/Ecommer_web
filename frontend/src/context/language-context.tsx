"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "uz" | "ru" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  options: Array<{ value: Language; label: string }>;
  t: (key: string) => string;
};

const STORAGE_KEY = "kamolon-language";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "uz", label: "O‘z" },
  { value: "ru", label: "Ру" },
  { value: "en", label: "En" },
];

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    "nav.menu": "Menyu",
    "nav.branches": "Filiallar",
    "nav.about": "Biz haqimizda",
    "nav.contact": "Bog‘lanish",
    "nav.location": "Manzil",
    "nav.selectLocation": "Manzilni tanlang",
    "nav.locationPlaceholder": "Filial/zonani tanlang",
    "nav.language": "Til",
    "actions.addToCart": "Qo‘shish",
  },
  ru: {
    "nav.menu": "Меню",
    "nav.branches": "Филиалы",
    "nav.about": "О нас",
    "nav.contact": "Связаться",
    "nav.location": "Адрес",
    "nav.selectLocation": "Выберите адрес",
    "nav.locationPlaceholder": "Укажите филиал/зону",
    "nav.language": "Язык",
    "actions.addToCart": "Добавить",
  },
  en: {
    "nav.menu": "Menu",
    "nav.branches": "Branches",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.location": "Address",
    "nav.selectLocation": "Select address",
    "nav.locationPlaceholder": "Choose branch/zone",
    "nav.language": "Language",
    "actions.addToCart": "Add",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && LANGUAGE_OPTIONS.some((opt) => opt.value === saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
  }, []);

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const translate = (key: string) => {
    const table = TRANSLATIONS[language] ?? TRANSLATIONS.uz;
    return table[key] ?? key;
  };

  const value = useMemo<LanguageContextType>(
    () => ({ language, setLanguage: updateLanguage, options: LANGUAGE_OPTIONS, t: translate }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export function useTranslation() {
  const ctx = useLanguage();
  return ctx.t;
}
