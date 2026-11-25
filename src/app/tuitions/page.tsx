"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Globe,
  Compass,
  GraduationCap,
  CheckCircle,
  Sparkles,
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
  tutorName?: string;
}

function AllTuitionsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [tuitions, setTuitions] = useState<PublicTuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQ);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedClassLevel, setSelectedClassLevel] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [facetSubjects, setFacetSubjects] = useState<string[]>([]);
  const [facetClassLevels, setFacetClassLevels] = useState<string[]>([]);
  const [facetModes, setFacetModes] = useState<string[]>([]);

  useEffect(() => {
    setSearchQuery(initialQ);
    setDebouncedQuery(initialQ);
  }, [initialQ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    let ignore = false;
    async function loadFiltered() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedQuery.trim()) params.set("q", debouncedQuery.trim());
        if (selectedSubject !== "All") params.set("subject", selectedSubject);
        if (selectedClassLevel !== "All") params.set("classLevel", selectedClassLevel);
        if (selectedMode !== "All") params.set("mode", selectedMode);

        const qs = params.toString();
        const url = qs ? `/api/tuitions/public?${qs}` : "/api/tuitions/public";
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok && !ignore) {
          const data = await res.json();
          setTuitions(data.tuitions || []);
          if (data.facets) {
            if (Array.isArray(data.facets.subjects)) setFacetSubjects(data.facets.subjects);
            if (Array.isArray(data.facets.classLevels)) setFacetClassLevels(data.facets.classLevels);
            if (Array.isArray(data.facets.modes)) setFacetModes(data.facets.modes);
          }
        }
      } catch (err) {
        console.error("Failed to fetch tuitions:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadFiltered();
    return () => {
      ignore = true;
    };
  }, [debouncedQuery, selectedSubject, selectedClassLevel, selectedMode]);

  const subjects = useMemo(() => {
    const source = facetSubjects.length > 0 ? facetSubjects : tuitions.map((t) => t.subject).filter(Boolean);
    return ["All", ...Array.from(new Set(source))];
  }, [facetSubjects, tuitions]);

  const classLevels = useMemo(() => {
    const source = facetClassLevels.length > 0 ? facetClassLevels : tuitions.map((t) => t.classLevel).filter(Boolean);
    return ["All", ...Array.from(new Set(source))];
  }, [facetClassLevels, tuitions]);

  const modes = useMemo(() => {
    const source = facetModes.length > 0 ? facetModes : tuitions.map((t) => t.mode).filter(Boolean);
    const unique = Array.from(new Set(source));
    return unique.length > 0 ? ["All", ...unique] : ["All", "Online", "Offline", "Hybrid"];
  }, [facetModes, tuitions]);

  const filtered = tuitions;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050B14] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] dark:border-[#0284C7]/40 bg-white dark:bg-[#0D1D38] px-3.5 py-1.5 mb-3 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white">
                APPROVED MARKETPLACE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1320] dark:text-white uppercase tracking-tight">
              Browse All Tuitions
            </h1>
            <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
              Discover verified mentors and apply directly to open batches.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject, location, or tutor..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0B1930] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-sm text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Filters Row: Subject Pills + Class Level & Mode Dropdowns */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {subjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedSubject === sub
                    ? "bg-[#0284C7] text-white shadow-sm"
                    : "bg-white dark:bg-[#0D1D38] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#0284C7]/30 hover:border-[#0284C7]"
                  }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <select
              aria-label="Filter by Class Level"
              value={selectedClassLevel}
              onChange={(e) => setSelectedClassLevel(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B1930] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-xs font-semibold text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none cursor-pointer"
            >
              {classLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === "All" ? "All Class Levels" : lvl}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by Mode"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B1930] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-xs font-semibold text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none cursor-pointer"
            >
              {modes.map((m) => (
                <option key={m} value={m}>
                  {m === "All" ? "All Modes" : m}
                </option>
              ))}
            </select>

            {(selectedSubject !== "All" ||
              selectedClassLevel !== "All" ||
              selectedMode !== "All" ||
              searchQuery.trim() !== "") && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubject("All");
                    setSelectedClassLevel("All");
                    setSelectedMode("All");
                    setSearchQuery("");
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:bg-[#E0F2FE]/60 dark:hover:bg-[#0284C7]/20 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] rounded-2xl bg-white dark:bg-[#0B1930] border border-[#E2E8F0] dark:border-[#0284C7]/25 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930] p-12 text-center space-y-2">
            <GraduationCap className="w-8 h-8 text-[#0284C7] mx-auto" />
            <h3 className="text-base font-bold text-[#0B1320] dark:text-white">
              No matching tuitions found
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              Try clearing your search or selecting another subject.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tuition) => {
              const tuitionId = tuition._id || tuition.id;
              const isOnline = tuition.mode?.toLowerCase().includes("online");
              return (
                <div
                  key={tuitionId}
                  className="group rounded-2xl bg-white dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/30 overflow-hidden shadow-sm hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-[#07101E] overflow-hidden">
                    {tuition.bannerImage ? (
                      <Image
                        src={tuition.bannerImage}
                        alt={tuition.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#07101E] via-[#0D1D38] to-[#0284C7]/40 flex items-center justify-center">
                        <GraduationCap className="w-10 h-10 text-[#38BDF8]/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-black/65 text-white border border-white/20 flex items-center gap-1">
                      {isOnline ? (
                        <Globe className="w-3 h-3 text-[#38BDF8]" />
                      ) : (
                        <Compass className="w-3 h-3 text-[#FFB800]" />
                      )}
                      <span>{tuition.mode}</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#0284C7] text-white">
                        {tuition.subject}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-xs font-mono text-[#0284C7] dark:text-[#0EA5E9] mb-1">
                        {tuition.classLevel}
                      </p>
                      <Link href={`/tuitions/${tuitionId}`}>
                        <h3 className="text-base font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors line-clamp-2">
                          {tuition.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs text-[#475569] dark:text-[#94A3B8] line-clamp-2">
                        {tuition.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8] font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                          {tuition.schedule}
                        </span>
                        <span className="flex items-center gap-1 truncate max-w-[140px]">
                          <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                          {tuition.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-[#E2E8F0] dark:border-[#0284C7]/20">
                        <span className="text-xs font-semibold text-[#0B1320] dark:text-white">
                          {tuition.tutorName || "Verified Mentor"}
                        </span>
                        <CheckCircle className="w-3.5 h-3.5 text-[#0284C7]" />
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-[#F8FAFC] dark:bg-[#07101E] border-t border-[#E2E8F0] dark:border-[#0284C7]/25 flex items-center justify-between">
                    <span className="text-base font-black font-mono text-[#0284C7] dark:text-[#38BDF8]">
                      ৳{Number(tuition.monthlyFee || 0).toLocaleString()}/mo
                    </span>
                    <Link
                      href={`/tuitions/${tuitionId}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all"
                    >
                      <span>View &amp; Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllTuitionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#050B14] text-xs font-mono text-[#64748B]">
          Loading tuitions...
        </div>
      }
    >
      <AllTuitionsContent />
    </Suspense>
  );
}
