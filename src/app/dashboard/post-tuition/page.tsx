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
    const userEmail = session?.user?.email || "tutor@mentorlagbe.com";
    const userName = session?.user?.name || "Verified Tutor";
    const resolvedLocation = isOfflineOrHybrid ? location.trim() : "Online (Zoom / Meet)";

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
      approvalStatus: "approved",
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

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#160307] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs font-semibold text-[#5C494C] dark:text-[#BFA5AA] hover:text-[#D91E48] dark:hover:text-[#FF1E40] transition-all cursor-pointer shadow-sm"
            title="Reset all inputs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Form</span>
          </button>

          <Link
            href="/dashboard/my-tuitions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5ECEC] dark:bg-[#1E0307] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs font-bold text-[#180C0E] dark:text-white hover:border-[#D91E48] dark:hover:border-[#FF1E40] transition-all cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
            <span>View My Tuitions</span>
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#160307]/90 p-6 sm:p-8 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Tuition Title */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
              <span>Tuition Title / Program Name</span>
              <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master HSC Higher Mathematics & Calculus"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none focus:ring-1 focus:ring-[#D91E48] dark:focus:ring-[#FF1E40] transition-colors"
              />
            </div>
          </div>

          {/* Grid: Subject & Class Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Subject Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
                <span>Subject Discipline</span>
                <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors cursor-pointer"
                >
                  {SUBJECT_OPTIONS.map((sub) => (
                    <option key={sub} value={sub} className="bg-white dark:bg-[#160307] text-[#180C0E] dark:text-white">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Class / Grade */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
                <span>Target Class Level</span>
                <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors cursor-pointer"
                >
                  {CLASS_LEVEL_OPTIONS.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-white dark:bg-[#160307] text-[#180C0E] dark:text-white">
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mode of Teaching (Radio Buttons) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
              <span>Teaching Mode</span>
              <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["Online Batch", "Offline Tuition", "Hybrid Model"] as const).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setMode(item)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    mode === item
                      ? "bg-[#D91E48] text-white border-[#D91E48] shadow-sm dark:bg-gradient-to-r dark:from-[#E11D48] dark:to-[#FF1E40]"
                      : "bg-[#FCF9F8] dark:bg-[#0D0204] text-[#5C494C] dark:text-[#BFA5AA] border-[#EADCDD] dark:border-[#E11D48]/25 hover:border-[#D91E48]"
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
                <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
                  <span>Location / District</span>
                  <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
                  <input
                    type="text"
                    required={isOfflineOrHybrid}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Weekly Frequency (Dropdown) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
                <span>Days Per Week / Frequency</span>
                <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA] pointer-events-none" />
                <select
                  required
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors cursor-pointer"
                >
                  {WEEKLY_FREQUENCY_OPTIONS.map((freq) => (
                    <option key={freq} value={freq} className="bg-white dark:bg-[#160307] text-[#180C0E] dark:text-white">
                      {freq}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Monthly Fee */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
                <span>Monthly Fee (BDT)</span>
                <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
                <input
                  type="number"
                  required
                  min="500"
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(e.target.value)}
                  placeholder="6000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Banner Image Input Field (ImgBB Ready) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span>Banner Image</span>
                <span className="text-[10px] font-mono text-[#8C7679] dark:text-[#BFA5AA]">(Optional)</span>
              </div>
              <span className="text-[11px] font-mono text-[#D91E48] dark:text-[#FF1E40]">
                ImgBB cloud ready
              </span>
            </label>

            {bannerImage ? (
              <div className="relative rounded-xl overflow-hidden border border-[#F2B8C4] dark:border-[#E11D48]/40 bg-[#FCF9F8] dark:bg-[#0D0204] p-3 flex items-center gap-4">
                <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0 border border-[#EADCDD] dark:border-[#E11D48]/20">
                  <Image
                    src={bannerImage}
                    alt="Tuition Banner Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#180C0E] dark:text-white truncate">
                    Banner Attached
                  </p>
                  <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA]">
                    Preview ready for public tuition listing
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBannerImage("")}
                  className="p-1.5 rounded-lg text-[#D91E48] hover:bg-[#FDECEF] dark:hover:bg-[#2A0612] transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-[#EADCDD] dark:border-[#E11D48]/35 bg-[#FCF9F8] dark:bg-[#0D0204] hover:border-[#D91E48] dark:hover:border-[#FF1E40] transition-colors cursor-pointer group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 group-hover:scale-105 transition-transform">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#180C0E] dark:text-white group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                      Upload Image (ImgBB)
                    </span>
                    <p className="text-[11px] text-[#8C7679] dark:text-[#BFA5AA]">
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
              <label className="text-xs font-semibold text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
                <span>Tuition Description</span>
                <span className="text-[#D91E48] dark:text-[#FF1E40] font-bold">*</span>
              </label>
              <span
                className={`text-[11px] font-mono font-bold transition-colors ${
                  isDescValid
                    ? "text-[#059669] dark:text-[#10B981]"
                    : "text-[#D91E48] dark:text-[#FF1E40]"
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
              className={`w-full px-4 py-3 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:outline-none transition-colors resize-none leading-relaxed ${
                !isDescValid && descLength > 0
                  ? "border-[#D91E48] dark:border-[#FF1E40]/70"
                  : "border-[#EADCDD] dark:border-[#E11D48]/30 focus:border-[#D91E48] dark:focus:border-[#FF1E40]"
              }`}
            />
            {!isDescValid && descLength > 0 && (
              <p className="text-[11px] text-[#D91E48] dark:text-[#FF1E40] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>Please write at least {50 - descLength} more characters.</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EADCDD] dark:border-[#E11D48]/20">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#5C494C] dark:text-[#BFA5AA] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
            >
              Clear
            </button>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5C494C] dark:text-[#BFA5AA] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !isDescValid || !title.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.25)] hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
