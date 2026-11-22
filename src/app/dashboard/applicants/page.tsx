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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7679] dark:text-[#BFA5AA] hover:text-[#D91E48] dark:hover:text-[#FF1E40] mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#1C0307] border border-[#F2B8C4] dark:border-[#E11D48]/35 text-[11px] font-mono font-bold tracking-wider text-[#D91E48] dark:text-[#FF1E40] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STUDENT ENROLLMENT QUEUE</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight mt-2">
            Manage Applicants
          </h2>
          <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            Review incoming student applications, contact applicants, and confirm enrollments.
          </p>
        </div>

        <Link
          href="/dashboard/my-tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#F5ECEC] dark:bg-[#1E0307] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs font-bold text-[#180C0E] dark:text-white hover:border-[#D91E48] dark:hover:border-[#FF1E40] transition-all cursor-pointer shadow-sm"
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
          <span>My Tuitions</span>
        </Link>
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {applicants.map((app) => (
          <div
            key={app.id}
            className="rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#160307]/90 p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#D91E48] dark:hover:border-[#FF1E40] transition-all"
          >
            {/* Student Info */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] font-bold text-sm border border-[#F2B8C4] dark:border-[#E11D48]/30 shadow-sm">
                  {app.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#180C0E] dark:text-white">
                    {app.name}
                  </h3>
                  <span className="text-xs text-[#D91E48] dark:text-[#FF1E40] font-semibold">
                    {app.tuitionTitle}
                  </span>
                </div>

                {/* Status Pill */}
                <span
                  className={`ml-auto sm:ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    app.status === "Accepted"
                      ? "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0]"
                      : app.status === "Rejected"
                      ? "bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4]"
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
              <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] leading-relaxed italic bg-[#FCF9F8] dark:bg-[#0D0204] p-3 rounded-xl border border-[#EADCDD] dark:border-[#E11D48]/20">
                "{app.note}"
              </p>

              {/* Contact meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#8C7679] dark:text-[#BFA5AA]/80 pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
                  <span>{app.email}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
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
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#D91E48] hover:bg-[#B31438] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accept</span>
                </button>
              )}
              {app.status !== "Rejected" && (
                <button
                  onClick={() => handleUpdateStatus(app.id, "Rejected")}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FDECEF] hover:bg-[#F2B8C4] text-[#D91E48] font-bold text-xs transition-all cursor-pointer border border-[#F2B8C4]"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              )}
              <a
                href={`tel:${app.phone}`}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5ECEC] hover:bg-[#EADCDD] dark:bg-[#2A060C] dark:hover:bg-[#3D0A13] text-[#180C0E] dark:text-white font-bold text-xs transition-all border border-[#EADCDD]"
              >
                <Phone className="w-3.5 h-3.5 text-[#D91E48]" />
                <span>Call Student</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}