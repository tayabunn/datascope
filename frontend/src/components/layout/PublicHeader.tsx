"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import DataScopeLogo from "@/components/common/DataScopeLogo";
import {
  Database,
  ArrowRight,
  Layers,
  Cpu,
  TableProperties,
} from "lucide-react";

export default function PublicHeader() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#001225]/92 border-b border-[#132a4a]">
      <div className="w-[90%] mx-auto h-18 flex items-center justify-between relative">
        {/* Brand Logo - GENESIS Architectural Blueprint */}
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#1e6aff] flex items-center justify-center shadow-lg shadow-[#1e6aff]/20 text-white font-bold group-hover:scale-105 transition-transform p-2 relative">
            <span className="absolute -top-1 -left-1 text-[8px] font-mono text-[#38bdf8] leading-none">⌜</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-[#38bdf8] leading-none">⌟</span>
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

        {/* Action Trigger Buttons */}
        <div className="flex items-center gap-3">
          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-mono hidden xl:inline">
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
                href="/explorer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-primary text-white text-xs font-semibold shadow-md transition-all group"
              >
                <span>Explore Demo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
