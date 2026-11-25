"use client";

import Link from "next/link";
import { 
  FileText, 
  Bookmark, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Crown, 
  Zap, 
  ChevronRight 
} from "lucide-react";
import { DashboardViewProps } from "./types";

export default function StudentDashboardView({ user, userName }: DashboardViewProps) {
  const isPro = (user?.plan || "free").toLowerCase() === "pro";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight flex items-center gap-2">
            <span>Welcome back, {userName}!</span>
            <span>👋</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Track your applied tuition applications, reviews, and learning journey.
          </p>
        </div>

        <Link
          href="/#tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-xs shadow-[0_4px_16px_rgba(2, 132, 199,0.3)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14, 165, 233,0.8)] transition-all active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Browse Tuitions</span>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Applied */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Applied
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30">
              <FileText className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Total tuition posts applied for
            </p>
          </div>
        </div>

        {/* Accepted */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Accepted
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Approved applications by mentors
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Pending
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#102547] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#0284C7]/30">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              0
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Awaiting mentor review & confirmation
            </p>
          </div>
        </div>

        {/* Current Plan */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Current Plan
            </span>
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              isPro
                ? "bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30 shadow-sm"
                : "bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#0284C7]/20"
            }`}>
              {isPro ? (
                <Crown className="h-4.5 w-4.5 fill-[#B45309] dark:fill-[#FFB800]" />
              ) : (
                <Sparkles className="h-4.5 w-4.5 text-[#0284C7] dark:text-[#0EA5E9]" />
              )}
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className={`text-3xl font-black tracking-tight drop-shadow-sm ${
                isPro ? "text-[#B45309] dark:text-[#FFB800]" : "text-[#0B1320] dark:text-white"
              }`}>
                {isPro ? "PRO" : "FREE"}
              </span>
              <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
                {isPro ? "Unlimited applications & priority ranking" : "10 free applications limit"}
              </p>
            </div>
            {!isPro && (
              <Link
                href="/checkout?plan=student"
                className="px-3 py-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold shadow-sm transition-all active:scale-95"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-xl space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
          <span>Quick Actions</span>
        </h3>

        <div className="space-y-2.5">
          {/* Row 1: My Applications */}
          <Link
            href="/dashboard/applications"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#050B14] border border-[#E2E8F0] dark:border-[#0284C7]/20 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:bg-[#0284C7] group-hover:text-white transition-all">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                  My Applications
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Track and manage submissions
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 2: Saved Tuitions */}
          <Link
            href="/dashboard/saved-tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#050B14] border border-[#E2E8F0] dark:border-[#0284C7]/20 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#102547] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#0284C7]/30 group-hover:bg-[#D97706] group-hover:text-white dark:group-hover:bg-[#FFB800] dark:group-hover:text-black transition-all">
                <Bookmark className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                  Saved Tuitions
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Your bookmarked subjects
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 3: Explore Mentors */}
          <Link
            href="/#tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#050B14] border border-[#E2E8F0] dark:border-[#0284C7]/20 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:bg-[#0284C7] group-hover:text-white transition-all">
                <Search className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                  Explore Mentors
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Find experienced tutors nationwide
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Dynamic Plan Status Banner */}
      <div className="rounded-2xl bg-[#E0F2FE] dark:bg-gradient-to-r dark:from-[#0D1D38] dark:to-[#07101E] border border-[#BAE6FD] dark:border-[#0284C7]/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm dark:shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#132E59] text-[#0284C7] dark:text-[#FFB800] border border-[#BAE6FD] dark:border-[#0EA5E9]/40 shadow-sm">
            {isPro ? (
              <Crown className="h-5 w-5 fill-[#0284C7] dark:fill-[#FFB800]" />
            ) : (
              <Sparkles className="h-5 w-5 text-[#0284C7] dark:text-[#38BDF8]" />
            )}
          </div>
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#0EA5E9]">
              {isPro ? "Pro Member Active" : "Free Plan Active"}
            </p>
            <p className="text-xs text-[#475569] dark:text-[#E2E8F0]/80 mt-0.5">
              {isPro
                ? "You have unlimited tuition applications and priority student visibility across the platform."
                : "You can submit up to 10 free applications. Upgrade to Pro for unlimited applications and priority booking."}
            </p>
          </div>
        </div>

        {!isPro && (
          <Link
            href="/checkout?plan=student"
            className="shrink-0 self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            Upgrade to Pro
          </Link>
        )}
      </div>
    </div>
  );
}
