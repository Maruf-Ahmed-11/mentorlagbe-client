"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FileText,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
} from "lucide-react";

interface StudentApplication {
  id: string;
  tuitionId: string;
  tuitionTitle: string;
  tutorName: string;
  tutorEmail: string;
  note: string;
  status: "Pending" | "Accepted" | "Rejected";
  appliedDate: string;
}

export default function ApplicationsPage() {
  const { data: session } = authClient.useSession();
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchApps = async () => {
      try {
        const res = await fetch(
          `/api/applications?role=student&email=${encodeURIComponent(email)}`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications || []);
        }
      } catch (err) {
        console.error("Failed to load student applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
    const interval = setInterval(fetchApps, 15000);
    return () => clearInterval(interval);
  }, [session?.user?.email]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SUBMISSIONS TRACKER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
            My Applications
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Review the status of your applications submitted to mentors in real time.
          </p>
        </div>

        <Link
          href="/#tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-xs shadow-[0_4px_16px_rgba(2,132,199,0.3)] dark:shadow-[0_0_20px_rgba(2,132,199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.8)] transition-all active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Find More Tuitions</span>
        </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-12 text-center text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
          LOADING YOUR APPLICATIONS...
        </div>
      ) : applications.length === 0 ? (
        /* Empty State Card */
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl min-h-[380px]">
          <div className="w-16 h-16 rounded-2xl bg-[#E0F2FE] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#0284C7]/40 flex items-center justify-center mb-5 shadow-sm dark:shadow-[0_0_25px_rgba(14,165,233,0.3)]">
            <FileText className="w-8 h-8 text-[#0284C7] dark:text-[#0EA5E9]" />
          </div>

          <h3 className="text-lg font-bold text-[#0B1320] dark:text-white">
            No applications yet
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mt-2 leading-relaxed">
            Browse tuitions to get started! Apply directly to courses matching your academic needs.
          </p>

          <Link
            href="/#tuitions"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-[#0284C7] dark:hover:bg-[#0EA5E9] text-white font-bold text-xs transition-all shadow-[0_4px_16px_rgba(2,132,199,0.25)] dark:shadow-[0_0_20px_rgba(2,132,199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.8)] active:scale-95 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Browse Tuitions</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href={`/tuitions/${app.tuitionId}`}
                    className="text-sm sm:text-base font-bold text-[#0B1320] dark:text-white hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    {app.tuitionTitle}
                  </Link>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border inline-flex items-center gap-1 ${
                      app.status === "Accepted"
                        ? "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border-[#A7F3D0] dark:border-[#10B981]/40"
                        : app.status === "Rejected"
                        ? "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/40"
                        : "bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border-[#FDE68A] dark:border-[#FFB800]/40"
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

                {app.note && (
                  <p className="text-xs text-[#475569] dark:text-[#94A3B8] italic">
                    &ldquo;{app.note}&rdquo;
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono pt-1">
                  <span>Tutor: {app.tutorName}</span>
                  {app.tutorEmail && (
                    <a
                      href={`mailto:${app.tutorEmail}`}
                      className="inline-flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] hover:underline"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{app.tutorEmail}</span>
                    </a>
                  )}
                  <span className="ml-auto">Applied {app.appliedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
