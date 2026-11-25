"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, ArrowRight, Award, GraduationCap, Users } from "lucide-react";

const TOP_MENTORS = [
  {
    id: "m1",
    name: "Tahmidur Rahman",
    institution: "BUET, Mechanical Engineering",
    experience: "5+ Years Teaching",
    rating: 5.0,
    reviewsCount: 142,
    studentsTaught: 380,
    specialty: "HSC Physics & Engineering Math",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    badge: "Top Rated Mentor",
    searchQuery: "Tahmidur Rahman",
  },
  {
    id: "m2",
    name: "Zarin Subah",
    institution: "University of Dhaka, Chemistry",
    experience: "4+ Years Teaching",
    rating: 5.0,
    reviewsCount: 118,
    studentsTaught: 290,
    specialty: "A-Level Chemistry & Medical Biology",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    badge: "Science Specialist",
    searchQuery: "Zarin Subah",
  },
  {
    id: "m3",
    name: "Nafis Chowdhury",
    institution: "BUET, Computer Science & Eng.",
    experience: "4+ Years Teaching",
    rating: 4.9,
    reviewsCount: 165,
    studentsTaught: 450,
    specialty: "Full-Stack Web Dev & HSC ICT",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    badge: "Tech Mentor",
    searchQuery: "Nafis Chowdhury",
  },
  {
    id: "m4",
    name: "Farhana Akter",
    institution: "IBA, University of Dhaka",
    experience: "3+ Years Teaching",
    rating: 5.0,
    reviewsCount: 94,
    studentsTaught: 210,
    specialty: "IELTS 8.5 & O-Level English",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    badge: "IELTS Expert",
    searchQuery: "Farhana Akter",
  },
];

export default function TopMentors() {
  return (
    <section className="relative py-20 bg-[#F8FAFC] dark:bg-[#050B14] overflow-hidden border-t border-[#E2E8F0] dark:border-[#0284C7]/20 transition-colors duration-200">
      {/* Cinematic Accent Glow */}
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] bg-[#0284C7]/10 dark:bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] dark:border-[#0284C7]/40 bg-[#FFFFFF] dark:bg-[#0D1D38]/80 px-3.5 py-1.5 mb-3 shadow-[0_4px_16px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(2, 132, 199,0.25)]">
              <Award className="h-3.5 w-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white">
                ELITE VERIFIED EDUCATORS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1320] dark:text-white uppercase tracking-tight">
              Learn From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] dark:from-white dark:via-[#38BDF8] dark:to-[#0EA5E9] drop-shadow-[0_0_16px_rgba(2, 132, 199,0.25)] dark:drop-shadow-[0_0_25px_rgba(14, 165, 233,0.6)]">Top Mentors</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] dark:text-[#E2E8F0]/80 max-w-2xl">
              Strictly vetted subject matter experts from BUET, DU, Medical, and IBA with proven records of student excellence.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#BAE6FD] dark:border-[#0284C7]/50 bg-[#FFFFFF] dark:bg-[#0D1D38]/80 hover:bg-[#0284C7] dark:hover:bg-[#0284C7] hover:border-[#0284C7] dark:hover:border-white text-[#0B1320] hover:text-white dark:text-white text-sm font-bold tracking-wide shadow-sm dark:shadow-[0_0_20px_rgba(2, 132, 199,0.3)] transition-all cursor-pointer group shrink-0"
          >
            <span>Browse All Mentors</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="group relative rounded-2xl bg-[#FFFFFF] dark:bg-[#0B1930]/90 border border-[#E2E8F0] dark:border-[#0284C7]/35 overflow-hidden shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06),_0_0_0_1px_rgba(186, 230, 253,0.25)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-[0_16px_36px_-6px_rgba(2, 132, 199,0.2),_0_0_20px_rgba(2, 132, 199,0.12)] dark:hover:shadow-[0_0_35px_rgba(2, 132, 199,0.45)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo & Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-[#F0F7FF] dark:bg-[#0C4A6E]">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent dark:from-[#0B1930] dark:via-transparent dark:to-black/30" />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#0284C7] dark:bg-[#0284C7] text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-[0_4px_12px_rgba(2, 132, 199,0.4)] dark:shadow-[0_0_12px_rgba(2, 132, 199,0.8)] border border-white/30">
                    {mentor.badge}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-md">
                  <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
                  <span>{mentor.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Mentor Info */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#0284C7] dark:text-[#0EA5E9] font-mono font-bold mb-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span className="truncate">{mentor.institution}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors leading-snug">
                    {mentor.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#475569] dark:text-[#E2E8F0]/80 font-medium">
                    {mentor.specialty}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#0284C7]/20 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-1.5 rounded-lg bg-[#F0F7FF] dark:bg-[#102547] border border-[#E2E8F0] dark:border-[#0284C7]/30">
                    <span className="text-[#64748B] dark:text-[#94A3B8] block text-[10px]">EXPERIENCE</span>
                    <span className="font-bold text-[#0B1320] dark:text-white">{mentor.experience}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#F0F7FF] dark:bg-[#102547] border border-[#E2E8F0] dark:border-[#0284C7]/30">
                    <span className="text-[#64748B] dark:text-[#94A3B8] block text-[10px]">STUDENTS</span>
                    <span className="font-bold text-[#0284C7] dark:text-[#0EA5E9]">{mentor.studentsTaught}+</span>
                  </div>
                </div>
              </div>

              {/* View Profile Action */}
              <div className="p-4 bg-[#F8FAFC] dark:bg-[#0B1930] border-t border-[#E2E8F0] dark:border-[#0284C7]/25">
                <Link
                  href={`/tuitions?q=${encodeURIComponent(mentor.searchQuery)}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F0F7FF] hover:bg-[#0284C7] text-[#0B1320] hover:text-white dark:bg-[#0C4A6E] dark:hover:bg-[#0284C7] dark:text-white text-xs font-bold tracking-wide border border-[#E2E8F0] hover:border-[#0284C7] dark:border-[#0284C7]/40 dark:hover:border-white shadow-sm transition-all"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#0284C7] group-hover:text-white dark:text-[#0EA5E9]" />
                  <span>View Batches</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
