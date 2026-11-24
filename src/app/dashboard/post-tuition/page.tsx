"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { 
  BookOpen, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  Loader2,
  GraduationCap,
  Upload,
  X,
  AlertCircle,
  RotateCcw
} from "lucide-react";

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Programming",
  "IELTS",
  "Accounting"
];

const CLASS_LEVEL_OPTIONS = [
  "Class 9-10 (SSC)",
  "Class 11-12 & Admission (HSC)",
  "Cambridge O / A-Level",
  "University & Beginners",
  "IELTS Candidates",
  "Professional & Skills"
];

const WEEKLY_FREQUENCY_OPTIONS = [
  "1 day / week",
  "2 days / week",
  "3 days / week",
  "4 days / week",
  "5 days / week",
  "6 days / week",
  "7 days / week"
];

export default function PostTuitionPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [classLevel, setClassLevel] = useState(CLASS_LEVEL_OPTIONS[1]);
  const [mode, setMode] = useState<"Online Batch" | "Offline Tuition" | "Hybrid Model">("Offline Tuition");
  const [location, setLocation] = useState("Dhanmondi, Dhaka");
  const [schedule, setSchedule] = useState("3 days / week");
  const [monthlyFee, setMonthlyFee] = useState("6000");
  const [bannerImage, setBannerImage] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTitle("");
    setSubject(SUBJECT_OPTIONS[0]);
    setClassLevel(CLASS_LEVEL_OPTIONS[1]);
    setMode("Offline Tuition");
    setLocation("Dhanmondi, Dhaka");
    setSchedule("3 days / week");
    setMonthlyFee("6000");
    setBannerImage("");
    setDescription("");
  };

  // Reset form when page mounts or if returning from a completed submission
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("mentorlagbe_post_submitted") === "true") {
        resetForm();
        sessionStorage.removeItem("mentorlagbe_post_submitted");
      }
    }
  }, []);

  const isOfflineOrHybrid = mode === "Offline Tuition" || mode === "Hybrid Model";
  const descLength = description.trim().length;
  const isDescValid = descLength >= 50;

  // Handle mock image upload for ImgBB readiness
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image file size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
        toast.success("Banner image loaded! (ImgBB ready)", { icon: "🖼️" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanSubject = subject.trim();
    const cleanClass = classLevel.trim();

    // Mandatory validations
    if (!cleanTitle) {
      toast.error("Please enter a tuition title / program name");
      return;
    }
    if (isOfflineOrHybrid && !location.trim()) {
      toast.error("Please provide a location/district for offline or hybrid mode");
      return;
    }
    if (!monthlyFee || Number(monthlyFee) <= 0) {
      toast.error("Please provide a valid monthly fee");
      return;
    }
    if (!isDescValid) {
      toast.error("Tuition description must be at least 50 characters");
      return;
    }

    setIsSubmitting(true);
    const cachedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") : null;
    const userEmail = session?.user?.email || cachedUser?.email || "";
    const userName = session?.user?.name || cachedUser?.name || "Verified Tutor";
    const userPlan = cachedUser?.plan || (session?.user as any)?.plan || "free";
    const resolvedLocation = isOfflineOrHybrid ? location.trim() : "Online (Zoom / Meet)";

    // 0. Free Tier Limit Check (Max 2 tuitions for free tutors, unlimited for Pro)
    if (userPlan !== "pro" && (session?.user as any)?.role !== "admin") {
      try {
        const usage = await fetch(`/api/user/usage?email=${encodeURIComponent(userEmail)}`).then((r) => r.json());
        if (usage && usage.canPost === false) {
          setIsSubmitting(false);
          toast.error(
            `Free limit reached: You have created ${usage.tuitionsCount} of ${usage.tutorLimit} free tuition posts. Please upgrade to Pro for unlimited postings!`,
            { icon: "💎", duration: 5000 }
          );
          router.push("/checkout?plan=tutor");
          return;
        }
      } catch {
        // Fallback check against local records if server is unreachable
        const userKey = `mentorlagbe_tuitions_${userEmail}`;
        const localExisting: any[] = JSON.parse(localStorage.getItem(userKey) || "[]");
        if (localExisting.length >= 2) {
          setIsSubmitting(false);
          toast.error("Free limit reached: Free tutors can post up to 2 tuitions. Redirecting to upgrade to Pro...", {
            icon: "💎",
            duration: 5000,
          });
          router.push("/checkout?plan=tutor");
          return;
        }
      }
    }

    // 1. Strict Duplicate Check on Local Data
    const userKey = `mentorlagbe_tuitions_${userEmail}`;
    const localExisting: any[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const isLocalDuplicate = localExisting.some((item) => {
      const itemTitle = (item.title || "").trim().toLowerCase();
      const itemSub = (item.subject || "").trim().toLowerCase();
      const itemCls = (item.classLevel || "").trim().toLowerCase();
      return (
        itemTitle === cleanTitle.toLowerCase() &&
        itemSub === cleanSubject.toLowerCase() &&
        itemCls === cleanClass.toLowerCase()
      );
    });

    if (isLocalDuplicate) {
      setIsSubmitting(false);
      toast.error("Duplicate post blocked: You already have an active tuition listing with this exact Title, Subject, and Class Level.", {
        icon: "⚠️",
        duration: 5000,
      });
      return;
    }

    // 2. Strict Duplicate Check on Server Data
    try {
      const serverItems = await apiFetch<any[]>(`/tuitions?email=${encodeURIComponent(userEmail)}`);
      if (Array.isArray(serverItems)) {
        const isServerDuplicate = serverItems.some((item) => {
          const itemTitle = (item.title || "").trim().toLowerCase();
          const itemSub = (item.subject || "").trim().toLowerCase();
          const itemCls = (item.classLevel || "").trim().toLowerCase();
          return (
            itemTitle === cleanTitle.toLowerCase() &&
            itemSub === cleanSubject.toLowerCase() &&
            itemCls === cleanClass.toLowerCase()
          );
        });

        if (isServerDuplicate) {
          setIsSubmitting(false);
          toast.error("Duplicate post blocked: An identical listing already exists on the server. Please edit the existing post instead.", {
            icon: "⚠️",
            duration: 5000,
          });
          return;
        }
      }
    } catch {
      // If server check fails due to offline mode, local check still protects integrity
    }

    const newTuitionData = {
      id: `tuition_${Date.now()}`,
      title: cleanTitle,
      subject: cleanSubject,
      classLevel: cleanClass,
      mode,
      location: resolvedLocation,
      schedule,
      monthlyFee: Number(monthlyFee),
      bannerImage,
      description: description.trim(),
      tutorEmail: userEmail,
      tutorName: userName,
      approvalStatus: "pending",
      isActive: true,
      applicantsCount: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      // Send to backend API
      const res = await apiFetch<any>("/tuitions", {
        method: "POST",
        body: JSON.stringify(newTuitionData),
      });

      if (res && (res._id || res.id || res.insertedId)) {
        newTuitionData.id = res._id || res.id || res.insertedId;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Notice: Saved locally";
      if (msg.includes("limit") || msg.includes("LIMIT_REACHED")) {
        setIsSubmitting(false);
        toast.error("Free limit reached: You have reached the maximum 2 free tuition posts. Redirecting to upgrade to Pro...", {
          icon: "💎",
          duration: 5000,
        });
        router.push("/checkout?plan=tutor");
        return;
      }
      if (msg.includes("duplicate") || msg.includes("Duplicate") || msg.includes("already exists")) {
        setIsSubmitting(false);
        toast.error(msg, { icon: "⚠️" });
        return;
      }
      console.warn("Backend save notice:", err);
    }

    try {
      // Persist in local storage for this tutor & set has_real_tuitions flag
      const updated = [newTuitionData, ...localExisting];
      localStorage.setItem(userKey, JSON.stringify(updated));
      localStorage.setItem("mentorlagbe_has_real_tuitions", "true");

      // Mark session storage so back-button navigation clears form
      sessionStorage.setItem("mentorlagbe_post_submitted", "true");

      // Immediately reset form state so fields are clean
      resetForm();

      toast.success("Tuition post created successfully! Your live listing is ready.", {
        icon: "🎉",
      });

      // Use replace to prevent back-button loops into populated form
      router.replace("/dashboard/my-tuitions");
      router.refresh();
    } catch {
      resetForm();
      toast.success("Tuition post created!");
      router.replace("/dashboard/my-tuitions");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#0EA5E9] mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TUTOR PORTAL // CREATE LISTING</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight mt-2">
            Post New Tuition
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Create a new tuition offering or mentorship batch to start receiving applications.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B1930] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-semibold text-[#475569] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#0EA5E9] transition-all cursor-pointer shadow-sm"
            title="Reset all inputs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Form</span>
          </button>

          <Link
            href="/dashboard/my-tuitions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0F7FF] dark:bg-[#0D1D38] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-xs font-bold text-[#0B1320] dark:text-white hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-all cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
            <span>View My Tuitions</span>
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-6 sm:p-8 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Tuition Title */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
              <span>Tuition Title / Program Name</span>
              <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master HSC Higher Mathematics & Calculus"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D0204] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/50 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0284C7] dark:focus:ring-[#0EA5E9] transition-colors"
              />
            </div>
          </div>

          {/* Grid: Subject & Class Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Subject Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
                <span>Subject Discipline</span>
                <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D0204] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none transition-colors cursor-pointer"
                >
                  {SUBJECT_OPTIONS.map((sub) => (
                    <option key={sub} value={sub} className="bg-white dark:bg-[#0B1930] text-[#0B1320] dark:text-white">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Class / Grade */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
                <span>Target Class Level</span>
                <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D0204] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none transition-colors cursor-pointer"
                >
                  {CLASS_LEVEL_OPTIONS.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-white dark:bg-[#0B1930] text-[#0B1320] dark:text-white">
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mode of Teaching (Radio Buttons) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
              <span>Teaching Mode</span>
              <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["Online Batch", "Offline Tuition", "Hybrid Model"] as const).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setMode(item)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    mode === item
                      ? "bg-[#0284C7] text-white border-[#0284C7] shadow-sm dark:bg-gradient-to-r dark:from-[#0284C7] dark:to-[#0EA5E9]"
                      : "bg-[#F8FAFC] dark:bg-[#0D0204] text-[#475569] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#0284C7]/25 hover:border-[#0284C7]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Location, Schedule & Monthly Fee */}
          <div className={`grid grid-cols-1 ${isOfflineOrHybrid ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-5 transition-all`}>
            {/* Conditional Location (Only for Offline or Hybrid) */}
            {isOfflineOrHybrid && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
                  <span>Location / District</span>
                  <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                  <input
                    type="text"
                    required={isOfflineOrHybrid}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D0204] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/50 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Weekly Frequency (Dropdown) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
                <span>Days Per Week / Frequency</span>
                <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8] pointer-events-none" />
                <select
                  required
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D0204] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none transition-colors cursor-pointer"
                >
                  {WEEKLY_FREQUENCY_OPTIONS.map((freq) => (
                    <option key={freq} value={freq} className="bg-white dark:bg-[#0B1930] text-[#0B1320] dark:text-white">
                      {freq}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Monthly Fee */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
                <span>Monthly Fee (BDT)</span>
                <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                <input
                  type="number"
                  required
                  min="500"
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(e.target.value)}
                  placeholder="6000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D0204] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/50 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Banner Image Input Field (ImgBB Ready) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span>Banner Image</span>
                <span className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8]">(Optional)</span>
              </div>
              <span className="text-[11px] font-mono text-[#0284C7] dark:text-[#0EA5E9]">
                ImgBB cloud ready
              </span>
            </label>

            {bannerImage ? (
              <div className="relative rounded-xl overflow-hidden border border-[#BAE6FD] dark:border-[#0284C7]/40 bg-[#F8FAFC] dark:bg-[#0D0204] p-3 flex items-center gap-4">
                <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0 border border-[#E2E8F0] dark:border-[#0284C7]/20">
                  <Image
                    src={bannerImage}
                    alt="Tuition Banner Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0B1320] dark:text-white truncate">
                    Banner Attached
                  </p>
                  <p className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                    Preview ready for public tuition listing
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBannerImage("")}
                  className="p-1.5 rounded-lg text-[#0284C7] hover:bg-[#E0F2FE] dark:hover:bg-[#2A0612] transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-[#E2E8F0] dark:border-[#0284C7]/35 bg-[#F8FAFC] dark:bg-[#0D0204] hover:border-[#0284C7] dark:hover:border-[#0EA5E9] transition-colors cursor-pointer group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E0F2FE] dark:bg-[#102547] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0284C7]/30 group-hover:scale-105 transition-transform">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors">
                      Upload Image (ImgBB)
                    </span>
                    <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      PNG, JPG, or WEBP up to 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Description & Syllabus details with min 50 characters counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
                <span>Tuition Description</span>
                <span className="text-[#0284C7] dark:text-[#0EA5E9] font-bold">*</span>
              </label>
              <span
                className={`text-[11px] font-mono font-bold transition-colors ${
                  isDescValid
                    ? "text-[#059669] dark:text-[#10B981]"
                    : "text-[#0284C7] dark:text-[#0EA5E9]"
                }`}
              >
                {descLength} / min 50 chars
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what students will learn, your teaching methodology, prerequisites, and expected outcomes..."
              className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0D0204] border text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/50 focus:outline-none transition-colors resize-none leading-relaxed ${
                !isDescValid && descLength > 0
                  ? "border-[#0284C7] dark:border-[#0EA5E9]/70"
                  : "border-[#E2E8F0] dark:border-[#0284C7]/30 focus:border-[#0284C7] dark:focus:border-[#0EA5E9]"
              }`}
            />
            {!isDescValid && descLength > 0 && (
              <p className="text-[11px] text-[#0284C7] dark:text-[#0EA5E9] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>Please write at least {50 - descLength} more characters.</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E2E8F0] dark:border-[#0284C7]/20">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#475569] dark:text-[#94A3B8] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
            >
              Clear
            </button>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#475569] dark:text-[#94A3B8] hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] transition-all cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !isDescValid || !title.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-xs shadow-[0_4px_16px_rgba(2, 132, 199,0.25)] hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing Post...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Tuition Post</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
