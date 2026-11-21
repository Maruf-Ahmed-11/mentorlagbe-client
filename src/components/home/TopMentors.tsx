"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, ArrowRight, Award, GraduationCap, Users } from "lucide-react";

const TOP_MENTORS = [
  {
    id: "m1",
    name: "Ariful Islam Shakib",
    institution: "BUET, EEE (Batch '20)",
    experience: "4+ Years Teaching",
    rating: 4.98,
    reviewsCount: 142,
    studentsTaught: 380,
    specialty: "HSC Physics & Engineering Math",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    badge: "Top Rated Mentor",
  },
  {
    id: "m2",
    name: "Nusrat Jahan Sneha",
    institution: "Dhaka Medical College (K-78)",
    experience: "3+ Years Teaching",
    rating: 4.95,
    reviewsCount: 118,
    studentsTaught: 290,
    specialty: "Medical Admission Biology & Botany",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    badge: "Medical Specialist",
  },
  {
    id: "m3",
    name: "Rayhan Kabir",
    institution: "University of Dhaka, Applied Chemistry",
    experience: "5+ Years Teaching",
    rating: 4.92,
    reviewsCount: 165,
    studentsTaught: 450,
    specialty: "A-Level & HSC Chemistry",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    badge: "A-Level Mentor",
  },
  {
    id: "m4",
    name: "Tahmina Akter",
    institution: "IBA, University of Dhaka",
    experience: "3+ Years Teaching",
    rating: 5.0,
    reviewsCount: 94,
    studentsTaught: 210,
    specialty: "IELTS 8.5 & Academic English",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    badge: "IELTS Expert",
  },
];

export default function TopMentors() {
  return (
    <section className="relative py-20 bg-[#0E0203] overflow-hidden border-t border-[#E11D48]/20">
      {/* Cinematic Accent Glow */}
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] bg-[#E11D48]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E11D48]/40 bg-[#1C0307]/80 px-3.5 py-1.5 mb-3 shadow-[0_0_15px_rgba(225,29,72,0.25)]">
              <Award className="h-3.5 w-3.5 text-[#FF1E40]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                ELITE VERIFIED EDUCATORS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Learn From <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF4D6D] to-[#FF1E40] drop-shadow-[0_0_25px_rgba(255,30,64,0.6)]">Top Mentors</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#F4E2E5]/80 max-w-2xl">
              Strictly vetted subject matter experts from BUET, DU, Medical, and IBA with proven records of student excellence.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E11D48]/50 bg-[#1C0307]/80 hover:bg-[#E11D48] hover:border-white text-white text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all cursor-pointer group shrink-0"
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
              className="group relative rounded-2xl bg-[#180306]/90 border border-[#E11D48]/35 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#FF1E40] hover:shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo & Badge */}
              <div className="relative h-60 w-full overflow-hidden bg-[#2D060C]">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180306] via-transparent to-black/30" />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#E11D48] text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(225,29,72,0.8)] border border-white/30">
                    {mentor.badge}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-md">
                  <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
                  <span>{mentor.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Mentor Info */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#FF1E40] font-mono font-bold mb-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span className="truncate">{mentor.institution}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#FF1E40] transition-colors leading-snug">
                    {mentor.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#F4E2E5]/80 font-medium">
                    {mentor.specialty}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-4 pt-3 border-t border-[#E11D48]/20 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-1.5 rounded-lg bg-[#240408] border border-[#E11D48]/30">
                    <span className="text-[#BFA5AA] block text-[10px]">EXPERIENCE</span>
                    <span className="font-bold text-white">{mentor.experience}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#240408] border border-[#E11D48]/30">
                    <span className="text-[#BFA5AA] block text-[10px]">STUDENTS</span>
                    <span className="font-bold text-[#FF1E40]">{mentor.studentsTaught}+</span>
                  </div>
                </div>
              </div>

              {/* View Profile Action */}
              <div className="p-4 bg-[#140204] border-t border-[#E11D48]/25">
                <Link
                  href="/tuitions"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2D060C] hover:bg-[#E11D48] text-white text-xs font-bold tracking-wide border border-[#E11D48]/40 hover:border-white shadow-sm transition-all"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#FF1E40] group-hover:text-white" />
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
