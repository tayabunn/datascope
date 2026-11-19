"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import DataScopeLogo from "@/components/common/DataScopeLogo";
import {
  Database,
  ArrowRight,
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
    },
    {
      label: "Data Explorer",
      href: "/data-explorer",
    },
    {
      label: "Architecture & Indexing",
      href: "/architecture",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="w-[94%] 2xl:w-[92%] max-w-[1600px] mx-auto h-18 flex items-center justify-between relative px-0">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <DataScopeLogo className="w-7 h-7 shrink-0" fill="#00244a" />
          <span
            className="font-bold tracking-tight text-xl font-sans"
            style={{ color: "#00244a" }}
          >
            DataScope
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-none transition-all ${
                  isActive
                    ? "text-zinc-900 bg-zinc-100 border border-zinc-300 font-semibold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Trigger Buttons */}
        <div className="flex items-center gap-3">
          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-600 font-mono hidden xl:inline">
                Signed in as{" "}
                <span className="text-zinc-900 font-semibold">
                  {user?.fullName?.split(" ")[0] || "User"}
                </span>{" "}
                <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-zinc-100 text-zinc-700 border border-zinc-300">
                  {user?.role}
                </span>
              </span>
              <Link
                href="/explorer"
                className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-none bg-[#001225] hover:bg-[#1e6aff] text-white text-sm font-semibold shadow-md transition-all group"
              >
                <Database className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Go to Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-700 hover:text-zinc-950 px-3.5 py-2 rounded-none hover:bg-zinc-100 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/explorer"
                className="px-5 py-2.5 rounded-none bg-[#001225] hover:bg-[#1e6aff] text-white text-sm font-semibold shadow-md transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
