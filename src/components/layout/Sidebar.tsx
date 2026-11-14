"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { switchRole, UserRole } from "@/store/slices/authSlice";
import {
  LayoutDashboard,
  Database,
  Search,
  BookmarkCheck,
  History,
  BarChart3,
  Settings,
  ShieldCheck,
  Layers,
  Sparkles,
  UserCheck,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Data Explorer", href: "/explorer", icon: Database, badge: "100k+" },
  { label: "Advanced Search", href: "/search", icon: Search },
  { label: "Saved Views", href: "/saved-views", icon: BookmarkCheck },
  { label: "Search History", href: "/history", icon: History },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "System Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0c0f17] border-r border-[#1a2030] flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center gap-3 px-5 border-b border-[#1a2030]">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white tracking-tight text-base">
                DataScope
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              Enterprise Intelligence
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
            Platform Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141926]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? "text-indigo-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RBAC Role Switcher & User Profile */}
      <div className="p-3 border-t border-[#1a2030] bg-[#090b12]">
        <div className="p-2.5 rounded-lg bg-[#121622] border border-[#1d2436] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Active Role (RBAC)
            </span>
          </div>

          {/* Quick Role Switcher Buttons */}
          <div className="grid grid-cols-3 gap-1">
            {(["Administrator", "Data Analyst", "Viewer"] as UserRole[]).map(
              (r) => {
                const isSelected = user?.role === r;
                return (
                  <button
                    key={r}
                    onClick={() => dispatch(switchRole(r))}
                    className={`text-[9px] py-1 px-1 rounded font-medium text-center transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white font-semibold shadow"
                        : "bg-[#181e2e] text-zinc-400 hover:text-zinc-200 hover:bg-[#20283d]"
                    }`}
                    title={`Switch session to ${r}`}
                  >
                    {r === "Administrator"
                      ? "Admin"
                      : r === "Data Analyst"
                      ? "Analyst"
                      : "Viewer"}
                  </button>
                );
              }
            )}
          </div>

          <div className="pt-1.5 flex items-center gap-2 border-t border-[#1d2436]/60">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xs font-semibold text-indigo-300">
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-zinc-200 truncate">
                {user?.fullName || "Sarah Connor"}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono truncate">
                {user?.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
