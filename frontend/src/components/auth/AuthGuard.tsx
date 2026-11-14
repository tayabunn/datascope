"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initAuthFromStorage } from "@/store/slices/authSlice";
import { ShieldCheck, Lock, Loader2 } from "lucide-react";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(initAuthFromStorage());
  }, [dispatch]);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname || "/");

  useEffect(() => {
    if (!mounted || !isInitialized) return;

    if (!isAuthenticated && !isPublicRoute) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
    }

    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
      router.replace("/explorer");
    }
  }, [mounted, isInitialized, isAuthenticated, isPublicRoute, pathname, router]);

  // If page is protected and user is not authenticated, show high-security gate while redirecting
  if (mounted && isInitialized && !isAuthenticated && !isPublicRoute) {
    return (
      <div className="min-h-screen bg-[#090b10] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 rounded-2xl bg-[#0d101a] border border-[#1f283d] shadow-2xl max-w-md w-full space-y-4 animate-in fade-in">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Enterprise Authentication Required
            </h2>
            <p className="text-xs text-zinc-400">
              Access to DataScope intelligence modules requires an authorized enterprise identity. Redirecting to sign in...
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-indigo-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting to secure login...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

