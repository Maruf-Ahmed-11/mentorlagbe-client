"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Globe, 
  GraduationCap, 
  ShieldCheck 
} from "lucide-react";

export default function TuitionDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [tuition, setTuition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTuition() {
      setIsLoading(true);
      try {
        const res = await apiFetch<any>(`/tuitions/${id}`);
        if (res && (res._id || res.id || res.title)) {
          setTuition(res);
          setIsLoading(false);
          return;
        }
      } catch {
        // Fallback to local storage if offline or freshly created
      }

      // Check localStorage
      try {
        const userEmail = session?.user?.email || "tutor@mentorlagbe.com";
        const stored: any[] = JSON.parse(localStorage.getItem(`mentorlagbe_tuitions_${userEmail}`) || "[]");
        const found = stored.find((item) => item.id === id || item._id === id);
        if (found) {
          setTuition(found);
        }
      } catch {
        // Handled silently
      }

      setIsLoading(false);
    }

    if (id) {
      loadTuition();
    }
  }, [id, session?.user?.email]);

  const handleApply = () => {
    if (!tuition?.isActive) {
      toast.error("This tuition post is currently closed by the tutor.");
      return;
    }
    toast.success("Application modal will open next! (Application workflow)", { icon: "📝" });
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Sparkles className="w-8 h-8 text-[#D91E48] dark:text-[#FF1E40] animate-spin mb-3" />
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
          Loading tuition details...
        </p>
      </div>
    );
  }

  const isClosed = tuition?.isActive === false;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7679] dark:text-[#BFA5AA] hover:text-[#D91E48] dark:hover:text-[#FF1E40] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Go Back</span>
      </button>

      {/* Main Card */}
      <div className="rounded-3xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#140204]/95 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
        
        {/* Banner Image */}
        {tuition?.bannerImage ? (
          <div className="relative w-full h-56 sm:h-72 bg-[#FCF9F8] dark:bg-[#0D0204] overflow-hidden">
            <Image
              src={tuition.bannerImage}
              alt={tuition.title || "Tuition Banner"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D91E48] text-white shadow-md">
                {tuition.subject || "Subject"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-md ${
                  isClosed
                    ? "bg-black/60 text-gray-300 border-white/20"
                    : "bg-[#0A2618]/90 text-[#10B981] border-[#10B981]/50"
                }`}
              >
                {isClosed ? "🔒 Applications Closed" : "🟢 Accepting Students"}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-[#EADCDD] dark:border-[#E11D48]/20 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30">
              {tuition?.subject || "Subject Discipline"}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isClosed
                  ? "bg-[#F5ECEC] dark:bg-[#1E0307] text-[#8C7679] dark:text-[#BFA5AA] border-[#EADCDD]"
                  : "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border-[#A7F3D0]"
              }`}
            >
              {isClosed ? "🔒 Closed" : "🟢 Active"}
            </span>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header Title & Details */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight">
              {tuition?.title || "Tuition Program"}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#D91E48] dark:text-[#FF1E40] mt-1">
              Target Level: {tuition?.classLevel || "Class Level"}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/20 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8C7679] dark:text-[#BFA5AA] block">
                Mode
              </span>
              <span className="font-bold text-[#180C0E] dark:text-white flex items-center gap-1 mt-0.5">
                <Globe className="w-3.5 h-3.5 text-[#D91E48]" />
                <span className="truncate">{tuition?.mode || "Online"}</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#8C7679] dark:text-[#BFA5AA] block">
                Location
              </span>
              <span className="font-bold text-[#180C0E] dark:text-white flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#D91E48]" />
                <span className="truncate">{tuition?.location || "Bangladesh"}</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#8C7679] dark:text-[#BFA5AA] block">
                Schedule
              </span>
              <span className="font-bold text-[#180C0E] dark:text-white flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#D91E48]" />
                <span className="truncate">{tuition?.schedule || "3 days / week"}</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#8C7679] dark:text-[#BFA5AA] block">
                Monthly Fee
              </span>
              <span className="text-sm font-black font-mono text-[#D91E48] dark:text-[#FF1E40] block mt-0.5">
                ৳{Number(tuition?.monthlyFee || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Syllabus &amp; Course Coverage
            </h3>
            <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#F4E2E5]/90 leading-relaxed whitespace-pre-line">
              {tuition?.description || "No description provided."}
            </p>
          </div>

          {/* Tutor Info */}
          <div className="p-4 rounded-2xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] font-bold border border-[#F2B8C4] dark:border-[#E11D48]/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#180C0E] dark:text-white flex items-center gap-1.5">
                  <span>{tuition?.tutorName || "Verified Mentor"}</span>
                  <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                </h4>
                <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA]">
                  {tuition?.tutorEmail || "Verified Instructor"}
                </p>
              </div>
            </div>

            {/* Approval Badge */}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30">
              {tuition?.approvalStatus || "Pending Review"}
            </span>
          </div>

          {/* Action / Apply CTA (Respects isClosed!) */}
          <div className="pt-4 border-t border-[#EADCDD] dark:border-[#E11D48]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#8C7679] uppercase block">
                Tuition Availability
              </span>
              <p className="text-xs font-semibold text-[#180C0E] dark:text-white">
                {isClosed
                  ? "Tutor has paused applications for this batch."
                  : "Seats are currently open for new student applicants."}
              </p>
            </div>

            <button
              type="button"
              disabled={isClosed}
              onClick={handleApply}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer ${
                isClosed
                  ? "bg-[#EADCDD] dark:bg-[#2A060C] text-[#8C7679] dark:text-[#BFA5AA] cursor-not-allowed opacity-60"
                  : "bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white hover:shadow-lg"
              }`}
            >
              {isClosed ? "🔒 Closed" : "Apply for Tuition"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
