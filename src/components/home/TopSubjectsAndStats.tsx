"use client";

import Link from "next/link";
import { 
  Calculator, 
  Atom, 
  Code2, 
  Languages, 
  FlaskConical, 
  Dna, 
  Star, 
  Quote, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from "lucide-react";

const POPULAR_SUBJECTS = [
  {
    name: "Mathematics",
    query: "Math",
    description: "HSC Higher Math, Calculus, SSC & Admission shortcuts",
    studentCount: "1,250+ Students",
    batchesCount: "85+ Active Batches",
    icon: Calculator,
    tag: "MOST POPULAR",
  },
  {
    name: "Physics",
    query: "Physics",
    description: "Mechanics, Electromagnetism & Modern Physics",
    studentCount: "980+ Students",
    batchesCount: "64+ Active Batches",
    icon: Atom,
    tag: "HIGH DEMAND",
  },
  {
    name: "Programming",
    query: "Programming",
    description: "Python, Next.js, Full-Stack Web & Data Structures",
    studentCount: "860+ Students",
    batchesCount: "48+ Active Batches",
    icon: Code2,
    tag: "TECH & STEM",
  },
  {
    name: "IELTS & English",
    query: "IELTS",
    description: "Band 7.5+ Prep, Speaking Mocks & Academic Writing",
    studentCount: "1,120+ Students",
    batchesCount: "72+ Active Batches",
    icon: Languages,
    tag: "GLOBAL PREP",
  },
  {
    name: "Chemistry",
    query: "Chemistry",
    description: "Organic Mechanisms, Paper 2 & Medical Chemistry",
    studentCount: "740+ Students",
    batchesCount: "52+ Active Batches",
    icon: FlaskConical,
    tag: "CORE SCIENCE",
  },
  {
    name: "Biology & Medical",
    query: "Biology",
    description: "Zoology, Botany & Medical Admission MCQ Masterclass",
    studentCount: "890+ Students",
    batchesCount: "58+ Active Batches",
    icon: Dna,
    tag: "DMC & MEDICAL",
  },
];

const PLATFORM_STATS = [
  { label: "Verified Tutors", value: "2,800+", change: "+140 this month" },
  { label: "Active Students", value: "15,000+", change: "Pan-Bangladesh" },
  { label: "Match Satisfaction", value: "98.4%", change: "5-Star Average" },
  { label: "Platform Commission", value: "0%", change: "100% to Tutors" },
];

const TESTIMONIALS = [
  {
    name: "Ayman Sadiq Chowdhury",
    role: "HSC 2025 Science Student (Notre Dame College)",
    quote:
      "I connected with a BUET EEE tutor within 12 hours of browsing. His calculus shortcut notes and weekly mock tests helped me score GPA-5 in my college pre-test exams.",
    rating: 5,
    subject: "Higher Math & Physics",
    avatarBg: "bg-[#880816]",
  },
  {
    name: "Tahmidur Rahman",
    role: "Verified Tutor (BUET CSE, Batch '21)",
    quote:
      "Unlike traditional tuition agencies that deduct 50% commission, MentorLagbe takes 0%. The Tutor Dashboard makes managing batch enrollments and student inquiries completely effortless.",
    rating: 5,
    subject: "Programming & Math",
    avatarBg: "bg-[#2D060C]",
  },
  {
    name: "Farhana Yasmin",
    role: "Guardian of Grade 10 Student (Scholastica)",
    quote:
      "Safety and credibility were our primary concerns. MentorLagbe's verified university credential badges gave us complete peace of mind. Our Chemistry demo class was fantastic.",
    rating: 5,
    subject: "O-Level Chemistry",
    avatarBg: "bg-[#550A14]",
  },
  {
    name: "Nabil Mahbub",
    role: "IELTS Academic Test Taker",
    quote:
      "Booked an online 1-on-1 IELTS mentor for Speaking and Writing task evaluations. Achieved an overall Band 8.0 on my first attempt!",
    rating: 5,
    subject: "IELTS Band 8.0",
    avatarBg: "bg-[#660C18]",
  },
];

export default function TopSubjectsAndStats() {
  return (
    <section id="about" className="relative py-24 bg-[#FCF9F8] dark:bg-[#0E0203] overflow-hidden border-t border-[#EADCDD] dark:border-[#E11D48]/20 transition-colors duration-200">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(247,232,234,0.85)_0%,_transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.18)_0%,_transparent_75%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =================================================================== */}
        {/* 1. TOP SUBJECTS HEADER & GRID                                       */}
        {/* =================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2B8C4] dark:border-[#E11D48]/40 bg-[#FFFFFF] dark:bg-[#1C0307]/80 px-4 py-1.5 mb-3 shadow-[0_4px_16px_rgba(217,30,72,0.12)] dark:shadow-[0_0_15px_rgba(225,29,72,0.25)]">
            <Sparkles className="h-3.5 w-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-white">
              POPULAR LEARNING PATHS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#180C0E] dark:text-white uppercase tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91E48] via-[#FF1E40] to-[#B31438] dark:from-white dark:via-[#FF4D6D] dark:to-[#FF1E40] drop-shadow-[0_0_16px_rgba(217,30,72,0.25)] dark:drop-shadow-[0_0_25px_rgba(255,30,64,0.6)]">Top Subjects</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C494C] dark:text-[#F4E2E5]/80 leading-relaxed">
            Choose from highly sought-after academic and competitive skill disciplines with verified mentors.
          </p>
        </div>

        {/* Subjects 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {POPULAR_SUBJECTS.map((sub, idx) => {
            const Icon = sub.icon;
            return (
              <Link
                key={idx}
                href={`/tuitions?q=${encodeURIComponent(sub.query)}`}
                className="group relative rounded-2xl bg-white dark:bg-[#180306]/90 border border-[#EADCDD] dark:border-[#E11D48]/30 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06),_0_0_0_1px_rgba(242,184,196,0.25)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:shadow-[0_16px_36px_-6px_rgba(217,30,72,0.2),_0_0_20px_rgba(217,30,72,0.12)] dark:hover:shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#EADCDD] dark:border-[#E11D48]/20">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F5ECEC] dark:bg-[#2A060C] border border-[#F2B8C4] dark:border-[#E11D48]/40 text-[10px] font-mono font-bold text-[#D91E48] dark:text-[#FF1E40]">
                      {sub.tag}
                    </span>
                    <span className="text-xs font-mono text-[#8C7679] dark:text-[#BFA5AA]">
                      {sub.batchesCount}
                    </span>
                  </div>

                  <div className="my-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#F5ECEC] dark:bg-[#2D060C] border border-[#F2B8C4] dark:border-[#FF1E40]/50 text-[#D91E48] dark:text-[#FF1E40] group-hover:text-white group-hover:bg-[#D91E48] dark:group-hover:bg-[#E11D48] flex items-center justify-center shadow-[0_4px_14px_rgba(217,30,72,0.12)] dark:shadow-[0_0_15px_rgba(255,30,64,0.25)] transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-xs font-mono text-[#8C7679] dark:text-[#BFA5AA]">
                        {sub.studentCount}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C494C] dark:text-[#F4E2E5]/75 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EADCDD] dark:border-[#E11D48]/20 flex items-center justify-between text-xs font-mono font-bold text-[#D91E48] dark:text-[#FF1E40] group-hover:text-[#B31438] dark:group-hover:text-white transition-colors">
                  <span>Browse Mentors</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 2. PLATFORM STATISTICS RIBBON                                       */}
        {/* =================================================================== */}
        <div className="mb-24 rounded-3xl bg-[#FFFFFF] dark:bg-[#1C0307]/95 border-2 border-[#EADCDD] dark:border-[#E11D48]/40 p-8 sm:p-10 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(24,12,14,0.08),_0_0_0_1px_rgba(242,184,196,0.35)] dark:shadow-[0_0_40px_rgba(225,29,72,0.25),_inset_0_1px_0_rgba(255,255,255,0.12)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#EADCDD] dark:divide-[#E11D48]/25">
            {PLATFORM_STATS.map((stat, idx) => (
              <div key={idx} className={idx > 0 ? "pt-6 lg:pt-0 lg:px-6" : "lg:px-6"}>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-[#180C0E] dark:text-white drop-shadow-[0_0_12px_rgba(217,30,72,0.15)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D91E48] dark:text-[#FF1E40] mt-2 font-mono">
                  {stat.label}
                </p>
                <p className="text-[11px] font-mono text-[#8C7679] dark:text-[#BFA5AA] mt-1">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. VERIFIED STUDENT & TUTOR TESTIMONIALS                            */}
        {/* =================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2B8C4] dark:border-[#E11D48]/40 bg-[#FFFFFF] dark:bg-[#1C0307]/80 px-4 py-1.5 mb-3 shadow-[0_4px_16px_rgba(217,30,72,0.12)] dark:shadow-[0_0_15px_rgba(225,29,72,0.25)]">
            <Quote className="h-3.5 w-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-white">
              COMMUNITY VOICES // REAL IMPACT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#180C0E] dark:text-white uppercase tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D91E48] via-[#FF1E40] to-[#B31438] dark:from-white dark:via-[#FF4D6D] dark:to-[#FF1E40] drop-shadow-[0_0_16px_rgba(217,30,72,0.25)] dark:drop-shadow-[0_0_25px_rgba(255,30,64,0.6)]">Students &amp; Tutors</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C494C] dark:text-[#F4E2E5]/80 leading-relaxed">
            Read authentic feedback from learners achieving GPA-5 and mentors teaching on their own terms.
          </p>
        </div>

        {/* 4 Testimonial Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-[#FFFFFF] dark:bg-[#180306]/90 border border-[#EADCDD] dark:border-[#E11D48]/30 p-6 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06),_0_0_0_1px_rgba(242,184,196,0.25)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#D91E48] dark:hover:border-[#FF1E40] hover:shadow-[0_16px_36px_-6px_rgba(217,30,72,0.2),_0_0_20px_rgba(217,30,72,0.12)] dark:hover:shadow-[0_0_25px_rgba(225,29,72,0.35)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-bold text-[#180C0E] dark:text-white">5.0</span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#F4E2E5]/85 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-[#EADCDD] dark:border-[#E11D48]/20 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full ${item.avatarBg} border border-[#D91E48] dark:border-[#FF1E40]/60 flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {item.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#180C0E] dark:text-white truncate">
                      {item.name}
                    </p>
                    <CheckCircle2 className="h-3 w-3 text-[#D91E48] dark:text-[#FF1E40] shrink-0" />
                  </div>
                  <p className="text-[10px] text-[#8C7679] dark:text-[#BFA5AA] truncate font-sans">
                    {item.role}
                  </p>
                  <span className="text-[9px] font-mono text-[#D91E48] dark:text-[#FF1E40]">
                    #{item.subject}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
