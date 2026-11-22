"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { 
  BookOpen, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  Loader2,
  GraduationCap
} from "lucide-react";

export default function PostTuitionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Higher Mathematics");
  const [classLevel, setClassLevel] = useState("Class 11-12 & Admission");
  const [mode, setMode] = useState("Online Batch");
  const [location, setLocation] = useState("Dhanmondi, Dhaka");
  const [schedule, setSchedule] = useState("3 days / week");
  const [monthlyFee, setMonthlyFee] = useState("6000");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a tuition title");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Tuition post created successfully and is now active!", {
      icon: "🎉",
    });
    setIsSubmitting(false);
    router.push("/dashboard/my-tuitions");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
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
              <span>TUTOR PORTAL // CREATE LISTING</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight mt-2">
            Post New Tuition
          </h2>
          <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            Create a new tuition offering or mentorship batch to start receiving applications.
          </p>
        </div>

        <Link
          href="/dashboard/my-tuitions"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#F5ECEC] dark:bg-[#1E0307] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs font-bold text-[#180C0E] dark:text-white hover:border-[#D91E48] dark:hover:border-[#FF1E40] transition-all cursor-pointer shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
          <span>View My Tuitions</span>
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#160307]/90 p-6 sm:p-8 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Tuition Title */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
              <span>Tuition Title / Program Name</span>
              <span className="text-[#D91E48] dark:text-[#FF1E40]">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. HSC Higher Math & Engineering Admission Prep"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none focus:ring-1 focus:ring-[#D91E48] dark:focus:ring-[#FF1E40] transition-colors"
              />
            </div>
          </div>

          {/* Grid: Subject & Class Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Subject Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5]">
                Subject Discipline
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
              >
                <option value="Higher Mathematics">Higher Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology & Zoology</option>
                <option value="Computer Science">Computer Science & Python</option>
                <option value="English Language">English Language & IELTS</option>
              </select>
            </div>

            {/* Target Class / Grade */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5]">
                Target Class Level
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
              >
                <option value="Class 11-12 & Admission">Class 11-12 & Admission</option>
                <option value="Class 9-10 (SSC)">Class 9-10 (SSC)</option>
                <option value="Cambridge O / A-Level">Cambridge O / A-Level</option>
                <option value="University & Beginners">University & Beginners</option>
                <option value="IELTS Aspirants">IELTS Aspirants</option>
              </select>
            </div>
          </div>

          {/* Mode of Teaching (Radio Buttons) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5]">
              Teaching Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Online Batch", "Offline Tuition", "Hybrid Model"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setMode(item)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    mode === item
                      ? "bg-[#D91E48] text-white border-[#D91E48] shadow-sm"
                      : "bg-[#FCF9F8] dark:bg-[#0D0204] text-[#5C494C] dark:text-[#BFA5AA] border-[#EADCDD] dark:border-[#E11D48]/25 hover:border-[#D91E48]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Location, Schedule & Monthly Fee */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5]">
                Location / District
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5]">
                Weekly Frequency
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="e.g. 3 days / week"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Monthly Fee */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
                <span>Monthly Fee (BDT)</span>
                <span className="text-[#D91E48] dark:text-[#FF1E40]">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
                <input
                  type="number"
                  required
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(e.target.value)}
                  placeholder="6000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Description & Syllabus details */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5]">
              Syllabus & Batch Details
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your course coverage, weekly model tests, personal feedback, and prerequisites..."
              className="w-full px-4 py-3 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5C494C] dark:text-[#BFA5AA] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.25)] hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing Post...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Tuition Post</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}