"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tuition } from "@/types";
import { 
  Bookmark, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  GraduationCap,
  Globe,
  Compass
} from "lucide-react";
import toast from "react-hot-toast";

// Sample verified tuitions adhering strictly to the `tuitions` collection schema
const SAMPLE_TUITIONS: Tuition[] = [
  {
    _id: "tui_101",
    title: "HSC Higher Math & Engineering Admission Prep",
    subject: "Higher Mathematics",
    classLevel: "HSC (Class 11-12) & Admission",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    monthlyFee: 4500,
    daysPerWeek: 3,
    bannerImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    description: "In-depth calculus, vectors, and coordinate geometry. Includes weekly model tests and shortcut tricks for BUET & CKREUT admission.",
    tutorName: "Tanvir Hasan",
    tutorEmail: "tanvir.buet@mentorlagbe.com",
    approvalStatus: "approved",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "tui_102",
    title: "Class 9-10 Physics & General Science Foundation",
    subject: "Physics",
    classLevel: "SSC (Class 9-10)",
    mode: "Offline",
    location: "Dhanmondi, Dhaka",
    monthlyFee: 6000,
    daysPerWeek: 3,
    bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Master classical mechanics, thermodynamics, and electricity with practical problem-solving. Specialized guidance for top GPA-5.",
    tutorName: "Nafis Chowdhury",
    tutorEmail: "nafis.du@mentorlagbe.com",
    approvalStatus: "approved",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "tui_103",
    title: "Cambridge O / A-Level Chemistry & Past Papers",
    subject: "Chemistry",
    classLevel: "O-Level / A-Level",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    monthlyFee: 8000,
    daysPerWeek: 2,
    bannerImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    description: "Organic mechanisms, stoichiometry, and Cambridge Paper 1, 2 & 4 past-paper drill. 100% A* track record over past 4 exam series.",
    tutorName: "Zarin Subah",
    tutorEmail: "zarin.iba@mentorlagbe.com",
    approvalStatus: "approved",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "tui_104",
    title: "Full-Stack Web Development & Python Mentorship",
    subject: "Computer Science",
    classLevel: "College / University / Beginners",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    monthlyFee: 5000,
    daysPerWeek: 2,
    bannerImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description: "Hands-on projects with Next.js, Node.js, MongoDB, and Python basics. Mentorship includes GitHub reviews and portfolio building.",
    tutorName: "Farhan Ahmed",
    tutorEmail: "farhan.cse@mentorlagbe.com",
    approvalStatus: "approved",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "tui_105",
    title: "Medical Admission Biology Intensive Batch",
    subject: "Biology & Zoology",
    classLevel: "HSC & Medical Admission",
    mode: "Offline",
    location: "Chasara, Narayanganj",
    monthlyFee: 7000,
    daysPerWeek: 4,
    bannerImage: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
    description: "Detailed textbook line-by-line concept breakdown, diagram clarity, and daily 50-mark MCQ drills tailored for DMC & public medical exams.",
    tutorName: "Dr. Sadia Islam",
    tutorEmail: "sadia.dmc@mentorlagbe.com",
    approvalStatus: "approved",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "tui_106",
    title: "IELTS Academic Band 7.5+ Crash Preparation",
    subject: "English Language",
    classLevel: "IELTS Aspirants",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    monthlyFee: 5500,
    daysPerWeek: 3,
    bannerImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive speaking mock sessions, Task 1 & 2 essay evaluation with detailed rubrics, and high-frequency reading shortcuts.",
    tutorName: "Mahir Faisal",
    tutorEmail: "mahir.ielts@mentorlagbe.com",
    approvalStatus: "approved",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const CATEGORIES = [
  "All Tuitions",
  "Higher Mathematics",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Biology & Zoology",
  "English Language",
];

export default function FeaturedTuitions() {
  const [activeCategory, setActiveCategory] = useState("All Tuitions");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const filteredTuitions = activeCategory === "All Tuitions"
    ? SAMPLE_TUITIONS
    : SAMPLE_TUITIONS.filter((t) => t.subject === activeCategory);

  const toggleBookmark = (id: string, title: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      toast.success(`Removed "${title.substring(0, 22)}..." from saved tuitions`, {
        icon: "🗑️",
      });
    } else {
      if (bookmarkedIds.length >= 5) {
        toast.error("Free plan limit reached (max 5 bookmarks). Upgrade to Pro for unlimited saves!", {
          icon: "⭐",
        });
        return;
      }
      setBookmarkedIds([...bookmarkedIds, id]);
      toast.success(`Saved "${title.substring(0, 22)}..." to your bookmarks!`, {
        icon: "❤️",
      });
    }
  };

  return (
    <section className="relative py-20 bg-[#0E0203] overflow-hidden border-t border-[#E11D48]/20">
      {/* Ambient Crimson Flare */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-[#E11D48]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-[500px] h-[500px] bg-[#880816]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E11D48]/40 bg-[#1C0307]/80 px-3.5 py-1.5 mb-3 shadow-[0_0_15px_rgba(225,29,72,0.25)]">
              <Sparkles className="h-3.5 w-3.5 text-[#FF1E40]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                VERIFIED TUITIONS // REAL-TIME POSTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF4D6D] to-[#FF1E40] drop-shadow-[0_0_25px_rgba(255,30,64,0.6)]">Mentorship Batches</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#F4E2E5]/80 max-w-2xl">
              Explore recently approved home and online tuition postings. Filter by curriculum, subject, or class level.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E11D48]/50 bg-[#1C0307]/80 hover:bg-[#E11D48] hover:border-white text-white text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all cursor-pointer group shrink-0"
          >
            <span>View All Tuitions</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#E11D48] text-white shadow-[0_0_20px_rgba(225,29,72,0.6)] border border-white/30"
                  : "bg-[#1C0307]/90 text-[#F4E2E5]/80 border border-[#E11D48]/30 hover:border-[#FF1E40] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tuitions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTuitions.map((tuition) => {
            const tuitionId = tuition._id || "";
            const isBookmarked = bookmarkedIds.includes(tuitionId);

            return (
              <div
                key={tuitionId}
                className="group relative rounded-2xl bg-[#180306]/90 border border-[#E11D48]/35 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#FF1E40] hover:shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Banner & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-[#2D060C]">
                  <Image
                    src={tuition.bannerImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"}
                    alt={tuition.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180306] via-black/40 to-black/20" />

                  {/* Mode Pill (Online / Offline) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-[0_0_12px_rgba(0,0,0,0.8)] backdrop-blur-md border border-white/20 bg-black/60">
                    {tuition.mode === "Online" ? (
                      <>
                        <Globe className="h-3 w-3 text-[#FF1E40]" />
                        <span>ONLINE BATCH</span>
                      </>
                    ) : (
                      <>
                        <Compass className="h-3 w-3 text-[#FF1E40]" />
                        <span>OFFLINE TUITION</span>
                      </>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(tuitionId, tuition.title)}
                    aria-label="Bookmark tuition"
                    className={`absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border ${
                      isBookmarked
                        ? "bg-[#E11D48] text-white border-white shadow-[0_0_15px_rgba(255,30,64,0.8)]"
                        : "bg-black/60 text-white/90 border-white/20 hover:bg-[#FF1E40] hover:text-white"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-white" : ""}`} />
                  </button>

                  {/* Subject Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#E11D48]/90 text-white font-mono text-[11px] font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(225,29,72,0.5)]">
                      {tuition.subject}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Class Level */}
                    <div className="flex items-center gap-1.5 text-xs text-[#BFA5AA] font-mono mb-2">
                      <GraduationCap className="h-3.5 w-3.5 text-[#FF1E40]" />
                      <span>{tuition.classLevel}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-[#FF1E40] transition-colors line-clamp-2 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                      {tuition.title}
                    </h3>

                    {/* Description snippet */}
                    <p className="mt-2 text-xs text-[#F4E2E5]/75 line-clamp-2 leading-relaxed">
                      {tuition.description}
                    </p>
                  </div>

                  {/* Details / Specs Row */}
                  <div className="mt-4 pt-3 border-t border-[#E11D48]/20 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#F4E2E5]/90">
                      <div className="flex items-center gap-1.5 text-[#BFA5AA]">
                        <Calendar className="h-3.5 w-3.5 text-[#FF1E40]" />
                        <span>{tuition.daysPerWeek} days / week</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#BFA5AA]">
                        <MapPin className="h-3.5 w-3.5 text-[#FF1E40]" />
                        <span className="truncate max-w-[120px]">{tuition.location}</span>
                      </div>
                    </div>

                    {/* Tutor info */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-[#35070E] border border-[#FF1E40]/60 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                          {tuition.tutorName.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-white">
                          {tuition.tutorName}
                        </span>
                        <CheckCircle className="h-3.5 w-3.5 text-[#FF1E40]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Monthly Fee + CTA */}
                <div className="px-5 py-4 bg-[#140204] border-t border-[#E11D48]/25 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#BFA5AA] block uppercase">Monthly Fee</span>
                    <span className="text-lg font-black font-mono text-[#FF1E40] glow-scarlet">
                      ৳{tuition.monthlyFee.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/tuitions/${tuition._id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E11D48] hover:bg-[#FF1E40] text-white text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(255,30,64,0.7)] transition-all cursor-pointer active:scale-95"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Helper Note for Quota */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#BFA5AA] font-mono">
            Showing verified tuition batches • Free accounts can bookmark up to 5 tuitions.{" "}
            <Link href="/pricing" className="text-[#FF1E40] hover:underline font-bold">
              Upgrade to Pro for unlimited saves &amp; priority alerts →
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
