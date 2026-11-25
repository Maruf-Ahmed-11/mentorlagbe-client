"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Clock,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { DashboardViewProps } from "./types";

interface PaymentLog {
  id: string;
  sessionId: string;
  paymentIntentId: string;
  userEmail: string;
  amount: number;
  currency: string;
  role: string;
  plan: string;
  status: string;
  createdAt: string;
}

interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  pendingTuitions: number;
  approvedTuitions: number;
  totalTuitions: number;
  totalRevenue: number;
  recentPayments: PaymentLog[];
}

export default function AdminDashboardView({ userName }: DashboardViewProps) {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTutors: 0,
    totalStudents: 0,
    pendingTuitions: 0,
    approvedTuitions: 0,
    totalTuitions: 0,
    totalRevenue: 0,
    recentPayments: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showTransactions, setShowTransactions] = useState(true);

  const fetchStats = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => fetchStats(false), 20000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase mb-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CENTRAL COMMAND // ADMIN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
            System Administration
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Welcome, {userName}. Real-time platform metrics, tuition moderation queue, user roles, and Stripe payment volume.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchStats(true)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white dark:bg-[#0D1D38] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-xs font-bold text-[#0B1320] dark:text-white hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9] ${refreshing ? "animate-spin" : ""}`} />
          <span>{refreshing ? "Syncing..." : "Refresh Stats"}</span>
        </button>
      </div>

      {/* 4 Live Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Users */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Users
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              {loading ? "—" : stats.totalUsers}
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              {stats.totalStudents} students &bull; {stats.totalTutors} tutors
            </p>
          </div>
        </div>

        {/* Metric 2: Total Tutors */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Tutors
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              {loading ? "—" : stats.totalTutors}
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Active mentors enrolled
            </p>
          </div>
        </div>

        {/* Metric 3: Pending Tuitions */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Pending Tuitions
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] dark:bg-[#102547] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#0284C7]/30 shadow-sm">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
                {loading ? "—" : stats.pendingTuitions}
              </span>
              <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
                Awaiting moderation checks
              </p>
            </div>
            {stats.pendingTuitions === 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/30">
                All Clear
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30">
                Needs Review
              </span>
            )}
          </div>
        </div>

        {/* Metric 4: Total Revenue */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-5 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Total Revenue
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
              <DollarSign className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-[#0B1320] dark:text-white tracking-tight drop-shadow-sm">
              {loading ? "—" : `$${stats.totalRevenue.toLocaleString()}`}
            </span>
            <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
              Cumulative Stripe subscription volume
            </p>
          </div>
        </div>
      </div>

      {/* 3 Clickable Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: User Management */}
        <Link
          href="/dashboard/applicants"
          className="group rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:scale-105 transition-transform shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                User Management
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                View directory &amp; manage roles
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>

        {/* Card 2: Tuition Moderation */}
        <Link
          href="/dashboard/my-tuitions"
          className="group rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF3C7] dark:bg-[#102547] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30 group-hover:scale-105 transition-transform shadow-sm">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                Tuition Moderation
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                {stats.pendingTuitions} pending &bull; {stats.approvedTuitions} approved
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>

        {/* Card 3: Transactions Toggle */}
        <button
          type="button"
          onClick={() => setShowTransactions((prev) => !prev)}
          className="group text-left rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-xl hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:scale-105 transition-transform shadow-sm">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                Transactions
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                {stats.recentPayments.length} Stripe payment logs
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </button>
      </div>

      {/* Live Stripe Transactions Ledger */}
      {showTransactions && (
        <div className="rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/25 overflow-hidden shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <div className="px-6 py-4 border-b border-[#E2E8F0] dark:border-[#0284C7]/20 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0B1320] dark:text-white">
                Recent Stripe Transactions
              </h3>
              <p className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                Verified Pro membership payments recorded in MongoDB
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/35">
              ${stats.totalRevenue.toLocaleString()} USD Total
            </span>
          </div>

          {stats.recentPayments.length === 0 ? (
            <div className="p-10 text-center text-xs text-[#64748B] dark:text-[#94A3B8]">
              No Stripe transactions recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#0284C7]/20 bg-[#F8FAFC] dark:bg-[#07101E]/70 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                    <th className="py-3.5 px-5">User Email</th>
                    <th className="py-3.5 px-5">Plan / Role</th>
                    <th className="py-3.5 px-5">Amount</th>
                    <th className="py-3.5 px-5">Payment Intent ID</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]/60 dark:divide-[#0284C7]/15 text-xs">
                  {stats.recentPayments.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#F8FAFC]/80 dark:hover:bg-[#0D1D38]/60 transition-colors">
                      <td className="py-3.5 px-5 font-medium text-[#0B1320] dark:text-white">
                        <a
                          href={`mailto:${tx.userEmail}`}
                          className="inline-flex items-center gap-1.5 hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                          <span>{tx.userEmail || "—"}</span>
                        </a>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FEF3C7] dark:bg-[#FFB800]/15 text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30">
                          PRO {tx.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-mono font-bold text-[#0B1320] dark:text-white">
                        ${tx.amount.toFixed(2)} {tx.currency.toUpperCase()}
                      </td>
                      <td className="py-3.5 px-5 font-mono text-[11px] text-[#475569] dark:text-[#94A3B8]">
                        {tx.paymentIntentId}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/35">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{tx.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
