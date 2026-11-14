"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, UserRole } from "@/store/slices/authSlice";
import { addToast } from "@/store/slices/toastSlice";
import {
  Layers,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  UserCheck,
  Database,
} from "lucide-react";
import Link from "next/link";

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

import GoogleOAuthModal, { GoogleLogo } from "@/components/auth/GoogleOAuthModal";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("analyst@datascope.internal");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Data Analyst");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      dispatch(
        addToast({
          type: "error",
          title: "Invalid Credentials",
          message: "Please enter a valid enterprise work email address.",
        })
      );
      return;
    }

    if (!password || password.length < 4) {
      dispatch(
        addToast({
          type: "error",
          title: "Invalid Password",
          message: "Password must be at least 4 characters.",
        })
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(
        setCredentials({
          user: {
            id: `u-${selectedRole.toLowerCase().replace(" ", "-")}-01`,
            email,
            fullName:
              selectedRole === "Administrator"
                ? "Alex Rivera (CDO)"
                : selectedRole === "Data Analyst"
                ? "Sarah Connor"
                : "Marcus Vance",
            role: selectedRole,
          },
          token: `datascope-jwt-token-${Date.now()}`,
        })
      );

      dispatch(
        addToast({
          type: "success",
          title: "Authentication Verified",
          message: `Authenticated as ${selectedRole}. Launching Enterprise Explorer...`,
        })
      );

      setIsSubmitting(false);
      router.push("/explorer");
    }, 700);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleModalOpen(true);
  };

  const handleQuickRole = (role: UserRole, defaultEmail: string) => {
    setSelectedRole(role);
    setEmail(defaultEmail);
  };

  return (
    <div className="min-h-screen bg-[#090b10] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#0d101a] border border-[#1d263b] rounded-2xl p-8 shadow-2xl space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20 text-white">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sign In to DataScope
          </h2>
          <p className="text-xs text-zinc-400">
            Enterprise Data Discovery & Intelligence Platform
          </p>
        </div>

        {/* Quick Role Selection Tabs (For Evaluators) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Select Demo Evaluation Role
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121624] border border-[#1f283d] rounded-xl">
            {(
              [
                { role: "Administrator", email: "admin@datascope.internal" },
                { role: "Data Analyst", email: "analyst@datascope.internal" },
                { role: "Viewer", email: "viewer@datascope.internal" },
              ] as const
            ).map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() => handleQuickRole(item.role, item.email)}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                  selectedRole === item.role
                    ? "bg-indigo-600 text-white font-semibold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.role === "Administrator"
                  ? "Admin"
                  : item.role === "Data Analyst"
                  ? "Analyst"
                  : "Viewer"}
              </button>
            ))}
          </div>
        </div>

        {/* Google OAuth Login Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 px-4 rounded-xl bg-[#131726] hover:bg-[#181e30] border border-[#232b40] hover:border-[#384566] text-white text-xs font-medium flex items-center justify-center gap-2.5 transition-all shadow-sm group"
        >
          <GoogleIcon className="w-4 h-4" />
          <span>Continue with Google as {selectedRole}</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#1e2538] w-full" />
          <span className="bg-[#0d101a] px-2.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 whitespace-nowrap">
            Or with work email
          </span>
          <div className="border-t border-[#1e2538] w-full" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-zinc-300 font-medium">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#141926] border border-[#222a3d] text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-zinc-300 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#141926] border border-[#222a3d] text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Authenticate as {selectedRole}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 space-y-2 border-t border-[#1a2236]">
          <p className="text-xs text-zinc-400">
            Need an enterprise account?{" "}
            <Link
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
            >
              Register
            </Link>
          </p>
          <div>
            <Link
              href="/"
              className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Return to Landing Page
            </Link>
          </div>
        </div>
      </div>

      {/* Realistic Google OAuth 2.0 Consent Dialog */}
      <GoogleOAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        defaultRole={selectedRole}
        redirectPath="/explorer"
      />
    </div>
  );
}

