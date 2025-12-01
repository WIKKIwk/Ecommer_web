import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { AuthProvider } from "@/context/auth-context";
import { LocationProvider } from "@/context/location-context";
import { CartProvider } from "@/context/cart-context";
import { SiteSettingsProvider } from "@/context/site-settings-context";
import { PageLoader } from "@/components/page-loader";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { ScrollProgress } from "@/components/scroll-progress";
import { CategoryNavProvider } from "@/context/category-nav-context";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Custom Ecommer",
  description: "Customizable e-commerce storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${plusJakarta.variable} font-sans bg-white text-neutral-900`}>
        <PageLoader />
        <SiteSettingsProvider>
          <LanguageProvider>
            <AuthProvider>
              <LocationProvider>
                <CartProvider>
                  <CategoryNavProvider>
                    <div className="min-h-screen bg-white">
                      <ScrollProgress />
                      <Navbar />
                      <main>
                        <PageTransition>{children}</PageTransition>
                      </main>
                    </div>
                  </CategoryNavProvider>
                </CartProvider>
              </LocationProvider>
            </AuthProvider>
          </LanguageProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
