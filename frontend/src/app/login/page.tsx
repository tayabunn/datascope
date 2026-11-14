"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, UserRole } from "@/store/slices/authSlice";
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

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("analyst@datascope.internal");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Data Analyst");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
        token: `mock-jwt-token-${Date.now()}`,
      })
    );
    router.push("/explorer");
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
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
          >
            <span>Authenticate as {selectedRole}</span>
            <ArrowRight className="w-4 h-4" />
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
    </div>
  );
}

