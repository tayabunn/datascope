"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { addToast } from "@/store/slices/toastSlice";
import DataScopeLogo from "@/components/common/DataScopeLogo";
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
  Globe,
  ExternalLink,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = mounted && user?.role === "Administrator";

  const navItems = [
    {
      label: isAdmin ? "Admin Dashboard" : "Overview",
      href: "/overview",
      icon: isAdmin ? ShieldCheck : LayoutDashboard,
      badge: isAdmin ? "Admin" : undefined,
    },
    { label: "Dataset Library", href: "/datasets", icon: Layers },
    { label: "Data Explorer", href: "/explorer", icon: Database, badge: "100k+" },
    { label: "Advanced Search", href: "/search", icon: Search },
    { label: "Saved Views", href: "/saved-views", icon: BookmarkCheck },
    { label: "Search History", href: "/history", icon: History },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    {
      label: "System Settings",
      href: "/settings",
      icon: Settings,
      adminOnly: true,
      badge: isAdmin ? "Full Access" : "Admin",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      addToast({
        type: "info",
        title: "Signed Out",
        message: "You have been successfully signed out of DataScope.",
      })
    );
    router.push("/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0c0f17] border-r border-[#1a2030] flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
      {/* Brand Header with direct Link to Landing Page */}
      <div>
        <Link
          href="/"
          className="h-16 flex items-center gap-3 px-5 border-b border-[#1a2030] hover:bg-[#121622] transition-colors group cursor-pointer block"
          title="Return to Public Landing Page"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-none bg-gradient-to-br from-[#6c35f5] to-[#581ccb] border border-[#968dfa]/30 flex items-center justify-center shadow-lg shadow-[#6c35f5]/25 text-white font-bold text-lg group-hover:scale-105 transition-transform p-2">
              <DataScopeLogo className="w-full h-full text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white tracking-tight text-base">
                  DataScope
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-none bg-[#6c35f5]/15 text-[#b193e0] border border-[#968dfa]/30 font-semibold">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Enterprise Intelligence
              </p>
            </div>
          </div>
        </Link>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
            {isAdmin ? "Admin Controls" : "Platform Modules"}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/overview"
                ? pathname === "/overview"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-none text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-[#6c35f5]/15 text-[#b193e0] border border-[#968dfa]/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141926]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? "text-[#968dfa]"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.adminOnly && !isAdmin ? (
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-none bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Admin
                  </span>
                ) : item.badge ? (
                  <span
                    className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-none ${
                      isAdmin && item.badge === "Admin"
                        ? "bg-[#6c35f5]/25 text-[#b193e0] border border-[#968dfa]/40"
                        : isAdmin && item.badge === "Full Access"
                        ? "bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30"
                        : "bg-[#6c35f5]/20 text-[#b193e0] border border-[#968dfa]/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}

          {/* Public Portal Navigation */}
          <div className="pt-3 pb-1 px-3 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
            Public Portal
          </div>
          <Link
            href="/"
            className={`flex items-center justify-between px-3 py-2 rounded-none text-xs font-medium transition-all group ${
              pathname === "/"
                ? "bg-[#6c35f5]/15 text-[#b193e0] border border-[#968dfa]/30 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141926]"
            }`}
            title="View the public marketing & features landing page"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#968dfa]" />
              <span>Public Landing Page</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
          </Link>
        </nav>
      </div>

      {/* Authenticated User Profile & Fixed Role Identity */}
      <div className="p-3 border-t border-[#1a2030] bg-[#090b12]">
        <div className="p-2.5 rounded-none bg-[#121622] border border-[#1d2436] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1 font-semibold">
              <ShieldCheck
                className={`w-3.5 h-3.5 ${
                  isAdmin
                    ? "text-[#968dfa]"
                    : user?.role === "Data Analyst"
                    ? "text-[#0b7d55]"
                    : "text-zinc-400"
                }`}
              />
              {isAdmin ? "Administrator Authority" : "Authenticated Session"}
            </span>

            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-none ${
                isAdmin
                  ? "bg-[#6c35f5]/25 text-[#b193e0] border border-[#968dfa]/40"
                  : mounted && user?.role === "Data Analyst"
                  ? "bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700"
              }`}
            >
              {mounted ? (user?.role || "Viewer") : "Session"}
            </span>
          </div>

          <div className="pt-1.5 flex items-center justify-between border-t border-[#1d2436]/60">
            <div className="flex items-center gap-2 overflow-hidden">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                  isAdmin
                    ? "bg-[#6c35f5]/20 border border-[#968dfa]/40 text-[#b193e0]"
                    : mounted && user?.role === "Data Analyst"
                    ? "bg-[#0b7d55]/20 border border-[#0b7d55]/40 text-[#0b7d55]"
                    : "bg-zinc-800 border border-zinc-700 text-zinc-300"
                }`}
              >
                {mounted ? (user?.fullName?.charAt(0) || "U") : "D"}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-zinc-200 truncate">
                  {mounted ? (user?.fullName || "Authenticated User") : "DataScope User"}
                </div>
                <div className="text-[10px] text-zinc-400 font-mono truncate">
                  {mounted ? (user?.email || "user@datascope.internal") : "user@datascope.internal"}
                </div>
              </div>
            </div>

            {/* Logout Action Button */}
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-none text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all flex-shrink-0"
              title="Sign out of DataScope"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
