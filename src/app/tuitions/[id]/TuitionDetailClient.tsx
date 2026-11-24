"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  ShieldCheck,
  AlertOctagon,
  Clock,
  Lock,
  Pencil,
  CheckCircle2
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

      // Check localStorage across all saved tuition keys as fallback
      try {
        if (typeof window !== "undefined") {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith("mentorlagbe_tuitions_") || key === "mentorlagbe_all_tuitions")) {
              const list: any[] = JSON.parse(localStorage.getItem(key) || "[]");
              if (Array.isArray(list)) {
                const found = list.find((item) => item.id === id || item._id === id);
                if (found) {
                  setTuition(found);
                  setIsLoading(false);
                  return;
                }
              }
            }
          }
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

  const cachedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") : null;
  const currentEmail = (session?.user?.email || cachedUser?.email || "").toLowerCase().trim();
  const currentRole = ((session?.user as any)?.role || cachedUser?.role || "student").toLowerCase();

  const isRejected = tuition?.approvalStatus === "rejected";
  const isPending = tuition?.approvalStatus === "pending" || (!tuition?.approvalStatus && !tuition?.adminVerifiedAt);
  const isApproved = tuition?.approvalStatus === "approved" || Boolean(tuition?.adminVerifiedAt);
  const isPostClosed = tuition?.isActive === false;
  const isOwner = Boolean(currentEmail && tuition?.tutorEmail && currentEmail === tuition.tutorEmail.toLowerCase().trim());
  const isTutor = currentRole === "tutor";

  // Lock apply for students if not active or not approved
  const isApplyLocked = isRejected || isPending || isPostClosed;

  const handleApply = async () => {
    if (isOwner) {
      router.push("/dashboard/my-tuitions");
      return;
    }
    if (isTutor) {
      toast.error("Tutor accounts cannot apply for tuitions. Only student accounts can apply.", { icon: "🎓" });
      return;
    }
    if (isRejected) {
      toast.error("This tuition was rejected by moderation and is not open for applications.", { icon: "🚫" });
      return;
    }
    if (isPending) {
      toast.error("This tuition is currently awaiting admin verification.", { icon: "⏳" });
      return;
    }
    if (isPostClosed) {
      toast.error("This tuition post is currently closed by the tutor.", { icon: "🔒" });
      return;
    }

    // Check student application limit (10 for free students, unlimited for Pro)
    const userPlan = ((session?.user as any)?.plan || cachedUser?.plan || "free").toLowerCase();

    if (currentEmail && userPlan !== "pro" && currentRole !== "admin") {
      try {
        const usage = await fetch(`/api/user/usage?email=${encodeURIComponent(currentEmail)}`).then((r) => r.json());
        if (usage && usage.canApply === false) {
          toast.error(
            `Free limit reached: You have submitted ${usage.applicationsCount} of ${usage.studentLimit} free applications. Redirecting to upgrade to Pro for unlimited applications!`,
            { icon: "💎", duration: 5000 }
          );
          router.push("/checkout?plan=student");
          return;
        }
      } catch {
        // continue
      }
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

  // Proper 404 / Not Found screen if no tuition matches
  if (!tuition) {
    return (
      <div className="max-w-xl mx-auto min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-[#FDECEF] dark:bg-[#2A0612] border border-[#F2B8C4] dark:border-[#FF4D6D]/40 flex items-center justify-center text-[#D91E48] dark:text-[#FF4D6D] mb-4">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#180C0E] dark:text-white">
          Tuition Not Found
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA]">
          This tuition listing does not exist, has been removed, or is awaiting administrator verification.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-2.5 rounded-xl bg-[#D91E48] text-white text-xs font-bold shadow-md hover:bg-[#B31438] transition-all cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D91E48] text-white shadow-md">
                {tuition.subject || "Subject"}
              </span>
              
              <div className="flex items-center gap-2">
                {/* 1. Approval Status Badge */}
                {isRejected ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#FF4D6D]/40 shadow-md">
                    🚫 Moderation Rejected
                  </span>
                ) : isPending ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/40 shadow-md">
                    ⏳ Awaiting Approval
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/50 shadow-md">
                    ✓ Approved
                  </span>
                )}

                {/* 2. Active Status Badge */}
                {isPostClosed ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 text-gray-300 border border-white/20 shadow-md">
                    🔒 Closed
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0A2618]/90 text-[#10B981] border border-[#10B981]/50 shadow-md">
                    🟢 Active
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-[#EADCDD] dark:border-[#E11D48]/20 flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30">
              {tuition?.subject || "Subject Discipline"}
            </span>

            <div className="flex items-center gap-2">
              {/* 1. Approval Status Badge */}
              {isRejected ? (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#FF4D6D]/40">
                  🚫 Moderation Rejected
                </span>
              ) : isPending ? (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/40">
                  ⏳ Awaiting Approval
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/40">
                  ✓ Approved
                </span>
              )}

              {/* 2. Active Status Badge */}
              {isPostClosed ? (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F5ECEC] dark:bg-[#1E0307] text-[#8C7679] dark:text-[#BFA5AA] border border-[#EADCDD]">
                  🔒 Closed
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0]">
                  🟢 Active
                </span>
              )}
            </div>
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

          {/* Status Warning Alerts if rejected or pending */}
          {isRejected && (
            <div className="p-4 rounded-2xl bg-[#FDECEF] dark:bg-[#2A0612] border border-[#F2B8C4] dark:border-[#FF4D6D]/40 text-xs text-[#D91E48] dark:text-[#FF4D6D] flex items-center gap-3">
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold block">Listing Moderation Notice</span>
                <span>This tuition listing was rejected by platform administrators. Please edit your tuition details or contact support for assistance.</span>
              </div>
            </div>
          )}

          {isPending && (
            <div className="p-4 rounded-2xl bg-[#FEF3C7] dark:bg-[#281804] border border-[#FDE68A] dark:border-[#FFB800]/40 text-xs text-[#B45309] dark:text-[#FFB800] flex items-center gap-3">
              <Clock className="w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold block">Awaiting Administrator Review</span>
                <span>This tuition listing has been submitted and is currently pending verification. It will become open for student applications once approved.</span>
              </div>
            </div>
          )}

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
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                isRejected
                  ? "bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] border-[#F2B8C4]"
                  : isPending
                  ? "bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border-[#FDE68A]"
                  : "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border-[#A7F3D0]"
              }`}
            >
              {isRejected ? "Rejected" : isPending ? "Pending Review" : "Approved"}
            </span>
          </div>

          {/* Action / Apply CTA */}
          <div className="pt-4 border-t border-[#EADCDD] dark:border-[#E11D48]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#8C7679] uppercase block">
                Tuition Availability
              </span>
              <p className="text-xs font-semibold text-[#180C0E] dark:text-white">
                {isOwner
                  ? "You are the creator of this tuition post. Manage it from your dashboard."
                  : isTutor
                  ? "You are viewing this listing with a tutor account. Tutors cannot apply."
                  : isRejected
                  ? "Applications are locked because this listing was rejected."
                  : isPending
                  ? "Applications will open as soon as this post is approved by admin."
                  : isPostClosed
                  ? "Tutor has paused applications for this batch."
                  : "Seats are currently open for new student applicants."}
              </p>
            </div>

            {isOwner ? (
              <Link
                href="/dashboard/my-tuitions"
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#D91E48] hover:bg-[#B31438] text-white shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Manage in My Tuitions</span>
              </Link>
            ) : isTutor ? (
              <button
                type="button"
                disabled
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#EADCDD] dark:bg-[#2A060C] text-[#8C7679] dark:text-[#BFA5AA] cursor-not-allowed opacity-75"
              >
                Tutor View Only
              </button>
            ) : (
              <button
                type="button"
                disabled={isApplyLocked}
                onClick={handleApply}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer ${
                  isRejected
                    ? "bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] cursor-not-allowed opacity-75"
                    : isPending
                    ? "bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] cursor-not-allowed opacity-75"
                    : isPostClosed
                    ? "bg-[#EADCDD] dark:bg-[#2A060C] text-[#8C7679] dark:text-[#BFA5AA] cursor-not-allowed opacity-60"
                    : "bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white hover:shadow-lg"
                }`}
              >
                {isRejected
                  ? "🚫 Post Rejected"
                  : isPending
                  ? "⏳ Pending Approval"
                  : isPostClosed
                  ? "🔒 Closed"
                  : "Apply for Tuition"}
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
