"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import DataScopeLogo from "@/components/common/DataScopeLogo";
import {
  Database,
  ArrowRight,
  Menu,
  X,
  Layers,
  Cpu,
  TableProperties,
} from "lucide-react";

export default function PublicHeader() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      label: "Platform Features",
      href: "/features",
      icon: Layers,
    },
    {
      label: "Data Explorer",
      href: "/data-explorer",
      icon: TableProperties,
    },
    {
      label: "Architecture & Indexing",
      href: "/architecture",
      icon: Cpu,
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#001225]/90 border-b border-[#132a4a]">
      <div className="w-[90%] mx-auto h-18 flex items-center justify-between">
        {/* Brand Logo - GENESIS Architectural Blueprint */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#1e6aff] flex items-center justify-center shadow-lg shadow-[#1e6aff]/20 text-white font-bold group-hover:scale-105 transition-transform p-2">
            <DataScopeLogo className="w-full h-full text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#ffffff] tracking-tight text-lg">
                DataScope
              </span>
              <span className="genesis-badge text-[10px] py-0.5 px-2">
                v2.4 Enterprise
              </span>
            </div>
            <p className="text-[11px] text-[#878787] font-mono">
              High-Performance Data Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none transition-all ${
                  isActive
                    ? "text-[#ffffff] bg-[#091b36] border border-[#1e6aff]/50 shadow-sm shadow-[#1e6aff]/20 font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-[#071529]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#38bdf8]" : "text-zinc-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs: Dynamic based on Session State */}
        <div className="hidden sm:flex items-center gap-3">
          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-mono hidden lg:inline">
                Signed in as{" "}
                <span className="text-[#38bdf8] font-semibold">
                  {user?.fullName?.split(" ")[0] || "User"}
                </span>{" "}
                <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-[#1e6aff]/15 text-[#38bdf8] border border-[#1e6aff]/30">
                  {user?.role}
                </span>
              </span>
              <Link
                href="/explorer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-primary text-white text-xs font-semibold shadow-md transition-all group"
              >
                <Database className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Go to Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-zinc-300 hover:text-white px-3.5 py-2 rounded-none hover:bg-[#071529] transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-primary text-white text-xs font-semibold shadow-md transition-all group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && isAuthenticated && (
            <Link
              href="/explorer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-none btn-render-primary text-white text-xs font-semibold"
            >
              <Database className="w-3 h-3 text-[#38bdf8]" />
              <span>Explorer</span>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-none bg-[#141926] border border-[#202738] text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#132a4a] bg-[#001225]/98 backdrop-blur-2xl px-6 py-4 space-y-3">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-none text-xs font-medium transition-all ${
                    isActive
                      ? "text-[#ffffff] bg-[#091b36] border border-[#1e6aff]/40 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-[#071529]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#38bdf8]" : "text-zinc-500"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#132a4a] flex flex-col gap-2">
            {mounted && isAuthenticated ? (
              <div className="flex items-center justify-between text-xs text-zinc-400 py-1 font-mono">
                <span>Signed in as <strong className="text-white">{user?.fullName}</strong></span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {user?.role}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-none bg-[#141926] border border-[#202738] text-xs font-semibold text-zinc-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-none bg-indigo-600 text-xs font-semibold text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
