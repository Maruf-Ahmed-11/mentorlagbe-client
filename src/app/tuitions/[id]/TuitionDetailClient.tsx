"use client";

import { useEffect, useState, useCallback } from "react";
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
  AlertOctagon,
  Clock,
  Pencil,
  CheckCircle2,
  X,
  Send,
  Phone,
  Loader2,
  Share2,
  Bookmark,
  Star,
  User,
  Mail,
} from "lucide-react";

interface ReviewItem {
  id: string;
  tuitionId: string;
  studentName: string;
  studentEmail: string;
  studentImage?: string | null;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function TuitionDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [tuition, setTuition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [studentPhone, setStudentPhone] = useState("");
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [applicationNote, setApplicationNote] = useState("");
  const [isSubmittingApply, setIsSubmittingApply] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Bookmark & Share State
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const loadReviews = useCallback(async (tuitionId: string) => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`/api/reviews?tuitionId=${encodeURIComponent(tuitionId)}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setAverageRating(Number(data.averageRating || 0));
        setTotalReviews(Number(data.totalReviews || 0));
      }
    } catch {
      // silent
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    async function loadTuition() {
      setIsLoading(true);
      try {
        const pubRes = await fetch(`/api/tuitions/public?id=${encodeURIComponent(id)}`, {
          cache: "no-store",
        });
        if (pubRes.ok) {
          const pubData = await pubRes.json();
          if (pubData && (pubData._id || pubData.id || pubData.title)) {
            setTuition(pubData);
            setIsLoading(false);
            loadReviews(pubData._id || pubData.id || id);
            return;
          }
        }
      } catch {
        // fallback to Express API
      }

      try {
        const res = await apiFetch<any>(`/tuitions/${id}`);
        if (res && (res._id || res.id || res.title)) {
          setTuition(res);
          setIsLoading(false);
          loadReviews(res._id || res.id || id);
          return;
        }
      } catch {
        // Fallback to local storage if offline or freshly created
      }

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
                  loadReviews(found._id || found.id || id);
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
  }, [id, session?.user?.email, loadReviews]);

  // Check bookmark state (scoped per user email)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const email = (session?.user?.email || "").toLowerCase().trim();
    if (!email) {
      setIsBookmarked(false);
      return;
    }
    try {
      const saved: string[] = JSON.parse(
        localStorage.getItem(`mentorlagbe_saved_tuitions_${email}`) || "[]"
      );
      setIsBookmarked(saved.includes(id));
    } catch {}
  }, [id, session?.user?.email]);

  const cachedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null")
      : null;
  const currentEmail = (session?.user?.email || cachedUser?.email || "").toLowerCase().trim();
  const currentRole = ((session?.user as any)?.role || cachedUser?.role || "student").toLowerCase();

  const isRejected = tuition?.approvalStatus === "rejected";
  const isPending =
    tuition?.approvalStatus === "pending" || (!tuition?.approvalStatus && !tuition?.adminVerifiedAt);
  const isPostClosed = tuition?.isActive === false;
  const isOwner = Boolean(
    currentEmail && tuition?.tutorEmail && currentEmail === tuition.tutorEmail.toLowerCase().trim()
  );
  const isTutor = currentRole === "tutor";
  const isAdmin = currentRole === "admin";
  const isStudent = Boolean(currentEmail) && !isTutor && !isAdmin;

  const isApplyLocked = isRejected || isPending || isPostClosed;

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Tuition link copied to clipboard!");
      }
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleToggleBookmark = () => {
    if (typeof window === "undefined") return;
    if (!currentEmail) {
      toast.error("Please sign in as a student to save tuitions.");
      return;
    }
    if (!isStudent) {
      toast.error("Only student accounts can bookmark tuitions.");
      return;
    }
    try {
      const savedKey = `mentorlagbe_saved_tuitions_${currentEmail}`;
      const saved: string[] = JSON.parse(localStorage.getItem(savedKey) || "[]");
      const exists = saved.includes(id);
      const userPlan = ((session?.user as any)?.plan || cachedUser?.plan || "free").toLowerCase();
      const isPro = userPlan === "pro";

      if (!exists && !isPro && saved.length >= 5) {
        toast.error("Free plan allows up to 5 bookmarks. Upgrade to Pro for unlimited bookmarks!");
        return;
      }

      const next = exists ? saved.filter((x) => x !== id) : [...saved, id];
      localStorage.setItem(savedKey, JSON.stringify(next));
      setIsBookmarked(!exists);
      toast.success(exists ? "Removed from saved tuitions" : "Saved to bookmarks!");
    } catch {}
  };

  const handleApply = async () => {
    if (isOwner) {
      router.push("/dashboard/my-tuitions");
      return;
    }
    if (isTutor) {
      toast.error("Tutor accounts cannot apply for tuitions. Only student accounts can apply.");
      return;
    }
    if (isRejected) {
      toast.error("This tuition was rejected by moderation and is not open for applications.");
      return;
    }
    if (isPending) {
      toast.error("This tuition is currently awaiting admin verification.");
      return;
    }
    if (isPostClosed) {
      toast.error("This tuition post is currently closed by the tutor.");
      return;
    }
    if (!currentEmail) {
      toast.error("Please sign in as a student to apply for this tuition");
      router.push("/sign-in");
      return;
    }

    const userPlan = ((session?.user as any)?.plan || cachedUser?.plan || "free").toLowerCase();

    if (currentEmail && userPlan !== "pro" && currentRole !== "admin") {
      try {
        const usage = await fetch(`/api/user/usage?email=${encodeURIComponent(currentEmail)}`).then((r) =>
          r.json()
        );
        if (usage && usage.canApply === false) {
          toast.error(
            `Free limit reached: You have submitted ${usage.applicationsCount} of ${usage.studentFreeLimit} free applications. Redirecting to upgrade to Pro for unlimited applications!`,
            { icon: "💎", duration: 5000 }
          );
          router.push("/checkout?plan=student");
          return;
        }
      } catch {
        // continue
      }
    }

    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentPhone.trim()) {
      toast.error("Please enter your contact phone number");
      return;
    }
    if (!applicationNote.trim()) {
      toast.error("Please write a short note for the tutor");
      return;
    }

    setIsSubmittingApply(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tuitionId: tuition?._id || tuition?.id || id,
          tuitionTitle: tuition?.title || "Tuition Session",
          tutorEmail: tuition?.tutorEmail || "",
          tutorName: tuition?.tutorName || "Mentor",
          studentEmail: currentEmail,
          studentName: session?.user?.name || cachedUser?.name || "Student",
          studentPhone: studentPhone.trim(),
          preferredSchedule: preferredSchedule.trim(),
          note: applicationNote.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data?.limitReached) {
          toast.error(data.error);
          router.push("/checkout?plan=student");
          return;
        }
        throw new Error(data?.error || "Failed to submit application");
      }

      setHasApplied(true);
      setIsApplyModalOpen(false);
      setStudentPhone("");
      setApplicationNote("");
      toast.success("Application submitted! The tutor can now review it in real time.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Could not submit application");
    } finally {
      setIsSubmittingApply(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmail) {
      toast.error("Please sign in as a student to submit a review");
      router.push("/sign-in");
      return;
    }
    if (!isStudent) {
      toast.error("Only student accounts can submit reviews");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please write your review feedback");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tuitionId: tuition?._id || tuition?.id || id,
          rating: ratingInput,
          comment: reviewComment.trim(),
          studentName: session?.user?.name || cachedUser?.name || "Student",
          studentEmail: currentEmail,
          studentImage: session?.user?.image || cachedUser?.image || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit review");
      }

      setReviewComment("");
      setRatingInput(5);
      toast.success("Thank you! Your review has been published.");
      await loadReviews(tuition?._id || tuition?.id || id);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Could not submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Sparkles className="w-8 h-8 text-[#0284C7] dark:text-[#0EA5E9] animate-spin mb-3" />
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
          Loading tuition details...
        </p>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="max-w-xl mx-auto min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-[#E0F2FE] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#38BDF8]/40 flex items-center justify-center text-[#0284C7] dark:text-[#38BDF8] mb-4">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#0B1320] dark:text-white">Tuition Not Found</h2>
        <p className="mt-2 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
          This tuition listing does not exist, has been removed, or is awaiting administrator verification.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-2.5 rounded-xl bg-[#0284C7] text-white text-xs font-bold shadow-md hover:bg-[#0369A1] transition-all cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const mentorName = tuition.tutorName || "Verified Mentor";
  const mentorEmail = tuition.tutorEmail || "mentor@mentorlagbe.com";
  const mentorInitials = mentorName
    .trim()
    .split(" ")
    .map((p: string) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "ML";
  const isOnlineMode =
    tuition.mode === "Online Batch" || (tuition.location || "").toLowerCase().includes("online");
  const postedDate = tuition.createdAt
    ? new Date(tuition.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 animate-in fade-in duration-300">
      {/* Top Back Navigation */}
      <Link
        href="/#tuitions"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Tuitions</span>
      </Link>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* =================================================================== */}
        {/* LEFT COLUMN: Banner, Title, Description, Student Reviews            */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Hero Banner Card */}
          <div className="relative w-full h-64 sm:h-[360px] rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#0284C7]/30 bg-[#07101E] shadow-[0_12px_32px_-8px_rgba(11,19,32,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {tuition.bannerImage ? (
              <Image
                src={tuition.bannerImage}
                alt={tuition.title || "Tuition Banner"}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#07101E] via-[#0D1D38] to-[#0284C7]/40 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-[#38BDF8]/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30 pointer-events-none" />

            {/* Top-left Location / Mode Pill */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-black/70 backdrop-blur-md text-white border border-white/15 shadow-md">
                {isOnlineMode ? (
                  <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                )}
                <span>
                  {isOnlineMode
                    ? "Online Batch"
                    : `In-Person: ${tuition.location || "Dhaka"}`}
                </span>
              </span>
            </div>

            {/* Top-right Share & Bookmark Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                title="Share tuition link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 hover:bg-[#0284C7] backdrop-blur-md text-white border border-white/15 transition-all cursor-pointer shadow-md"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {isStudent && (
                <button
                  type="button"
                  onClick={handleToggleBookmark}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark tuition"}
                  className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-md ${
                    isBookmarked
                      ? "bg-[#0284C7] text-white border-[#38BDF8]"
                      : "bg-black/70 hover:bg-[#0284C7] text-white border-white/15"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} />
                </button>
              )}
            </div>
          </div>

          {/* 2. Title & Meta Card */}
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/95 p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0284C7]/35">
                {tuition.subject || "Subject"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#F8FAFC] dark:bg-[#07101E] text-[#475569] dark:text-[#E2E8F0] border border-[#E2E8F0] dark:border-[#0284C7]/25">
                {tuition.classLevel || "All Levels"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight leading-snug">
              {tuition.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                <span>
                  Mentor: <strong className="text-[#0B1320] dark:text-white">{mentorName}</strong>
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                <span>
                  Schedule:{" "}
                  <strong className="text-[#0B1320] dark:text-white">
                    {tuition.schedule || "3 days / week"}
                  </strong>
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                <span>Posted: {postedDate}</span>
              </span>
            </div>
          </div>

          {/* 3. About This Tuition Card */}
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/95 p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-3">
            <h2 className="text-base font-bold text-[#0B1320] dark:text-white">
              About This Tuition
            </h2>
            <p className="text-sm text-[#475569] dark:text-[#E2E8F0]/85 leading-relaxed whitespace-pre-line">
              {tuition.description}
            </p>
          </div>

          {/* 4. Student Reviews & Feedback Card */}
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/95 p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-6">
            {/* Reviews Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
              <div>
                <h2 className="text-base font-bold text-[#0B1320] dark:text-white">
                  Student Reviews &amp; Feedback
                </h2>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Real experiences from tuition students.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#0B1320] dark:text-white">
                  {averageRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(averageRating)
                            ? "text-[#FFB800] fill-[#FFB800]"
                            : "text-[#CBD5E1] dark:text-[#334155]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Student Review Form */}
            {isStudent && (
              <form
                onSubmit={handleSubmitReview}
                className="rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/25 p-4 sm:p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0B1320] dark:text-white">
                    Leave a Review for this Tuition
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || ratingInput);
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRatingInput(star)}
                          aria-label={`Rate ${star} stars`}
                          className="p-0.5 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              active
                                ? "text-[#FFB800] fill-[#FFB800]"
                                : "text-[#CBD5E1] dark:text-[#475569]"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-1.5 text-xs font-mono font-bold text-[#0284C7] dark:text-[#38BDF8]">
                      {ratingInput}/5
                    </span>
                  </div>
                </div>

                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with the mentor, teaching clarity, and batch schedule..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B1930] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs sm:text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/60 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-60 active:scale-95"
                  >
                    {submittingReview ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            {loadingReviews ? (
              <div className="py-8 text-center text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#64748B] dark:text-[#94A3B8]">
                No reviews yet. {isStudent ? "Be the first student to share feedback above!" : "Students will be able to share feedback after their classes."}
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl bg-[#F8FAFC] dark:bg-[#07101E]/80 border border-[#E2E8F0] dark:border-[#0284C7]/20 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {rev.studentImage ? (
                          <Image
                            src={rev.studentImage}
                            alt={rev.studentName}
                            width={32}
                            height={32}
                            unoptimized
                            className="h-8 w-8 rounded-full object-cover border border-[#BAE6FD] dark:border-[#0284C7]/40"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0284C7] text-white font-bold text-xs">
                            {rev.studentName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-[#0B1320] dark:text-white">
                            {rev.studentName}
                          </p>
                          <p className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating
                                ? "text-[#FFB800] fill-[#FFB800]"
                                : "text-[#CBD5E1] dark:text-[#334155]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475569] dark:text-[#E2E8F0]/85 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Sticky Fee, Details Table, Mentor & Apply CTA         */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/30 bg-white dark:bg-[#0B1930]/95 p-6 shadow-[0_12px_32px_-8px_rgba(11,19,32,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
            {/* Monthly Tuition Fee Box */}
            <div className="rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/25 p-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block">
                MONTHLY TUITION FEE
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-3xl font-black font-mono text-[#0B1320] dark:text-white">
                  ৳{Number(tuition.monthlyFee || 0).toLocaleString()}
                </span>
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">/ month</span>
              </div>
            </div>

            {/* Structured Key-Value Details */}
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#0284C7]/20 text-xs">
              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748B] dark:text-[#94A3B8]">Subject</span>
                <span className="font-bold text-[#0B1320] dark:text-white text-right">
                  {tuition.subject || "—"}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748B] dark:text-[#94A3B8]">Class Level</span>
                <span className="font-bold text-[#0B1320] dark:text-white text-right">
                  {tuition.classLevel || "—"}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748B] dark:text-[#94A3B8]">Delivery Mode</span>
                <span className="font-bold text-[#0284C7] dark:text-[#38BDF8] text-right">
                  {tuition.mode || "Offline"}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748B] dark:text-[#94A3B8]">Location</span>
                <span className="font-bold text-[#0B1320] dark:text-white text-right">
                  {tuition.location || "Online"}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748B] dark:text-[#94A3B8]">Weekly Classes</span>
                <span className="font-bold text-[#0B1320] dark:text-white text-right">
                  {tuition.schedule || "3 days / week"}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-[#64748B] dark:text-[#94A3B8]">Status</span>
                <div>
                  {isRejected ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40">
                      Rejected
                    </span>
                  ) : isPending ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/40">
                      Pending
                    </span>
                  ) : isPostClosed ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#0284C7]/25">
                      Closed
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/40">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tuition Mentor Block */}
            <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#0284C7]/20 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block">
                TUITION MENTOR
              </span>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0284C7] text-white font-black text-xs shadow-sm">
                  {mentorInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-[#0B1320] dark:text-white truncate">
                    {mentorName}
                  </p>
                  <a
                    href={`mailto:${mentorEmail}`}
                    className="inline-flex items-center gap-1 text-[11px] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#38BDF8] truncate max-w-full"
                  >
                    <Mail className="w-3 h-3 shrink-0" />
                    <span className="truncate">{mentorEmail}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Role-Aware Action Area */}
            {isOwner ? (
              <Link
                href="/dashboard/my-tuitions"
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Manage in My Tuitions</span>
              </Link>
            ) : isTutor ? (
              <div className="w-full py-3 px-4 rounded-xl text-center text-xs font-semibold bg-[#FEF3C7]/60 dark:bg-[#281804]/60 text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/30">
                Only students can apply for tuitions.
              </div>
            ) : isAdmin ? (
              <Link
                href="/dashboard/my-tuitions"
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#4F46E5] dark:text-[#818CF8] border border-[#C7D2FE] dark:border-[#6366F1]/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Manage in Admin Moderation</span>
              </Link>
            ) : (
              <button
                type="button"
                disabled={isApplyLocked || hasApplied}
                onClick={handleApply}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer ${
                  hasApplied
                    ? "bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/40 cursor-default"
                    : isRejected
                    ? "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 cursor-not-allowed opacity-85"
                    : isPending
                    ? "bg-[#FEF3C7] dark:bg-[#281804] text-[#B45309] dark:text-[#FFB800] border border-[#FDE68A] cursor-not-allowed opacity-75"
                    : isPostClosed
                    ? "bg-[#E2E8F0] dark:bg-[#102547] text-[#64748B] dark:text-[#94A3B8] cursor-not-allowed opacity-60"
                    : "bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white hover:shadow-lg"
                }`}
              >
                {hasApplied
                  ? "✓ Application Submitted"
                  : isRejected
                  ? "Post Rejected"
                  : isPending
                  ? "Pending Approval"
                  : isPostClosed
                  ? "Tuition Closed"
                  : "Apply for Tuition"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#0B1930] border border-[#E2E8F0] dark:border-[#0284C7]/40 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#0B1320] dark:text-white">
                  Apply for Tuition
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5 line-clamp-1">
                  {tuition?.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0B1320] dark:text-[#94A3B8] dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] mb-1.5">
                  Contact Phone Number <span className="text-[#0284C7]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="+880-17XX-XXXXXX"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-sm text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] mb-1.5">
                  Preferred Schedule
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={preferredSchedule}
                    onChange={(e) => setPreferredSchedule(e.target.value)}
                    placeholder="e.g. Sun, Tue, Thu at 5:00 PM"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-sm text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] mb-1.5">
                  Message to Tutor <span className="text-[#0284C7]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={applicationNote}
                  onChange={(e) => setApplicationNote(e.target.value)}
                  placeholder="Briefly share your class level, learning goals, and preferred schedule..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/35 text-sm text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#475569] dark:text-[#94A3B8] hover:bg-[#F0F7FF] dark:hover:bg-[#102547] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingApply}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSubmittingApply ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
