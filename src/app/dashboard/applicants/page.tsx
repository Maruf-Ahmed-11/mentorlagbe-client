"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  Users,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ArrowLeft,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Crown,
  Search,
  RefreshCw,
} from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  tuitionTitle: string;
  appliedDate: string;
  note: string;
  status: "Pending" | "Accepted" | "Rejected";
}

interface DirectoryUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  plan: "free" | "pro";
  image?: string | null;
  phone?: string;
  createdAt?: string | null;
}

export default function ApplicantsAndDirectoryPage() {
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userEmail = session?.user?.email?.toLowerCase() || "";
  const userRole =
    (session?.user as any)?.role ||
    (userEmail.includes("admin") ? "admin" : userEmail.includes("tutor") || userEmail.includes("teacher") ? "tutor" : "student");
  const isAdmin = userRole === "admin";

  // =========================================================================
  // ADMIN USER DIRECTORY STATE
  // =========================================================================
  const [directoryUsers, setDirectoryUsers] = useState<DirectoryUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [roleFilter, setRoleFilter] = useState<"all" | "tutor" | "student" | "admin">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDirectoryUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setDirectoryUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch user directory:", err);
      toast.error("Failed to load user directory");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    if (mounted && !isPending && isAdmin) {
      fetchDirectoryUsers();
    }
  }, [mounted, isPending, isAdmin, fetchDirectoryUsers]);

  const handleChangeUserRole = async (targetUser: DirectoryUser, newRole: "student" | "tutor") => {
    if (targetUser.role === newRole || targetUser.role === "admin") return;
    setUpdatingId(targetUser.id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: targetUser.id,
          email: targetUser.email,
          role: newRole,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update role");
      }
      setDirectoryUsers((prev) =>
        prev.map((u) => (u.email === targetUser.email ? { ...u, role: newRole } : u))
      );
      toast.success(`${targetUser.name}'s role updated to ${newRole.toUpperCase()}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Could not update role");
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================================================================
  // TUTOR APPLICANTS STATE
  // =========================================================================
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: "app-1",
      name: "Rafiqul Islam",
      email: "rafiq.islam@gmail.com",
      phone: "+880-1711-234567",
      tuitionTitle: "HSC Higher Math & Engineering Admission Prep",
      appliedDate: "Nov 22, 2026",
      note: "Looking for in-depth calculus problem-solving and shortcut tricks for BUET engineering test.",
      status: "Pending",
    },
    {
      id: "app-2",
      name: "Nusrat Jahan",
      email: "nusrat.j@gmail.com",
      phone: "+880-1819-876543",
      tuitionTitle: "Class 9-10 Physics & General Science Foundation",
      appliedDate: "Nov 21, 2026",
      note: "Needs home tuition 3 days a week for SSC board exam foundation.",
      status: "Accepted",
    },
    {
      id: "app-3",
      name: "Tanvir Ahmed",
      email: "tanvir.eng@gmail.com",
      phone: "+880-1922-334455",
      tuitionTitle: "Cambridge O / A-Level Chemistry & Past Papers",
      appliedDate: "Nov 20, 2026",
      note: "Targeting an A* in upcoming May/June exam series.",
      status: "Pending",
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: "Accepted" | "Rejected") => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    toast.success(`Application marked as ${newStatus}!`);
  };

  if (!mounted || isPending) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center animate-pulse">
        <div className="h-8 w-48 bg-[#E2E8F0] dark:bg-[#102547] rounded-xl mx-auto mb-4" />
        <div className="h-4 w-64 bg-[#E2E8F0]/70 dark:bg-[#102547]/70 rounded-xl mx-auto" />
      </div>
    );
  }

  // =========================================================================
  // ADMIN VIEW: USER DIRECTORY & ROLE MANAGEMENT
  // =========================================================================
  if (isAdmin) {
    const filteredUsers = directoryUsers.filter((u) => {
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });

    const tutorCount = directoryUsers.filter((u) => u.role === "tutor").length;
    const studentCount = directoryUsers.filter((u) => u.role === "student").length;

    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#0EA5E9] mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN DIRECTORY // ALL ACCOUNTS</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight mt-2">
              User Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
              View every registered tutor and student session, inspect subscription tiers, and manage account roles.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchDirectoryUsers}
            disabled={loadingUsers}
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#F0F7FF] dark:bg-[#0D1D38] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-bold text-[#0B1320] dark:text-white hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9] ${loadingUsers ? "animate-spin" : ""}`} />
            <span>Refresh Users</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: "all", label: `All (${directoryUsers.length})` },
                { key: "tutor", label: `Tutors (${tutorCount})` },
                { key: "student", label: `Students (${studentCount})` },
                { key: "admin", label: "Admin" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setRoleFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  roleFilter === tab.key
                    ? "bg-[#0284C7] text-white shadow-sm"
                    : "bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#475569] dark:text-[#94A3B8] hover:text-[#0B1320] dark:hover:text-white border border-[#E2E8F0] dark:border-[#0284C7]/25"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name or email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/60 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 overflow-hidden shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.75)]">
          {loadingUsers && directoryUsers.length === 0 ? (
            <div className="p-12 text-center text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
              LOADING USER DIRECTORY...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#64748B] dark:text-[#94A3B8]">
              No matching users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#0284C7]/20 bg-[#F8FAFC] dark:bg-[#07101E]/80 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                    <th className="py-4 px-5">User</th>
                    <th className="py-4 px-5">Role</th>
                    <th className="py-4 px-5">Tier / Access</th>
                    <th className="py-4 px-5">Joined</th>
                    <th className="py-4 px-5 text-right">Manage Role &amp; Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]/60 dark:divide-[#0284C7]/15 text-xs">
                  {filteredUsers.map((u) => {
                    const initials = u.name.slice(0, 2).toUpperCase() || "ML";
                    return (
                      <tr key={u.id || u.email} className="hover:bg-[#F8FAFC]/80 dark:hover:bg-[#0D1D38]/60 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            {u.image ? (
                              <Image
                                src={u.image}
                                alt={u.name}
                                width={38}
                                height={38}
                                unoptimized
                                className="h-9 w-9 rounded-full object-cover border border-[#BAE6FD] dark:border-[#0284C7]/50 shrink-0"
                              />
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0284C7] to-[#38BDF8] text-white font-bold text-xs shrink-0">
                                {initials}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-bold text-[#0B1320] dark:text-white truncate">{u.name}</p>
                              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono truncate">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          {u.role === "admin" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#E0F2FE] dark:bg-[#132E59] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0EA5E9]/40">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Admin</span>
                            </span>
                          ) : u.role === "tutor" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/40">
                              <GraduationCap className="w-3 h-3" />
                              <span>Tutor</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#38BDF8]/40">
                              <UserCheck className="w-3 h-3" />
                              <span>Student</span>
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5">
                          {u.role === "admin" ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#4F46E5] dark:text-[#818CF8] border border-[#C7D2FE] dark:border-[#6366F1]/40">
                              SYSTEM
                            </span>
                          ) : u.plan === "pro" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#FEF3C7] dark:bg-[#FFB800]/20 text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/40">
                              <Crown className="w-3 h-3" />
                              <span>PRO</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#0284C7]/20">
                              FREE
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5 font-mono text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                        </td>
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            {u.role !== "admin" && (
                              <select
                                aria-label={`Change role for ${u.name}`}
                                disabled={updatingId === u.id}
                                value={u.role}
                                onChange={(e) =>
                                  handleChangeUserRole(u, e.target.value as "student" | "tutor")
                                }
                                className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-[11px] font-mono font-semibold text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none cursor-pointer disabled:opacity-60"
                              >
                                <option value="student">Student</option>
                                <option value="tutor">Tutor</option>
                              </select>
                            )}
                            <a
                              href={`mailto:${u.email}`}
                              title={`Email ${u.name} (${u.email})`}
                              className="p-2 rounded-xl text-[#475569] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#38BDF8] hover:bg-[#E0F2FE] dark:hover:bg-[#102547] transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TUTOR VIEW: MANAGE APPLICANTS
  // =========================================================================
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#0EA5E9] mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STUDENT ENROLLMENT QUEUE</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight mt-2">
            Manage Applicants
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Review incoming student applications, contact applicants, and confirm enrollments.
          </p>
        </div>

        <Link
          href="/dashboard/my-tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#F0F7FF] dark:bg-[#0D1D38] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-bold text-[#0B1320] dark:text-white hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all cursor-pointer shadow-sm"
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
          <span>My Tuitions</span>
        </Link>
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {applicants.map((app) => (
          <div
            key={app.id}
            className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all"
          >
            {/* Student Info */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] font-bold text-sm border border-[#BAE6FD] dark:border-[#0284C7]/30 shadow-sm">
                  {app.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1320] dark:text-white">
                    {app.name}
                  </h3>
                  <p className="text-xs font-medium text-[#0284C7] dark:text-[#0EA5E9]">
                    {app.tuitionTitle}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`ml-auto sm:ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border flex items-center gap-1 ${
                    app.status === "Accepted"
                      ? "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border-[#A7F3D0] dark:border-[#10B981]/30"
                      : app.status === "Rejected"
                      ? "bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border-[#BAE6FD] dark:border-[#0284C7]/30"
                      : "bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border-[#FDE68A] dark:border-[#FFB800]/30"
                  }`}
                >
                  {app.status === "Accepted" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : app.status === "Rejected" ? (
                    <XCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  <span>{app.status}</span>
                </span>
              </div>

              <p className="text-xs text-[#475569] dark:text-[#E2E8F0]/80 italic bg-[#F8FAFC] dark:bg-[#07101E] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#0284C7]/20">
                &ldquo;{app.note}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#0284C7] dark:text-[#0EA5E9]" />
                  {app.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#0284C7] dark:text-[#0EA5E9]" />
                  {app.phone}
                </span>
                <span className="ml-auto text-[10px]">
                  Applied on {app.appliedDate}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex sm:flex-row md:flex-col gap-2 shrink-0">
              {app.status !== "Accepted" && (
                <button
                  onClick={() => handleUpdateStatus(app.id, "Accepted")}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-[#0284C7] dark:hover:bg-[#0EA5E9] text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accept</span>
                </button>
              )}

              {app.status !== "Rejected" && (
                <button
                  onClick={() => handleUpdateStatus(app.id, "Rejected")}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#F0F7FF] hover:bg-[#E2E8F0] dark:bg-[#102547] dark:hover:bg-[#132E59] text-[#0284C7] dark:text-[#38BDF8] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              )}

              <a
                href={`tel:${app.phone}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#0D1D38] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-semibold text-[#0B1320] dark:text-white hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                <span>Call Student</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
