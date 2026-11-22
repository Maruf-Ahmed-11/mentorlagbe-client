"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  Users, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  FileText, 
  Bookmark, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  Crown,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userName = user?.name || "asdf";
  const userEmail = user?.email || "admin@mentorlagbe.com";
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : "student");
  const isAdmin = userRole === "admin";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. ADMIN DASHBOARD VIEW (Platform Admin)                                  */}
      {/* ========================================================================= */}
      {isAdmin ? (
        <>
          {/* Admin Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C0307] border border-[#E11D48]/35 text-[11px] font-mono font-bold tracking-wider text-[#FF1E40] uppercase mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CENTRAL COMMAND // ADMIN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                System Administration
              </h2>
              <p className="text-xs sm:text-sm text-[#BFA5AA] mt-1">
                Platform metrics, tuition moderation queue, user roles, and payment volume.
              </p>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1: Total Users */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Total Users
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF1E40] border border-[#E11D48]/30 shadow-sm">
                  <Users className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  0
                </span>
                <p className="text-[11px] text-[#BFA5AA] mt-1">
                  Registered students and mentors
                </p>
              </div>
            </div>

            {/* Metric 2: Total Tutors */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Total Tutors
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF4D6D] border border-[#E11D48]/30 shadow-sm">
                  <GraduationCap className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  0
                </span>
                <p className="text-[11px] text-[#BFA5AA] mt-1">
                  Active mentors enrolled
                </p>
              </div>
            </div>

            {/* Metric 3: Pending Tuitions */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Pending Tuitions
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A060C] text-[#FFB800] border border-[#E11D48]/30 shadow-sm">
                  <Clock className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                    0
                  </span>
                  <p className="text-[11px] text-[#BFA5AA] mt-1">
                    Awaiting moderation checks
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0A2618] text-[#10B981] border border-[#10B981]/30">
                  All Clear
                </span>
              </div>
            </div>

            {/* Metric 4: Total Revenue */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Total Revenue
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF1E40] border border-[#E11D48]/30 shadow-sm">
                  <DollarSign className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  $0
                </span>
                <p className="text-[11px] text-[#BFA5AA] mt-1">
                  Cumulative Stripe subscription volume
                </p>
              </div>
            </div>
          </div>

          {/* 3 Clickable Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: User Management */}
            <Link
              href="/dashboard"
              className="group rounded-2xl bg-[#160307]/80 border border-[#E11D48]/25 p-6 backdrop-blur-xl hover:border-[#FF1E40] hover:shadow-[0_10px_30px_rgba(255,30,64,0.25)] hover:-translate-y-1 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF1E40] border border-[#E11D48]/30 group-hover:bg-[#E11D48] group-hover:text-white transition-all shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FF1E40] transition-colors">
                    User Management
                  </h3>
                  <p className="text-xs text-[#BFA5AA] mt-0.5">
                    Manage roles & access
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#BFA5AA] group-hover:text-[#FF1E40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            {/* Card 2: Tuition Moderation */}
            <Link
              href="/dashboard"
              className="group rounded-2xl bg-[#160307]/80 border border-[#E11D48]/25 p-6 backdrop-blur-xl hover:border-[#FF1E40] hover:shadow-[0_10px_30px_rgba(255,30,64,0.25)] hover:-translate-y-1 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A060C] text-[#FFB800] border border-[#E11D48]/30 group-hover:bg-[#FFB800] group-hover:text-black transition-all shadow-sm">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FF1E40] transition-colors">
                    Tuition Moderation
                  </h3>
                  <p className="text-xs text-[#BFA5AA] mt-0.5">
                    0 pending review
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#BFA5AA] group-hover:text-[#FF1E40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            {/* Card 3: Transactions */}
            <Link
              href="/dashboard"
              className="group rounded-2xl bg-[#160307]/80 border border-[#E11D48]/25 p-6 backdrop-blur-xl hover:border-[#FF1E40] hover:shadow-[0_10px_30px_rgba(255,30,64,0.25)] hover:-translate-y-1 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF4D6D] border border-[#E11D48]/30 group-hover:bg-[#FF4D6D] group-hover:text-white transition-all shadow-sm">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FF1E40] transition-colors">
                    Transactions
                  </h3>
                  <p className="text-xs text-[#BFA5AA] mt-0.5">
                    Stripe payment logs
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#BFA5AA] group-hover:text-[#FF1E40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* 2. STUDENT / TUTOR WORKSPACE VIEW                                         */
        /* ========================================================================= */
        <>
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Welcome back, {userName}!</span>
                <span>👋</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#BFA5AA] mt-1">
                Track your applied tuition applications, reviews, and learning journey.
              </p>
            </div>

            <Link
              href="/#tuitions"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#FF1E40] to-[#FF4D6D] text-white font-bold text-xs shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(255,30,64,0.8)] transition-all active:scale-95 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse Tuitions</span>
            </Link>
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Applied */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Total Applied
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF1E40] border border-[#E11D48]/30">
                  <FileText className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  0
                </span>
                <p className="text-[11px] text-[#BFA5AA] mt-1">
                  Total tuition posts applied for
                </p>
              </div>
            </div>

            {/* Accepted */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Accepted
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A2618] text-[#10B981] border border-[#10B981]/30">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  0
                </span>
                <p className="text-[11px] text-[#BFA5AA] mt-1">
                  Approved applications by mentors
                </p>
              </div>
            </div>

            {/* Pending */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Pending
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A060C] text-[#FFB800] border border-[#E11D48]/30">
                  <Clock className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                  0
                </span>
                <p className="text-[11px] text-[#BFA5AA] mt-1">
                  Awaiting mentor review & confirmation
                </p>
              </div>
            </div>

            {/* Current Plan */}
            <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BFA5AA]">
                  Current Plan
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#281804] text-[#FFB800] border border-[#FFB800]/30 shadow-sm">
                  <Crown className="h-4.5 w-4.5 fill-[#FFB800]" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#FFB800] tracking-tight drop-shadow-md">
                  PRO
                </span>
                <p className="text-[11px] text-[#BFA5AA] mt-1">
                  Premium member access enabled
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-2xl bg-[#160307]/90 border border-[#E11D48]/25 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#FF1E40]" />
              <span>Quick Actions</span>
            </h3>

            <div className="space-y-2.5">
              {/* Row 1: My Applications */}
              <Link
                href="/dashboard/applications"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#100103] border border-[#E11D48]/20 hover:border-[#FF1E40] hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF1E40] border border-[#E11D48]/30 group-hover:bg-[#E11D48] group-hover:text-white transition-all">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FF1E40] transition-colors">
                      My Applications
                    </h4>
                    <p className="text-xs text-[#BFA5AA]">
                      Track and manage submissions
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#BFA5AA] group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Row 2: Saved Tuitions */}
              <Link
                href="/dashboard/saved-tuitions"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#100103] border border-[#E11D48]/20 hover:border-[#FF1E40] hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A060C] text-[#FFB800] border border-[#E11D48]/30 group-hover:bg-[#FFB800] group-hover:text-black transition-all">
                    <Bookmark className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FF1E40] transition-colors">
                      Saved Tuitions
                    </h4>
                    <p className="text-xs text-[#BFA5AA]">
                      Your bookmarked subjects
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#BFA5AA] group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Row 3: Explore Mentors */}
              <Link
                href="/#tuitions"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#100103] border border-[#E11D48]/20 hover:border-[#FF1E40] hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A060C] text-[#FF4D6D] border border-[#E11D48]/30 group-hover:bg-[#FF4D6D] group-hover:text-white transition-all">
                    <Search className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FF1E40] transition-colors">
                      Explore Mentors
                    </h4>
                    <p className="text-xs text-[#BFA5AA]">
                      Find experienced tutors nationwide
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#BFA5AA] group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* Success Rate Tip Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#1E0307] to-[#120205] border border-[#E11D48]/30 p-4 sm:p-5 flex items-center gap-4 shadow-lg">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2E070F] text-[#FF1E40] border border-[#FF1E40]/40">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1E40]">
                Boost your success rate
              </p>
              <p className="text-xs text-[#F4E2E5]/80 mt-0.5">
                Keep your student profile and contact details up-to-date so mentors can contact you quickly.
              </p>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
