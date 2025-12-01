"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { LoginModal } from "@/components/login-modal";
import { fetchProfile, sendLoginCode, verifyLoginCode, updateProfileName } from "@/lib/auth-client";

const STORAGE_KEY = "kamolon-auth-token";

type Customer = {
  id: number;
  full_name: string;
  phone: string;
  is_verified?: boolean;
};

type AuthContextType = {
  customer: Customer | null;
  token: string | null;
  loading: boolean;
  requestCode: (phone: string) => Promise<boolean>;
  verifyCode: (params: { phone: string; code: string; fullName?: string }) => Promise<void>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  updateProfileName: (fullName: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    typeof window === "undefined" ? null : localStorage.getItem(STORAGE_KEY),
  );
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const loadProfile = useCallback(async (storedToken: string) => {
    try {
      const profile = await fetchProfile(storedToken);
      setCustomer(profile);
      setToken(storedToken);
    } catch (error) {
      console.warn("failed to load profile", error);
      setCustomer(null);
      setToken(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadProfile(token);
    } else {
      setLoading(false);
    }
  }, [loadProfile, token]);

  const requestCode = useCallback(async (phone: string) => {
    const result = await sendLoginCode(phone);
    return result.is_new;
  }, []);

  const verifyCode = useCallback(
    async ({ phone, code, fullName }: { phone: string; code: string; fullName?: string }) => {
      const response = await verifyLoginCode({ phone, code, fullName });
      setCustomer(response.customer);
      setToken(response.token);
      localStorage.setItem(STORAGE_KEY, response.token);
    },
    [],
  );

  const logout = useCallback(() => {
    setCustomer(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const openLoginModal = useCallback(() => setLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setLoginModalOpen(false), []);

  const handleUpdateProfileName = useCallback(
    async (fullName: string) => {
      if (!token) {
        throw new Error("Token topilmadi");
      }
      const updated = await updateProfileName(token, fullName);
      setCustomer(updated);
    },
    [token],
  );

  return (
    <AuthContext.Provider
      value={{ customer, token, loading, requestCode, verifyCode, logout, openLoginModal, closeLoginModal, updateProfileName: handleUpdateProfileName }}
    >
      {children}
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} onRequestCode={requestCode} onVerify={verifyCode} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
