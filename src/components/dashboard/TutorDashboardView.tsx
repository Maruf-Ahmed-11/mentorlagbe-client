"use client";

import Link from "next/link";
import { 
  Users, 
  GraduationCap, 
  Crown, 
  BookOpen, 
  CheckCircle2, 
  Zap, 
  Plus, 
  ChevronRight,
  Sparkles 
} from "lucide-react";
import { DashboardViewProps } from "./types";

export default function TutorDashboardView({ user, userName }: DashboardViewProps) {
  const isPro = (user?.plan || "free").toLowerCase() === "pro";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Tutor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#1C0307] border border-[#F2B8C4] dark:border-[#E11D48]/35 text-[11px] font-mono font-bold tracking-wider text-[#D91E48] dark:text-[#FF1E40] uppercase mb-2 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>INSTRUCTOR HUB // OVERVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight">
            Tutor Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            Welcome back, {userName}! Track your tuition listings and incoming student applicants.
          </p>
        </div>

        <Link
          href="/dashboard/post-tuition"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.25)] dark:shadow-[0_0_20px_rgba(225,29,72,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,30,64,0.8)] transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Tuition</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Tuitions */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Total Tuitions
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 shadow-sm">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
              {isPro ? "Unlimited" : "Max 2"}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
              isPro
                ? "bg-[#FEF3C7] dark:bg-[#FFB800]/20 text-[#B45309] dark:text-[#FFB800] border-[#FDE68A] dark:border-[#FFB800]/40"
                : "bg-[#F5ECEC] dark:bg-[#200408] text-[#8C7679] dark:text-[#BFA5AA] border-[#EADCDD] dark:border-[#E11D48]/20"
            }`}>
              {isPro ? "PRO" : "FREE"}
            </span>
          </div>
          <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            {isPro ? "Unlimited posts unlocked" : "Free tier: up to 2 posts"}
          </p>
        </div>

        {/* Metric 2: Active & Approved */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Active & Approved
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30 shadow-sm">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
              11
            </span>
            <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
              Publicly listed and accepting students
            </p>
          </div>
        </div>

        {/* Metric 3: Total Applicants */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Total Applicants
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#E11D48]/30 shadow-sm">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
              8
            </span>
            <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
              Interested students applied across all posts
            </p>
          </div>
        </div>

        {/* Metric 4: Current Plan */}
        <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FFB800] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Current Plan
            </span>
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              isPro
                ? "bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30 shadow-sm"
                : "bg-[#F5ECEC] dark:bg-[#200408] text-[#8C7679] dark:text-[#BFA5AA] border border-[#EADCDD] dark:border-[#E11D48]/20"
            }`}>
              {isPro ? (
                <Crown className="h-4.5 w-4.5 fill-[#B45309] dark:fill-[#FFB800]" />
              ) : (
                <Sparkles className="h-4.5 w-4.5 text-[#D91E48] dark:text-[#FF1E40]" />
              )}
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className={`text-3xl font-black tracking-tight drop-shadow-sm ${
                isPro ? "text-[#B45309] dark:text-[#FFB800]" : "text-[#180C0E] dark:text-white"
              }`}>
                {isPro ? "PRO" : "FREE"}
              </span>
              <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                {isPro ? "Unlimited tuition posts & priority leads" : "Up to 2 free tuition posts"}
              </p>
            </div>
            {!isPro && (
              <Link
                href="/checkout?plan=tutor"
                className="px-3 py-1.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] text-white text-[11px] font-bold shadow-sm transition-all active:scale-95"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tutor Controls Card (List) */}
      <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-xl space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#D91E48] dark:text-[#FF1E40]" />
          <span>Tutor Controls</span>
        </h3>

        <div className="space-y-2.5">
          {/* Row 1: Post New Tuition */}
          <Link
            href="/dashboard/post-tuition"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all shadow-sm">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                  Post New Tuition
                </h4>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                  Create a new course offering
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 2: My Tuitions */}
          <Link
            href="/dashboard/my-tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#E11D48]/30 group-hover:bg-[#D97706] group-hover:text-white dark:group-hover:bg-[#FFB800] dark:group-hover:text-black transition-all shadow-sm">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                  My Tuitions
                </h4>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                  Edit, activate, or delete posts
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 3: Manage Applicants */}
          <Link
            href="/dashboard/applicants"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all shadow-sm">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                  Manage Applicants
                </h4>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                  Accept or reject students
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Pro Member Active Banner */}
      <div className="rounded-2xl bg-[#FDECEF] dark:bg-gradient-to-r dark:from-[#1E0307] dark:to-[#120205] border border-[#F2B8C4] dark:border-[#E11D48]/30 p-4 sm:p-5 flex items-center gap-4 shadow-sm dark:shadow-lg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#2E070F] text-[#D91E48] dark:text-[#FFB800] border border-[#F2B8C4] dark:border-[#FF1E40]/40 shadow-sm">
          <Crown className="h-5 w-5 fill-[#D91E48] dark:fill-[#FFB800]" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#D91E48] dark:text-[#FF1E40]">
            Pro Member Active
          </p>
          <p className="text-xs text-[#5C494C] dark:text-[#F4E2E5]/80 mt-0.5">
            You have unlimited tuition postings and verified tutor badge enabled across the platform.
          </p>
        </div>
      </div>
    </div>
  );
}
