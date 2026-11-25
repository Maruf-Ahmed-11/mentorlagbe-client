"use client";

import { useEffect, useState } from "react";
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
  const [stats, setStats] = useState({
    totalTuitions: 0,
    activeAndApproved: 0,
    totalApplicants: 0,
    plan: (user?.plan || "free").toLowerCase(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = user?.email;
    if (!email) {
      setLoading(false);
      return;
    }

    const loadStats = async () => {
      try {
        const res = await fetch(`/api/tutor/stats?email=${encodeURIComponent(email)}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalTuitions: Number(data.totalTuitions || 0),
            activeAndApproved: Number(data.activeAndApproved || 0),
            totalApplicants: Number(data.totalApplicants || 0),
            plan: (data.plan || user?.plan || "free").toLowerCase(),
          });
        }
      } catch (err) {
        console.error("Failed to fetch tutor stats:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 20000);
    return () => clearInterval(interval);
  }, [user?.email, user?.plan]);

  const isPro = stats.plan === "pro" || (user?.plan || "free").toLowerCase() === "pro";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Tutor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase mb-2 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>INSTRUCTOR HUB // OVERVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
            Tutor Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Welcome back, {userName}! Track your tuition listings and incoming student applicants.
          </p>
        </div>

        <Link
          href="/dashboard/post-tuition"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-xs shadow-[0_4px_16px_rgba(2, 132, 199,0.25)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14, 165, 233,0.8)] transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Tuition</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Tuitions */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Tuitions
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              {loading ? "—" : isPro ? stats.totalTuitions : `${stats.totalTuitions} / 2`}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
              isPro
                ? "bg-[#FEF3C7] dark:bg-[#FFB800]/20 text-[#B45309] dark:text-[#FFB800] border-[#FDE68A] dark:border-[#FFB800]/40"
                : "bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#0284C7]/20"
            }`}>
              {isPro ? "PRO" : "FREE"}
            </span>
          </div>
          <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
            {isPro ? "Unlimited posts unlocked" : "Free tier: up to 2 posts"}
          </p>
        </div>

        {/* Metric 2: Active & Approved */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Active & Approved
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30 shadow-sm">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              {loading ? "—" : stats.activeAndApproved}
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Publicly listed and accepting students
            </p>
          </div>
        </div>

        {/* Metric 3: Total Applicants */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Applicants
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              {loading ? "—" : stats.totalApplicants}
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Interested students applied across all posts
            </p>
          </div>
        </div>

        {/* Metric 4: Current Plan */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FFB800] transition-all">
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
                {isPro ? "Unlimited tuition posts & priority leads" : "Up to 2 free tuition posts"}
              </p>
            </div>
            {!isPro && (
              <Link
                href="/checkout?plan=tutor"
                className="px-3 py-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold shadow-sm transition-all active:scale-95"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tutor Controls Card (List) */}
      <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-xl space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
          <span>Tutor Controls</span>
        </h3>

        <div className="space-y-2.5">
          {/* Row 1: Post New Tuition */}
          <Link
            href="/dashboard/post-tuition"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#050B14] border border-[#E2E8F0] dark:border-[#0284C7]/20 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:bg-[#0284C7] group-hover:text-white transition-all shadow-sm">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                  Post New Tuition
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Create a new course offering
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 2: My Tuitions */}
          <Link
            href="/dashboard/my-tuitions"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#050B14] border border-[#E2E8F0] dark:border-[#0284C7]/20 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#0284C7]/30 group-hover:bg-[#D97706] group-hover:text-white dark:group-hover:bg-[#FFB800] dark:group-hover:text-black transition-all shadow-sm">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                  My Tuitions
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Edit, activate, or delete posts
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Row 3: Manage Applicants */}
          <Link
            href="/dashboard/applicants"
            className="group flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#050B14] border border-[#E2E8F0] dark:border-[#0284C7]/20 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:bg-[#0284C7] group-hover:text-white transition-all shadow-sm">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                  Manage Applicants
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Accept or reject students
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Pro Member Active Banner */}
      <div className="rounded-2xl bg-[#E0F2FE] dark:bg-gradient-to-r dark:from-[#0D1D38] dark:to-[#07101E] border border-[#BAE6FD] dark:border-[#0284C7]/30 p-4 sm:p-5 flex items-center gap-4 shadow-sm dark:shadow-lg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#132E59] text-[#0284C7] dark:text-[#FFB800] border border-[#BAE6FD] dark:border-[#0EA5E9]/40 shadow-sm">
          <Crown className="h-5 w-5 fill-[#0284C7] dark:fill-[#FFB800]" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#0EA5E9]">
            Pro Member Active
          </p>
          <p className="text-xs text-[#475569] dark:text-[#E2E8F0]/80 mt-0.5">
            You have unlimited tuition postings and verified tutor badge enabled across the platform.
          </p>
        </div>
      </div>
    </div>
  );
}
