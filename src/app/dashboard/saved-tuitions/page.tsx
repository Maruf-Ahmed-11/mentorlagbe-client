"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Bookmark, Search, Sparkles, ArrowRight, Trash2, MapPin, Clock, GraduationCap } from "lucide-react";

interface SavedTuition {
  _id: string;
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  location: string;
  schedule: string;
  monthlyFee: number;
  bannerImage?: string;
}

export default function SavedTuitionsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [savedTuitions, setSavedTuitions] = useState<SavedTuition[]>([]);
  const [loading, setLoading] = useState(true);

  const email = (session?.user?.email || "").toLowerCase().trim();
  const role = (session?.user as any)?.role || (email.includes("admin") ? "admin" : "student");

  useEffect(() => {
    if (isPending) return;
    if (role === "admin" || role === "tutor") {
      router.replace("/dashboard");
    }
  }, [role, isPending, router]);

  useEffect(() => {
    if (isPending || !email || role !== "student") {
      setLoading(false);
      return;
    }

    async function loadSaved() {
      setLoading(true);
      try {
        const savedKey = `mentorlagbe_saved_tuitions_${email}`;
        const ids: string[] = JSON.parse(localStorage.getItem(savedKey) || "[]");
        if (!Array.isArray(ids) || ids.length === 0) {
          setSavedTuitions([]);
          setLoading(false);
          return;
        }

        const res = await fetch("/api/tuitions/public", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const all: SavedTuition[] = data.tuitions || [];
          setSavedTuitions(all.filter((t) => ids.includes(t._id) || ids.includes(t.id)));
        }
      } catch {
        setSavedTuitions([]);
      } finally {
        setLoading(false);
      }
    }

    loadSaved();
  }, [email, role, isPending]);

  const handleRemoveBookmark = (tuitionId: string) => {
    if (!email) return;
    const savedKey = `mentorlagbe_saved_tuitions_${email}`;
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(savedKey) || "[]");
      const next = ids.filter((id) => id !== tuitionId);
      localStorage.setItem(savedKey, JSON.stringify(next));
      setSavedTuitions((prev) => prev.filter((t) => t._id !== tuitionId && t.id !== tuitionId));
      toast.success("Removed from saved tuitions");
    } catch {}
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#D97706] dark:text-[#FFB800] uppercase mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BOOKMARKED BATCHES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
            Saved Tuitions
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Keep track of courses you&apos;ve bookmarked to review or apply to later.
          </p>
        </div>

        <Link
          href="/tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-xs shadow-[0_4px_16px_rgba(2,132,199,0.3)] dark:shadow-[0_0_20px_rgba(2,132,199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.8)] transition-all active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Explore Tuitions</span>
        </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-12 text-center text-xs font-mono text-[#64748B]">
          LOADING SAVED TUITIONS...
        </div>
      ) : savedTuitions.length === 0 ? (
        /* Empty State Card */
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl min-h-[380px]">
          <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] dark:bg-[#281804] border border-[#FDE68A] dark:border-[#FFB800]/40 flex items-center justify-center mb-5 shadow-sm dark:shadow-[0_0_25px_rgba(255,184,0,0.3)]">
            <Bookmark className="w-8 h-8 text-[#D97706] dark:text-[#FFB800]" />
          </div>

          <h3 className="text-lg font-bold text-[#0B1320] dark:text-white">
            No saved tuitions
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mt-2 leading-relaxed">
            Browse and bookmark tuitions you&apos;re interested in! They will appear here for easy access.
          </p>

          <Link
            href="/tuitions"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-[#0284C7] dark:hover:bg-[#0EA5E9] text-white font-bold text-xs transition-all shadow-[0_4px_16px_rgba(2,132,199,0.25)] dark:shadow-[0_0_20px_rgba(2,132,199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.8)] active:scale-95 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Browse Tuitions</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedTuitions.map((item) => {
            const tid = item._id || item.id;
            return (
              <div
                key={tid}
                className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-5 flex items-center gap-4 shadow-sm hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all"
              >
                <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-[#07101E] shrink-0 border border-[#E2E8F0] dark:border-[#0284C7]/30 flex items-center justify-center">
                  {item.bannerImage ? (
                    <Image src={item.bannerImage} alt={item.title} fill unoptimized className="object-cover" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-[#38BDF8]/50" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase">
                    {item.subject} &bull; {item.classLevel}
                  </span>
                  <h4 className="text-sm font-bold text-[#0B1320] dark:text-white truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0284C7]" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#0284C7]" />
                      {item.schedule}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Link
                    href={`/tuitions/${tid}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemoveBookmark(tid)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#64748B] hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
