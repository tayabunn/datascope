"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, UserRole } from "@/store/slices/authSlice";
import { addToast } from "@/store/slices/toastSlice";
import {
  Layers,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  User,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState("Marcus Vance");
  const [email, setEmail] = useState("marcus.vance@enterprise.io");
  const [company, setCompany] = useState("Apex Global Systems");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Data Analyst");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      setCredentials({
        user: {
          id: `u-${selectedRole.toLowerCase().replace(" ", "-")}-${Date.now().toString().slice(-4)}`,
          email,
          fullName,
          role: selectedRole,
        },
        token: `reg-jwt-token-${Date.now()}`,
      })
    );

    dispatch(
      addToast({
        type: "success",
        title: "Registration Complete",
        message: `Welcome, ${fullName}! You are now authorized as ${selectedRole}.`,
      })
    );

    router.push("/explorer");
  };

  const handleQuickPreset = (role: UserRole, name: string, mail: string) => {
    setSelectedRole(role);
    setFullName(name);
    setEmail(mail);
  };

  return (
    <div className="min-h-screen bg-[#090b10] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#0d101a] border border-[#1d263b] rounded-2xl p-8 shadow-2xl space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 items-center justify-center mx-auto shadow-lg shadow-indigo-500/20 text-white hover:scale-105 transition-transform"
          >
            <Layers className="w-6 h-6" />
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Create an Enterprise Account
          </h2>
          <p className="text-xs text-zinc-400">
            Join the centralized DataScope platform for high-performance discovery
          </p>
        </div>

        {/* Evaluation Role Presets */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Quick Demo Provisioning
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121624] border border-[#1f283d] rounded-xl">
            {(
              [
                {
                  role: "Administrator",
                  name: "Alex Rivera (CDO)",
                  email: "admin@datascope.internal",
                },
                {
                  role: "Data Analyst",
                  name: "Sarah Connor",
                  email: "analyst@datascope.internal",
                },
                {
                  role: "Viewer",
                  name: "Marcus Vance",
                  email: "viewer@datascope.internal",
                },
              ] as const
            ).map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() =>
                  handleQuickPreset(item.role, item.name, item.email)
                }
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

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#121624] border border-[#1f283d] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Sarah Connor"
              />
              <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#121624] border border-[#1f283d] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="user@enterprise.internal"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Organization / Enterprise
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#121624] border border-[#1f283d] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Global Corp Inc"
              />
              <Building2 className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#121624] border border-[#1f283d] text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all mt-2 group"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#1a2236]">
          <p className="text-xs text-zinc-400">
            Already have an enterprise account?{" "}
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
