"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, UserRole } from "@/store/slices/authSlice";
import { addToast } from "@/store/slices/toastSlice";
import { X, CheckCircle2, ShieldCheck, Loader2, UserPlus, ArrowRight } from "lucide-react";

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  redirectPath?: string;
}

export function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
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

const GOOGLE_ACCOUNTS = [
  {
    name: "Tayabun Nesa Jannat",
    email: "tayabun.nesa@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    suggestedRole: "Data Analyst" as UserRole,
  },
  {
    name: "Alex Rivera (CDO)",
    email: "admin.cdo@datascope.internal",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    suggestedRole: "Administrator" as UserRole,
  },
  {
    name: "Marcus Vance",
    email: "marcus.viewer@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    suggestedRole: "Viewer" as UserRole,
  },
];

export default function GoogleOAuthModal({
  isOpen,
  onClose,
  defaultRole = "Data Analyst",
  redirectPath = "/explorer",
}: GoogleOAuthModalProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<typeof GOOGLE_ACCOUNTS[0] | null>(null);

  if (!isOpen) return null;

  const handleAccountSelect = (acc: typeof GOOGLE_ACCOUNTS[0]) => {
    setSelectedAccount(acc);
    setIsAuthenticating(true);
    setAuthStep("Contacting Google Identity Services...");

    setTimeout(() => {
      setAuthStep("Exchanging OAuth 2.0 Authorization Token with Neon Identity...");
    }, 600);

    setTimeout(() => {
      setAuthStep("Identity Verified. Granting DataScope Enterprise Access...");
    }, 1200);

    setTimeout(() => {
      dispatch(
        setCredentials({
          user: {
            id: `u-google-${Date.now().toString().slice(-4)}`,
            email: acc.email,
            fullName: acc.name,
            role: selectedRole || acc.suggestedRole,
            avatar: acc.avatar,
          },
          token: `google-oauth-bearer-${Date.now()}`,
        })
      );

      dispatch(
        addToast({
          type: "success",
          title: "Google Authentication Successful",
          message: `Signed in as ${acc.name} (${selectedRole || acc.suggestedRole})`,
        })
      );

      setIsAuthenticating(false);
      onClose();
      router.push(redirectPath);
    }, 1700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f121d] border border-[#20293d] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Google Header */}
        <div className="p-6 border-b border-[#1b2336] bg-[#121624] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoogleLogo className="w-6 h-6" />
            <div>
              <h2 className="text-sm font-semibold text-white tracking-tight">
                Sign in with Google
              </h2>
              <p className="text-[11px] text-zinc-400">
                Choose an account to continue to DataScope Enterprise
              </p>
            </div>
          </div>
          {!isAuthenticating && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2133] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isAuthenticating ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white">
                  Authenticating with Google
                </p>
                <p className="text-[11px] font-mono text-zinc-400">
                  {authStep}
                </p>
              </div>
              <div className="w-48 h-1 bg-[#161d2d] rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 animate-pulse w-full" />
              </div>
            </div>
          ) : (
            <>
              {/* Role Picker for this session */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Select Target Access Role:
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#131826] border border-[#1f283d] rounded-xl text-xs">
                  {(["Administrator", "Data Analyst", "Viewer"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRole(r)}
                      className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                        selectedRole === r
                          ? "bg-indigo-600 text-white font-semibold shadow"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {r === "Administrator" ? "Admin" : r === "Data Analyst" ? "Analyst" : "Viewer"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account list */}
              <div className="space-y-2">
                <p className="text-[11px] text-zinc-400 font-medium">
                  Select Google Account:
                </p>
                <div className="divide-y divide-[#1b2336] border border-[#1d263b] rounded-xl overflow-hidden bg-[#121624]">
                  {GOOGLE_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => handleAccountSelect(acc)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-[#181f33] transition-colors text-left group"
                    >
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#2a354f]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                          <span>{acc.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {acc.suggestedRole}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono truncate">
                          {acc.email}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-zinc-500 text-center">
                By continuing, Google shares your verified name, email address, and profile photo with DataScope.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

