"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  MapPin,
  Clock,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Sparkles,
  Globe,
  Compass,
  GraduationCap,
} from "lucide-react";

interface PublicTuition {
  _id: string;
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  schedule: string;
  monthlyFee: number;
  bannerImage?: string;
  description: string;
  tutorEmail?: string;
  tutorName?: string;
}

export default function FeaturedTuitions() {
  const { data: session } = authClient.useSession();
  const [tuitions, setTuitions] = useState<PublicTuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Tuitions");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [livePlan, setLivePlan] = useState<string>("free");

  const userEmail = (session?.user?.email || "").toLowerCase().trim();
  const userRole = ((session?.user as any)?.role ||
    (userEmail.includes("admin")
      ? "admin"
      : userEmail.includes("tutor") || userEmail.includes("teacher")
      ? "tutor"
      : "student")).toLowerCase();
  const isStudent = Boolean(userEmail) && userRole === "student";

  // Fetch real approved & active tuitions from MongoDB
  useEffect(() => {
    let cancelled = false;
    async function loadPublicTuitions() {
      setLoading(true);
      try {
        const res = await fetch("/api/tuitions/public", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data.tuitions)) {
            setTuitions(data.tuitions);
          }
        }
      } catch (err) {
        console.error("Failed to fetch featured tuitions:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadPublicTuitions();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load student-scoped bookmarks & live plan
  useEffect(() => {
    if (!userEmail) {
      setBookmarkedIds([]);
      setLivePlan("free");
      return;
    }

    try {
      const savedKey = `mentorlagbe_saved_tuitions_${userEmail}`;
      const saved = JSON.parse(localStorage.getItem(savedKey) || "[]");
      setBookmarkedIds(Array.isArray(saved) ? saved : []);
    } catch {
      setBookmarkedIds([]);
    }

    fetch(`/api/user/usage?email=${encodeURIComponent(userEmail)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.plan) setLivePlan(d.plan.toLowerCase());
      })
      .catch(() => {});
  }, [userEmail]);

  const categories = useMemo(() => {
    const subjects = Array.from(new Set(tuitions.map((t) => t.subject).filter(Boolean)));
    return ["All Tuitions", ...subjects];
  }, [tuitions]);

  const filteredTuitions = useMemo(() => {
    const list =
      activeCategory === "All Tuitions"
        ? tuitions
        : tuitions.filter((t) => t.subject === activeCategory);
    return list.slice(0, 6);
  }, [tuitions, activeCategory]);

  const toggleBookmark = (id: string, title: string) => {
    if (!userEmail) {
      toast.error("Please sign in as a student to bookmark tuitions");
      return;
    }
    if (!isStudent) {
      toast.error("Only student accounts can bookmark tuitions");
      return;
    }

    const savedKey = `mentorlagbe_saved_tuitions_${userEmail}`;
    const isPro = livePlan === "pro";

    if (bookmarkedIds.includes(id)) {
      const next = bookmarkedIds.filter((item) => item !== id);
      setBookmarkedIds(next);
      localStorage.setItem(savedKey, JSON.stringify(next));
      toast.success(`Removed "${title.substring(0, 22)}..." from saved tuitions`, {
        icon: "🗑️",
      });
    } else {
      if (!isPro && bookmarkedIds.length >= 5) {
        toast.error("Free plan limit reached (max 5 bookmarks). Upgrade to Pro for unlimited saves!", {
          icon: "⭐",
        });
        return;
      }
      const next = [...bookmarkedIds, id];
      setBookmarkedIds(next);
      localStorage.setItem(savedKey, JSON.stringify(next));
      toast.success(`Saved "${title.substring(0, 22)}..." to your bookmarks!`, {
        icon: "❤️",
      });
    }
  };

  return (
    <section
      id="tuitions"
      className="relative py-20 bg-[#F8FAFC] dark:bg-[#050B14] overflow-hidden border-t border-[#E2E8F0] dark:border-[#0284C7]/20 transition-colors duration-200"
    >
      {/* Ambient Flare */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-[#0284C7]/8 dark:bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-[500px] h-[500px] bg-[#0369A1]/8 dark:bg-[#0C4A6E]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] dark:border-[#0284C7]/40 bg-[#FFFFFF] dark:bg-[#0D1D38]/80 px-3.5 py-1.5 mb-3 shadow-[0_4px_16px_rgba(2,132,199,0.12)] dark:shadow-[0_0_15px_rgba(2,132,199,0.25)]">
              <Sparkles className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white">
                VERIFIED TUITIONS // REAL-TIME POSTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1320] dark:text-white uppercase tracking-tight">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] dark:from-white dark:via-[#38BDF8] dark:to-[#0EA5E9] drop-shadow-[0_0_16px_rgba(2,132,199,0.25)] dark:drop-shadow-[0_0_25px_rgba(14,165,233,0.6)]">
                Mentorship Batches
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] dark:text-[#E2E8F0]/80 max-w-2xl">
              Explore recently approved home and online tuition postings. Filter by subject or click any listing to apply.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#BAE6FD] dark:border-[#0284C7]/50 bg-[#0284C7] hover:bg-[#0369A1] dark:bg-[#0D1D38]/80 dark:hover:bg-[#0284C7] hover:border-[#0284C7] dark:hover:border-white text-white text-sm font-bold tracking-wide shadow-[0_4px_16px_rgba(2,132,199,0.3)] dark:shadow-[0_0_20px_rgba(2,132,199,0.3)] transition-all cursor-pointer group shrink-0"
          >
            <span>View All Tuitions</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Dynamic Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0284C7] text-white shadow-[0_4px_16px_rgba(2,132,199,0.35)] dark:bg-[#0284C7] dark:shadow-[0_0_20px_rgba(2,132,199,0.6)] border border-[#BAE6FD]/50 dark:border-white/30"
                  : "bg-[#FFFFFF] dark:bg-[#0D1D38]/90 text-[#475569] dark:text-[#E2E8F0]/80 border border-[#E2E8F0] dark:border-[#0284C7]/30 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:text-[#0B1320] dark:hover:text-white shadow-sm dark:shadow-none"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Real Tuitions Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[420px] rounded-2xl bg-white dark:bg-[#0B1930]/80 border border-[#E2E8F0] dark:border-[#0284C7]/25 animate-pulse"
              />
            ))}
          </div>
        ) : filteredTuitions.length === 0 ? (
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-12 text-center space-y-2">
            <GraduationCap className="w-8 h-8 text-[#0284C7] dark:text-[#0EA5E9] mx-auto" />
            <h3 className="text-base font-bold text-[#0B1320] dark:text-white">
              No approved tuitions available yet
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Approved tutor listings will appear here automatically in real time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
            {filteredTuitions.map((tuition) => {
              const tuitionId = tuition._id || tuition.id;
              const isBookmarked = bookmarkedIds.includes(tuitionId);
              const isOnline =
                tuition.mode?.toLowerCase().includes("online") ||
                tuition.location?.toLowerCase() === "online";

              return (
                <div
                  key={tuitionId}
                  className="group relative rounded-2xl bg-[#FFFFFF] dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/35 overflow-hidden shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06),_0_0_0_1px_rgba(186,230,253,0.25)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-[0_16px_36px_-6px_rgba(2,132,199,0.2),_0_0_20px_rgba(2,132,199,0.12)] dark:hover:shadow-[0_0_35px_rgba(2,132,199,0.45)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full w-full"
                >
                  {/* Top Image Banner & Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#07101E]">
                    {tuition.bannerImage ? (
                      <Image
                        src={tuition.bannerImage}
                        alt={tuition.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#07101E] via-[#0D1D38] to-[#0284C7]/40 flex items-center justify-center">
                        <GraduationCap className="w-12 h-12 text-[#38BDF8]/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent dark:from-[#0B1930] dark:via-black/35 dark:to-black/20" />

                    {/* Mode Pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.8)] backdrop-blur-md border border-white/20 bg-black/65">
                      {isOnline ? (
                        <>
                          <Globe className="h-3 w-3 text-[#38BDF8]" />
                          <span>ONLINE BATCH</span>
                        </>
                      ) : (
                        <>
                          <Compass className="h-3 w-3 text-[#FFB800]" />
                          <span>{tuition.mode?.toUpperCase() || "OFFLINE TUITION"}</span>
                        </>
                      )}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(tuitionId, tuition.title);
                      }}
                      aria-label="Bookmark Tuition"
                      className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                        isBookmarked
                          ? "bg-[#0284C7] border-white text-white shadow-[0_0_12px_rgba(2,132,199,0.8)]"
                          : "bg-black/60 border-white/20 text-[#E2E8F0] hover:text-white hover:border-[#0EA5E9]"
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-white" : ""}`} />
                    </button>

                    {/* Subject Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#0284C7] text-white shadow-md">
                        {tuition.subject}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-mono font-medium text-[#0284C7] dark:text-[#0EA5E9] flex items-center gap-1 mb-1">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {tuition.classLevel}
                      </span>

                      <Link href={`/tuitions/${tuitionId}`}>
                        <h3 className="text-lg font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors leading-snug line-clamp-2">
                          {tuition.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs text-[#475569] dark:text-[#E2E8F0]/75 line-clamp-2 leading-relaxed">
                        {tuition.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                          {tuition.schedule}
                        </span>
                        <span className="flex items-center gap-1 truncate max-w-[150px]">
                          <MapPin className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                          {tuition.location}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] dark:border-[#0284C7]/25">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0F2FE] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#0EA5E9]/40 text-[10px] font-bold text-[#0284C7] dark:text-white">
                            {(tuition.tutorName || "M").charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-[#0B1320] dark:text-white truncate max-w-[120px]">
                            {tuition.tutorName || "Verified Mentor"}
                          </span>
                          <CheckCircle className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Monthly Fee + CTA */}
                  <div className="px-5 py-4 bg-[#F8FAFC] dark:bg-[#0B1930] border-t border-[#E2E8F0] dark:border-[#0284C7]/25 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] block uppercase">
                        Monthly Fee
                      </span>
                      <span className="text-lg font-black font-mono text-[#0284C7] dark:text-[#0EA5E9] dark:glow-scarlet">
                        ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                      </span>
                    </div>

                    <Link
                      href={`/tuitions/${tuitionId}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-[#0284C7] dark:hover:bg-[#0EA5E9] text-white text-xs font-bold tracking-wide shadow-[0_4px_14px_rgba(2,132,199,0.35)] dark:shadow-[0_0_15px_rgba(2,132,199,0.4)] transition-all cursor-pointer active:scale-95"
                    >
                      <span>View &amp; Apply</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
