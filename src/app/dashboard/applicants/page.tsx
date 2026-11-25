"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  ArrowLeft,
  GraduationCap
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

export default function ApplicantsPage() {
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
            className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all"
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
                  <span className="text-xs text-[#0284C7] dark:text-[#0EA5E9] font-semibold">
                    {app.tuitionTitle}
                  </span>
                </div>

                {/* Status Pill */}
                <span
                  className={`ml-auto sm:ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    app.status === "Accepted"
                      ? "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0]"
                      : app.status === "Rejected"
                      ? "bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD]"
                      : "bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A]"
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

              {/* Note */}
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed italic bg-[#F8FAFC] dark:bg-[#07101E] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#0284C7]/20">
                "{app.note}"
              </p>

              {/* Contact meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]/80 pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                  <span>{app.email}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                  <span>{app.phone}</span>
                </span>
                <span className="text-[11px] font-mono ml-auto">
                  Applied on {app.appliedDate}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:flex-col md:w-36 shrink-0">
              {app.status !== "Accepted" && (
                <button
                  onClick={() => handleUpdateStatus(app.id, "Accepted")}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accept</span>
                </button>
              )}
              {app.status !== "Rejected" && (
                <button
                  onClick={() => handleUpdateStatus(app.id, "Rejected")}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-bold text-xs transition-all cursor-pointer border border-[#BAE6FD]"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              )}
              <a
                href={`tel:${app.phone}`}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F0F7FF] hover:bg-[#E2E8F0] dark:bg-[#102547] dark:hover:bg-[#132E59] text-[#0B1320] dark:text-white font-bold text-xs transition-all border border-[#E2E8F0]"
              >
                <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Call Student</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}