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
  ChevronRight,
  Plus,
  BookOpen
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email || "tutor@mentorlagbe.com";
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const userName = user?.name || (userRole === "tutor" ? "Karim Rahman" : "asdf");
  
  const isAdmin = userRole === "admin";
  const isTutor = userRole === "tutor";

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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#1C0307] border border-[#F2B8C4] dark:border-[#E11D48]/35 text-[11px] font-mono font-bold tracking-wider text-[#D91E48] dark:text-[#FF1E40] uppercase mb-2 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CENTRAL COMMAND // ADMIN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight">
                System Administration
              </h2>
              <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                Platform metrics, tuition moderation queue, user roles, and payment volume.
              </p>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1: Total Users */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Total Users
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 shadow-sm">
                  <Users className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                  0
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                  Registered students and mentors
                </p>
              </div>
            </div>

            {/* Metric 2: Total Tutors */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Total Tutors
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#E11D48]/30 shadow-sm">
                  <GraduationCap className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                  0
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                  Active mentors enrolled
                </p>
              </div>
            </div>

            {/* Metric 3: Pending Tuitions */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Pending Tuitions
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#2A060C] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#E11D48]/30 shadow-sm">
                  <Clock className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                    0
                  </span>
                  <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                    Awaiting moderation checks
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30">
                  All Clear
                </span>
              </div>
            </div>

            {/* Metric 4: Total Revenue */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Total Revenue
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 shadow-sm">
                  <DollarSign className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                  $0
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
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
              className="group rounded-2xl bg-white dark:bg-[#160307]/80 border border-[#EADCDD] dark:border-[#E11D48]/25 p-6 backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40] shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(217,30,72,0.15)] dark:hover:shadow-[0_10px_30px_rgba(255,30,64,0.25)] hover:-translate-y-1 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                    User Management
                  </h3>
                  <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] mt-0.5">
                    Manage roles & access
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            {/* Card 2: Tuition Moderation */}
            <Link
              href="/dashboard"
              className="group rounded-2xl bg-white dark:bg-[#160307]/80 border border-[#EADCDD] dark:border-[#E11D48]/25 p-6 backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40] shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(217,30,72,0.15)] dark:hover:shadow-[0_10px_30px_rgba(255,30,64,0.25)] hover:-translate-y-1 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#2A060C] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#E11D48]/30 group-hover:bg-[#D97706] group-hover:text-white dark:group-hover:bg-[#FFB800] dark:group-hover:text-black transition-all shadow-sm">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                    Tuition Moderation
                  </h3>
                  <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] mt-0.5">
                    0 pending review
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            {/* Card 3: Transactions */}
            <Link
              href="/dashboard"
              className="group rounded-2xl bg-white dark:bg-[#160307]/80 border border-[#EADCDD] dark:border-[#E11D48]/25 p-6 backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40] shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(217,30,72,0.15)] dark:hover:shadow-[0_10px_30px_rgba(255,30,64,0.25)] hover:-translate-y-1 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all shadow-sm">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                    Transactions
                  </h3>
                  <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] mt-0.5">
                    Stripe payment logs
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>
        </>
      ) : isTutor ? (
        /* ========================================================================= */
        /* 2. TUTOR / TEACHER DASHBOARD VIEW (Matching media_1795371441462)          */
        /* ========================================================================= */
        <>
          {/* Tutor Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight">
                Tutor Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                Welcome back, {userName}! Track your tuition listings and incoming student applicants.
              </p>
            </div>

            <Link
              href="/dashboard/post-tuition"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Tuition</span>
            </Link>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1: Total Tuitions */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0D9488] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Total Tuitions
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] dark:bg-[#064E3B]/40 text-[#0D9488] dark:text-emerald-400 border border-[#99F6E4] dark:border-emerald-500/30 shadow-sm">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                  12
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-[#CCFBF1] dark:bg-[#064E3B]/60 text-[#0F766E] dark:text-emerald-300 border border-[#99F6E4] dark:border-emerald-500/40">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                Unlimited posts unlocked
              </p>
            </div>

            {/* Metric 2: Active & Approved */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0D9488] transition-all">
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
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0D9488] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Total Applicants
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] dark:bg-[#064E3B]/40 text-[#0D9488] dark:text-emerald-400 border border-[#99F6E4] dark:border-emerald-500/30 shadow-sm">
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
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30 shadow-sm">
                  <Crown className="h-4.5 w-4.5 fill-[#B45309] dark:fill-[#FFB800]" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#B45309] dark:text-[#FFB800] tracking-tight drop-shadow-sm">
                  PRO
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                  Priority listing in searches
                </p>
              </div>
            </div>
          </div>

          {/* Tutor Controls Card (List) */}
          <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-xl space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#0D9488] dark:text-emerald-400" />
              <span>Tutor Controls</span>
            </h3>

            <div className="space-y-2.5">
              {/* Row 1: Post New Tuition */}
              <Link
                href="/dashboard/post-tuition"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#0D9488] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] dark:bg-[#064E3B]/40 text-[#0D9488] dark:text-emerald-400 border border-[#99F6E4] dark:border-emerald-500/30 group-hover:bg-[#0D9488] group-hover:text-white transition-all">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#0D9488] dark:group-hover:text-emerald-400 transition-colors">
                      Post New Tuition
                    </h4>
                    <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                      Create a new course offering
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#0D9488] dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Row 2: My Tuitions */}
              <Link
                href="/dashboard/my-tuitions"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#0D9488] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] dark:bg-[#064E3B]/40 text-[#0D9488] dark:text-emerald-400 border border-[#99F6E4] dark:border-emerald-500/30 group-hover:bg-[#0D9488] group-hover:text-white transition-all">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#0D9488] dark:group-hover:text-emerald-400 transition-colors">
                      My Tuitions
                    </h4>
                    <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                      Edit, activate, or delete posts
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#0D9488] dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Row 3: Manage Applicants */}
              <Link
                href="/dashboard/applicants"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#0D9488] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1] dark:bg-[#064E3B]/40 text-[#0D9488] dark:text-emerald-400 border border-[#99F6E4] dark:border-emerald-500/30 group-hover:bg-[#0D9488] group-hover:text-white transition-all">
                    <Users className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#0D9488] dark:group-hover:text-emerald-400 transition-colors">
                      Manage Applicants
                    </h4>
                    <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                      Accept or reject students
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#0D9488] dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* Pro Member Active Banner */}
          <div className="rounded-2xl bg-[#ECFDF5] dark:bg-gradient-to-r dark:from-[#06241D] dark:to-[#02130F] border border-[#A7F3D0] dark:border-emerald-500/30 p-4 sm:p-5 flex items-center gap-4 shadow-sm dark:shadow-lg">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#064E3B] text-[#059669] dark:text-emerald-300 border border-[#A7F3D0] dark:border-emerald-500/40 shadow-sm">
              <Crown className="h-5 w-5 fill-[#059669] dark:fill-emerald-300" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#059669] dark:text-emerald-400">
                Pro Member Active
              </p>
              <p className="text-xs text-[#064E3B] dark:text-[#D1FAE5]/80 mt-0.5">
                You have unlimited tuition postings and verified tutor badge enabled across the platform.
              </p>
            </div>
          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* 3. STUDENT WORKSPACE VIEW                                                 */
        /* ========================================================================= */
        <>
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight flex items-center gap-2">
                <span>Welcome back, {userName}!</span>
                <span>👋</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                Track your applied tuition applications, reviews, and learning journey.
              </p>
            </div>

            <Link
              href="/#tuitions"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.3)] dark:shadow-[0_0_20px_rgba(225,29,72,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,30,64,0.8)] transition-all active:scale-95 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse Tuitions</span>
            </Link>
          </div>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Applied */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Total Applied
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30">
                  <FileText className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                  0
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                  Total tuition posts applied for
                </p>
              </div>
            </div>

            {/* Accepted */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Accepted
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                  0
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                  Approved applications by mentors
                </p>
              </div>
            </div>

            {/* Pending */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Pending
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#2A060C] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#E11D48]/30">
                  <Clock className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#180C0E] dark:text-white tracking-tight drop-shadow-sm">
                  0
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                  Awaiting mentor review & confirmation
                </p>
              </div>
            </div>

            {/* Current Plan */}
            <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-5 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#D91E48] dark:hover:border-[#FF1E40]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  Current Plan
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30 shadow-sm">
                  <Crown className="h-4.5 w-4.5 fill-[#B45309] dark:fill-[#FFB800]" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-[#B45309] dark:text-[#FFB800] tracking-tight drop-shadow-sm">
                  PRO
                </span>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA] mt-1">
                  Premium member access enabled
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-2xl bg-white dark:bg-[#160307]/90 border border-[#EADCDD] dark:border-[#E11D48]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-xl space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#D91E48] dark:text-[#FF1E40]" />
              <span>Quick Actions</span>
            </h3>

            <div className="space-y-2.5">
              {/* Row 1: My Applications */}
              <Link
                href="/dashboard/applications"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                      My Applications
                    </h4>
                    <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                      Track and manage submissions
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Row 2: Saved Tuitions */}
              <Link
                href="/dashboard/saved-tuitions"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#2A060C] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#E11D48]/30 group-hover:bg-[#D97706] group-hover:text-white dark:group-hover:bg-[#FFB800] dark:group-hover:text-black transition-all">
                    <Bookmark className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                      Saved Tuitions
                    </h4>
                    <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                      Your bookmarked subjects
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Row 3: Explore Mentors */}
              <Link
                href="/#tuitions"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#FCF9F8] dark:bg-[#100103] border border-[#EADCDD] dark:border-[#E11D48]/20 hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:bg-[#D91E48] group-hover:text-white transition-all">
                    <Search className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                      Explore Mentors
                    </h4>
                    <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA]">
                      Find experienced tutors nationwide
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* Success Rate Tip Banner */}
          <div className="rounded-2xl bg-[#FDECEF] dark:bg-gradient-to-r dark:from-[#1E0307] dark:to-[#120205] border border-[#F2B8C4] dark:border-[#E11D48]/30 p-4 sm:p-5 flex items-center gap-4 shadow-sm dark:shadow-lg">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-[#2E070F] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#FF1E40]/40 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#D91E48] dark:text-[#FF1E40]">
                Boost your success rate
              </p>
              <p className="text-xs text-[#5C494C] dark:text-[#F4E2E5]/80 mt-0.5">
                Keep your student profile and contact details up-to-date so mentors can contact you quickly.
              </p>
            </div>
          </div>
        </>
      )}

    </div>
  );
}