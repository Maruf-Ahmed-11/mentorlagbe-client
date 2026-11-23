"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { 
  BookOpen, 
  Plus, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Trash2, 
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Eye,
  Pencil,
  Power,
  PowerOff,
  Globe,
  GraduationCap,
  X,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Loader2,
  DollarSign,
  ShieldCheck,
  Check,
  RotateCcw
} from "lucide-react";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface TuitionItem {
  id: string;
  _id?: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  schedule: string;
  monthlyFee: number;
  bannerImage?: string;
  description: string;
  applicantsCount?: number;
  approvalStatus: ApprovalStatus;
  isActive: boolean;
  createdAt?: string;
  adminVerifiedAt?: string;
  isDemo?: boolean;
}

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

export default function MyTuitionsPage() {
  const { data: session } = authClient.useSession();
  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // User role checking
  const user = session?.user;
  const userEmail = user?.email || "tutor@mentorlagbe.com";
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const isAdmin = userRole === "admin";

  // Admin moderation test toggle (accessible to admin or for quick interactive testing)
  const [showAdminControls, setShowAdminControls] = useState(isAdmin);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTuition, setEditingTuition] = useState<TuitionItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubject, setEditSubject] = useState(SUBJECT_OPTIONS[0]);
  const [editClassLevel, setEditClassLevel] = useState(CLASS_LEVEL_OPTIONS[0]);
  const [editMode, setEditMode] = useState("Online Batch");
  const [editLocation, setEditLocation] = useState("");
  const [editMonthlyFee, setEditMonthlyFee] = useState("");
  const [editSchedule, setEditSchedule] = useState(WEEKLY_FREQUENCY_OPTIONS[2]);
  const [editBannerImage, setEditBannerImage] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTuition, setDeletingTuition] = useState<TuitionItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load Tuitions on Mount & Sanitize Legacy "approved" Statuses to "pending"
  useEffect(() => {
    async function loadTuitions() {
      setIsLoading(true);
      try {
        const userKey = `mentorlagbe_tuitions_${userEmail}`;
        let storedLocally: any[] = JSON.parse(localStorage.getItem(userKey) || "[]");
        const hasRealFlag = localStorage.getItem("mentorlagbe_has_real_tuitions") === "true";

        // CRITICAL FIX: If posts were stored with legacy hardcoded "approved" status before admin review,
        // sanitize them to "pending" as requested!
        let storageUpdated = false;
        storedLocally = storedLocally.map((item) => {
          if (item.approvalStatus === "approved" && !item.adminVerifiedAt) {
            storageUpdated = true;
            return { ...item, approvalStatus: "pending" };
          }
          return item;
        });
        if (storageUpdated) {
          localStorage.setItem(userKey, JSON.stringify(storedLocally));
        }

        let backendTuitions: any[] = [];
        try {
          const emailQuery = userEmail ? `?email=${encodeURIComponent(userEmail)}` : "";
          const res = await apiFetch<any[]>(`/tuitions${emailQuery}`);
          if (Array.isArray(res)) {
            backendTuitions = res;
          }
        } catch {
          // Backend network fallback
        }

        const combinedMap = new Map<string, TuitionItem>();

        // Add backend items
        backendTuitions.forEach((item) => {
          const id = item._id || item.id || `b-${Date.now()}`;
          // Ensure posts not explicitly verified by admin resolve to "pending"
          const resolvedStatus: ApprovalStatus = item.adminVerifiedAt
            ? (item.approvalStatus as ApprovalStatus)
            : item.approvalStatus === "rejected"
            ? "rejected"
            : "pending";

          combinedMap.set(id, {
            id,
            _id: item._id,
            title: item.title,
            subject: item.subject,
            classLevel: item.classLevel,
            mode: item.mode || "Online Batch",
            location: item.location || (item.mode === "Online Batch" ? "Online / Remote" : "Dhaka"),
            schedule: item.schedule || item.daysPerWeek ? `${item.daysPerWeek} days / week` : "3 days / week",
            monthlyFee: Number(item.monthlyFee || 0),
            bannerImage: item.bannerImage || "",
            description: item.description || "",
            approvalStatus: resolvedStatus,
            adminVerifiedAt: item.adminVerifiedAt,
            isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
            isDemo: false,
          });
        });

        // Add local items
        storedLocally.forEach((item) => {
          const id = item.id || item._id || `loc-${Date.now()}`;
          const resolvedStatus: ApprovalStatus = item.adminVerifiedAt
            ? (item.approvalStatus as ApprovalStatus)
            : item.approvalStatus === "rejected"
            ? "rejected"
            : "pending";

          if (!combinedMap.has(id)) {
            combinedMap.set(id, {
              id,
              _id: item._id,
              title: item.title,
              subject: item.subject,
              classLevel: item.classLevel,
              mode: item.mode || "Online Batch",
              location: item.location || "Online",
              schedule: item.schedule || "3 days / week",
              monthlyFee: Number(item.monthlyFee || 0),
              bannerImage: item.bannerImage || "",
              description: item.description || "",
              approvalStatus: resolvedStatus,
              adminVerifiedAt: item.adminVerifiedAt,
              isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
              isDemo: false,
            });
          }
        });

        const realTuitions = Array.from(combinedMap.values());
        setTuitions(realTuitions);
      } catch {
        setTuitions([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadTuitions();
  }, [userEmail]);

  // 1. One-Click Toggle Active Status (Tutor Controlled)
  const handleToggleActive = async (id: string) => {
    const target = tuitions.find((t) => t.id === id);
    if (!target) return;

    if (target.approvalStatus === "rejected") {
      toast.error("Cannot activate a rejected tuition. Please edit details and request re-review.", {
        icon: "🚫",
      });
      return;
    }

    const nextActiveState = !target.isActive;

    // Optimistic UI update
    setTuitions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: nextActiveState } : t))
    );

    // Update localStorage
    const userKey = `mentorlagbe_tuitions_${userEmail}`;
    const storedLocally: any[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const updatedLocally = storedLocally.map((item) =>
      item.id === id || item._id === id ? { ...item, isActive: nextActiveState } : item
    );
    localStorage.setItem(userKey, JSON.stringify(updatedLocally));

    // Update backend API
    try {
      await apiFetch(`/tuitions/${target._id || id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: nextActiveState }),
      });
    } catch {
      // Handled silently
    }

    toast.success(
      nextActiveState
        ? "Listing is now Active (Students can apply)"
        : "Listing is now Closed (Students cannot apply)",
      {
        icon: nextActiveState ? "🟢" : "🔒",
      }
    );
  };

  // 2. Admin Approval & Rejection Handler
  const handleUpdateApproval = async (id: string, newStatus: ApprovalStatus) => {
    const target = tuitions.find((t) => t.id === id);
    if (!target) return;

    const verifiedTimestamp = new Date().toISOString();

    // Optimistic UI update
    setTuitions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, approvalStatus: newStatus, adminVerifiedAt: verifiedTimestamp } : t
      )
    );

    // Update localStorage
    const userKey = `mentorlagbe_tuitions_${userEmail}`;
    const storedLocally: any[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const updatedLocally = storedLocally.map((item) =>
      item.id === id || item._id === id
        ? { ...item, approvalStatus: newStatus, adminVerifiedAt: verifiedTimestamp }
        : item
    );
    localStorage.setItem(userKey, JSON.stringify(updatedLocally));

    // Update backend API
    try {
      await apiFetch(`/tuitions/${target._id || id}`, {
        method: "PATCH",
        body: JSON.stringify({
          approvalStatus: newStatus,
          adminVerifiedAt: verifiedTimestamp,
        }),
      });
    } catch (err) {
      console.warn("Backend approval update notice:", err);
    }

    if (newStatus === "approved") {
      toast.success(`Tuition approved! Status is now Approved (Green).`, {
        icon: "✅",
      });
    } else if (newStatus === "rejected") {
      toast.error(`Tuition rejected! Status is now Rejected (Red).`, {
        icon: "🚫",
      });
    } else {
      toast.success("Tuition status reset to Pending (Amber).", {
        icon: "⏳",
      });
    }
  };

  // 3. Open Edit Modal
  const handleOpenEditModal = (tuition: TuitionItem) => {
    setEditingTuition(tuition);
    setEditTitle(tuition.title);
    setEditSubject(tuition.subject);
    setEditClassLevel(tuition.classLevel);
    setEditMode(tuition.mode);
    setEditLocation(tuition.location);
    setEditMonthlyFee(String(tuition.monthlyFee));
    setEditSchedule(tuition.schedule || WEEKLY_FREQUENCY_OPTIONS[2]);
    setEditBannerImage(tuition.bannerImage || "");
    setEditDescription(tuition.description);
    setIsEditModalOpen(true);
  };

  // Save Edit Changes
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTuition) return;

    if (!editTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (editDescription.trim().length < 50) {
      toast.error("Description must be at least 50 characters");
      return;
    }

    setIsSavingEdit(true);

    const updatedData: Partial<TuitionItem> = {
      title: editTitle.trim(),
      subject: editSubject,
      classLevel: editClassLevel,
      mode: editMode,
      location: editMode === "Online Batch" ? "Online / Remote" : editLocation.trim(),
      monthlyFee: Number(editMonthlyFee) || 0,
      schedule: editSchedule,
      bannerImage: editBannerImage,
      description: editDescription.trim(),
      // Editing resets a rejected post back to pending for re-review
      approvalStatus: editingTuition.approvalStatus === "rejected" ? "pending" : editingTuition.approvalStatus,
    };

    // Update UI state
    setTuitions((prev) =>
      prev.map((t) => (t.id === editingTuition.id ? { ...t, ...updatedData } : t))
    );

    // Update localStorage
    const userKey = `mentorlagbe_tuitions_${userEmail}`;
    const storedLocally: any[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const updatedLocal = storedLocally.map((item) =>
      item.id === editingTuition.id || item._id === editingTuition._id
        ? { ...item, ...updatedData }
        : item
    );
    localStorage.setItem(userKey, JSON.stringify(updatedLocal));

    // Update backend API
    try {
      await apiFetch(`/tuitions/${editingTuition._id || editingTuition.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
      });
    } catch {
      // Local sync persists
    }

    setIsSavingEdit(false);
    setIsEditModalOpen(false);
    setEditingTuition(null);
    toast.success("Tuition listing updated successfully!", { icon: "✨" });
  };

  // 4. Open Delete Confirmation Modal
  const handleOpenDeleteModal = (tuition: TuitionItem) => {
    setDeletingTuition(tuition);
    setIsDeleteModalOpen(true);
  };

  // Confirm Permanent Deletion
  const handleConfirmDelete = async () => {
    if (!deletingTuition) return;
    setIsDeleting(true);

    try {
      await apiFetch(`/tuitions/${deletingTuition._id || deletingTuition.id}`, {
        method: "DELETE",
      });
    } catch {
      // Local sync persists
    }

    // Remove from state
    setTuitions((prev) => prev.filter((t) => t.id !== deletingTuition.id));

    // Remove from localStorage
    const userKey = `mentorlagbe_tuitions_${userEmail}`;
    const storedLocally: any[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const filteredLocal = storedLocally.filter(
      (item) => item.id !== deletingTuition.id && item._id !== deletingTuition._id
    );
    localStorage.setItem(userKey, JSON.stringify(filteredLocal));

    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeletingTuition(null);
    toast.success("Tuition post permanently removed", { icon: "🗑️" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
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
              <span>TUTOR WORKSPACE // COURSE MANAGEMENT</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight mt-2">
            My Tuitions
          </h2>
          <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
            Manage your created tuition listings, toggle availability, or make updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Admin Moderation Mode Toggle */}
          <button
            type="button"
            onClick={() => setShowAdminControls(!showAdminControls)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer shadow-xs ${
              showAdminControls
                ? "bg-[#D91E48] text-white border-[#D91E48] shadow-sm"
                : "bg-white dark:bg-[#160307] text-[#8C7679] dark:text-[#BFA5AA] border-[#EADCDD] dark:border-[#E11D48]/30 hover:border-[#D91E48]"
            }`}
            title="Toggle Admin Moderation Controls"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{showAdminControls ? "Admin Controls: On" : "Admin Moderation Tools"}</span>
          </button>

          <Link
            href="/dashboard/post-tuition"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.25)] dark:shadow-[0_0_20px_rgba(225,29,72,0.5)] transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Tuition</span>
          </Link>
        </div>
      </div>

      {/* Admin Notice Bar when Moderation Mode is Active */}
      {showAdminControls && (
        <div className="rounded-2xl p-4 bg-[#FDECEF] dark:bg-[#2A060C] border border-[#F2B8C4] dark:border-[#E11D48]/40 flex items-center justify-between text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#D91E48] dark:text-[#FF1E40]" />
            <span className="font-bold text-[#180C0E] dark:text-white">
              Admin Moderation Tools Active:
            </span>
            <span className="text-[#5C494C] dark:text-[#BFA5AA]">
              You can click <b>Approve</b> or <b>Reject</b> on any listing to test real-time approval status updates.
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D91E48] dark:text-[#FF1E40] bg-white dark:bg-[#160307] px-2 py-0.5 rounded-full border border-[#F2B8C4] dark:border-[#E11D48]/30">
            ADMIN SIMULATOR
          </span>
        </div>
      )}

      {/* Main Table Container */}
      <div className="rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#140204]/90 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
        
        {isLoading ? (
          <div className="p-16 text-center">
            <Sparkles className="w-8 h-8 text-[#D91E48] dark:text-[#FF1E40] animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Loading your tuition listings...
            </p>
          </div>
        ) : tuitions.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-[#8C7679] mx-auto opacity-70" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#180C0E] dark:text-white">
                No tuitions created yet
              </h3>
              <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] max-w-sm mx-auto">
                Post your first tuition course to start receiving applications from prospective students.
              </p>
            </div>
            <Link
              href="/dashboard/post-tuition"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D91E48] text-white font-bold text-xs shadow-sm hover:bg-[#B31438] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-[#EADCDD] dark:border-[#E11D48]/20 bg-[#FCF9F8] dark:bg-[#0D0204]/80 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
                  <th className="py-4 px-5">TUITION</th>
                  <th className="py-4 px-5">SUBJECT &amp; LEVEL</th>
                  <th className="py-4 px-5">MONTHLY FEE</th>
                  <th className="py-4 px-5 text-center">APPROVAL STATUS</th>
                  <th className="py-4 px-5 text-center">ACTIVE STATUS</th>
                  <th className="py-4 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#EADCDD]/60 dark:divide-[#E11D48]/15 text-xs">
                {tuitions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#FCF9F8]/80 dark:hover:bg-[#1C0307]/60 transition-colors group"
                  >
                    {/* 1. Tuition (Banner + Title + Mode/Location) */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3.5">
                        {/* Thumbnail */}
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#EADCDD] dark:border-[#E11D48]/30 bg-[#FCF9F8] dark:bg-[#1B0307] shrink-0 flex items-center justify-center shadow-xs">
                          {item.bannerImage ? (
                            <Image
                              src={item.bannerImage}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-[#D91E48] dark:text-[#FF1E40]" />
                          )}
                        </div>

                        {/* Title and location */}
                        <div className="min-w-0 max-w-[240px] sm:max-w-[300px]">
                          <h4 className="text-xs sm:text-sm font-bold text-[#180C0E] dark:text-white truncate group-hover:text-[#D91E48] dark:group-hover:text-[#FF1E40] transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#5C494C] dark:text-[#BFA5AA]">
                            {item.mode === "Online Batch" || item.location.toLowerCase().includes("online") ? (
                              <>
                                <Globe className="w-3 h-3 text-[#D91E48] dark:text-[#FF1E40] shrink-0" />
                                <span className="truncate">Online</span>
                              </>
                            ) : (
                              <>
                                <MapPin className="w-3 h-3 text-[#D91E48] dark:text-[#FF1E40] shrink-0" />
                                <span className="truncate">{item.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Subject & Level */}
                    <td className="py-4 px-5">
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDECEF] dark:bg-[#2A060C] text-[#D91E48] dark:text-[#FF1E40] border border-[#F2B8C4] dark:border-[#E11D48]/30 shadow-2xs">
                          {item.subject}
                        </span>
                        <p className="text-[11px] text-[#5C494C] dark:text-[#BFA5AA]">
                          {item.classLevel}
                        </p>
                      </div>
                    </td>

                    {/* 3. Monthly Fee */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="text-sm font-mono font-black text-[#180C0E] dark:text-white">
                        ৳{Number(item.monthlyFee).toLocaleString()}
                      </span>
                    </td>

                    {/* 4. Approval Status (Read-Only for Tutor, Interactive when Admin Tools Active) */}
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <div className="flex flex-col items-center gap-1.5">
                        {item.approvalStatus === "approved" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#ECFDF5] dark:bg-[#0A2618] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/40 shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            <span>Approved</span>
                          </span>
                        ) : item.approvalStatus === "rejected" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#FF4D6D]/40 shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#D91E48] dark:bg-[#FF4D6D]" />
                            <span>Rejected</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FEF3C7] dark:bg-[#281804] text-[#D97706] dark:text-[#FFB800] border border-[#FDE68A] dark:border-[#FFB800]/40 shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FFB800] animate-ping" />
                            <span>Pending</span>
                          </span>
                        )}

                        {/* Interactive Admin Controls for Testing / Approving / Rejecting */}
                        {showAdminControls && (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {item.approvalStatus !== "approved" && (
                              <button
                                type="button"
                                onClick={() => handleUpdateApproval(item.id, "approved")}
                                title="Approve this post"
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#ECFDF5] hover:bg-[#A7F3D0] text-[#059669] border border-[#A7F3D0] transition-all cursor-pointer flex items-center gap-0.5 shadow-2xs active:scale-95"
                              >
                                <Check className="w-2.5 h-2.5" />
                                <span>Approve</span>
                              </button>
                            )}

                            {item.approvalStatus !== "rejected" && (
                              <button
                                type="button"
                                onClick={() => handleUpdateApproval(item.id, "rejected")}
                                title="Reject this post"
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#FDECEF] hover:bg-[#F2B8C4] text-[#D91E48] border border-[#F2B8C4] transition-all cursor-pointer flex items-center gap-0.5 shadow-2xs active:scale-95"
                              >
                                <X className="w-2.5 h-2.5" />
                                <span>Reject</span>
                              </button>
                            )}

                            {item.approvalStatus !== "pending" && (
                              <button
                                type="button"
                                onClick={() => handleUpdateApproval(item.id, "pending")}
                                title="Reset back to Pending"
                                className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-[#8C7679] hover:bg-[#EADCDD] transition-all cursor-pointer"
                              >
                                <RotateCcw className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 5. Active Status (Tutor Controlled One-Click Toggle) */}
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(item.id)}
                        title={item.isActive ? "Click to Close Tuition (hide from students)" : "Click to Activate Tuition (accept applicants)"}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold cursor-pointer transition-all active:scale-95 shadow-xs ${
                          item.isActive
                            ? "bg-[#ECFDF5] hover:bg-[#D1FAE5] dark:bg-[#0A2618] dark:hover:bg-[#0F3823] text-[#059669] dark:text-[#10B981] border border-[#A7F3D0] dark:border-[#10B981]/50 dark:shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                            : "bg-[#F5ECEC] hover:bg-[#EADCDD] dark:bg-[#1E0307] dark:hover:bg-[#2A060C] text-[#8C7679] dark:text-[#BFA5AA] border border-[#EADCDD] dark:border-[#E11D48]/25"
                        }`}
                      >
                        {item.isActive ? (
                          <>
                            <Power className="w-3 h-3 text-[#059669] dark:text-[#10B981]" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <PowerOff className="w-3 h-3 text-[#8C7679] dark:text-[#BFA5AA]" />
                            <span>Closed</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* 6. Actions (Eye, Edit, Delete with Hover Animations) */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Eye / View Details */}
                        <Link
                          href={`/tuitions/${item._id || item.id}`}
                          className="p-2 rounded-xl text-[#5C494C] dark:text-[#BFA5AA] hover:text-[#D91E48] dark:hover:text-[#FF1E40] hover:bg-[#FDECEF] dark:hover:bg-[#2A060C] transition-all duration-200 cursor-pointer group/eye"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 group-hover/eye:scale-110 transition-transform" />
                        </Link>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 rounded-xl text-[#5C494C] dark:text-[#BFA5AA] hover:text-[#D97706] dark:hover:text-[#FFB800] hover:bg-[#FEF3C7] dark:hover:bg-[#281804] transition-all duration-200 cursor-pointer group/edit"
                          title="Edit Tuition Post"
                        >
                          <Pencil className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(item)}
                          className="p-2 rounded-xl text-[#5C494C] dark:text-[#BFA5AA] hover:text-[#D91E48] dark:hover:text-[#FF4D6D] hover:bg-[#FDECEF] dark:hover:bg-[#2A0612] transition-all duration-200 cursor-pointer group/del"
                          title="Delete Tuition Post"
                        >
                          <Trash2 className="w-4 h-4 group-hover/del:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. EDIT TUITION POST MODAL (Matching Image 2 with Brand Aesthetic)        */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/35 bg-white dark:bg-[#140204] p-6 shadow-2xl dark:shadow-[0_0_50px_rgba(225,29,72,0.3)]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#EADCDD] dark:border-[#E11D48]/20">
              <div>
                <h3 className="text-lg font-black text-[#180C0E] dark:text-white tracking-tight">
                  Edit Tuition Post
                </h3>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] mt-0.5 truncate max-w-sm">
                  Update details for: {editingTuition?.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-[#8C7679] hover:text-[#180C0E] dark:hover:text-white hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
              
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                  TITLE
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                />
              </div>

              {/* Subject & Class Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                    SUBJECT
                  </label>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors cursor-pointer"
                  >
                    {SUBJECT_OPTIONS.map((sub) => (
                      <option key={sub} value={sub} className="bg-white dark:bg-[#140204] text-[#180C0E] dark:text-white">
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                    CLASS LEVEL
                  </label>
                  <select
                    value={editClassLevel}
                    onChange={(e) => setEditClassLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors cursor-pointer"
                  >
                    {CLASS_LEVEL_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl} className="bg-white dark:bg-[#140204] text-[#180C0E] dark:text-white">
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mode Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                  MODE
                </label>
                <div className="flex items-center gap-4 text-xs font-semibold text-[#180C0E] dark:text-white">
                  {(["Online Batch", "Offline Tuition", "Hybrid Model"] as const).map((modeOption) => (
                    <label key={modeOption} className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="editMode"
                        checked={editMode === modeOption}
                        onChange={() => setEditMode(modeOption)}
                        className="accent-[#D91E48] dark:accent-[#FF1E40]"
                      />
                      <span>{modeOption}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Conditional Location */}
              {editMode !== "Online Batch" && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                    LOCATION / DISTRICT
                  </label>
                  <input
                    type="text"
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Monthly Fee & Days Per Week */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                    MONTHLY FEE (BDT)
                  </label>
                  <input
                    type="number"
                    required
                    value={editMonthlyFee}
                    onChange={(e) => setEditMonthlyFee(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                    DAYS PER WEEK
                  </label>
                  <select
                    value={editSchedule}
                    onChange={(e) => setEditSchedule(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs text-[#180C0E] dark:text-white focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors cursor-pointer"
                  >
                    {WEEKLY_FREQUENCY_OPTIONS.map((freq) => (
                      <option key={freq} value={freq} className="bg-white dark:bg-[#140204] text-[#180C0E] dark:text-white">
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Banner Image */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                  BANNER IMAGE
                </label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#EADCDD] dark:border-[#E11D48]/30 bg-[#FCF9F8] dark:bg-[#0D0204] text-xs font-semibold text-[#180C0E] dark:text-white hover:border-[#D91E48] cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
                    <span>Replace Image (ImgBB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditBannerImage(reader.result as string);
                            toast.success("Image updated!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {editBannerImage && (
                    <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-[#EADCDD] dark:border-[#E11D48]/30">
                      <Image src={editBannerImage} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#180C0E] dark:text-[#F4E2E5]">
                    DESCRIPTION
                  </label>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      editDescription.trim().length >= 50
                        ? "text-[#059669] dark:text-[#10B981]"
                        : "text-[#D91E48] dark:text-[#FF1E40]"
                    }`}
                  >
                    ({editDescription.trim().length} CHARS, MIN 50)
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-xs text-[#180C0E] dark:text-white placeholder-[#8C7679] focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EADCDD] dark:border-[#E11D48]/20">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#5C494C] dark:text-[#BFA5AA] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit || editDescription.trim().length < 50}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isSavingEdit ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DELETE CONFIRMATION MODAL (Matching Image 3 with Brand Aesthetic)      */}
      {/* ========================================================================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/35 bg-white dark:bg-[#140204] p-6 shadow-2xl dark:shadow-[0_0_50px_rgba(225,29,72,0.3)] space-y-5">
            
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FDECEF] dark:bg-[#2A0612] text-[#D91E48] dark:text-[#FF4D6D] border border-[#F2B8C4] dark:border-[#FF4D6D]/40 shadow-xs">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#180C0E] dark:text-white tracking-tight">
                  Delete Tuition Post?
                </h3>
                <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] mt-0.5 line-clamp-1">
                  {deletingTuition?.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] leading-relaxed">
              Are you sure you want to permanently delete this tuition? All associated applicant references will be removed.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#5C494C] dark:text-[#BFA5AA] hover:bg-[#F5ECEC] dark:hover:bg-[#1E0307] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Permanently</span>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
