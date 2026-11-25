"use client";

import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { uploadImageToImgBB } from "@/lib/imgbb";
import toast from "react-hot-toast";
import Image from "next/image";
import { 
  User, 
  Mail, 
  Phone, 
  Upload, 
  Crown, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  Save, 
  Loader2,
  Sparkles,
  Camera
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const sessionUser = session?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+880-1700-000001");
  const [bio, setBio] = useState("Platform administrator overseeing mentors and course quality.");
  const [role, setRole] = useState("admin");
  const [plan, setPlan] = useState("pro");
  const [image, setImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load user profile details
  useEffect(() => {
    // Check cached user first for zero-latency hydration
    let initialUser = sessionUser;
    if (!initialUser && typeof window !== "undefined") {
      try {
        const cached = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null");
        if (cached?.email) initialUser = cached;
      } catch {}
    }

    if (initialUser?.email) {
      setEmail(initialUser.email);
      setName(initialUser.name || "Member");
      
      const userRole = (initialUser as any)?.role || 
        (initialUser.email.toLowerCase().includes("admin") ? "admin" : (initialUser.email.toLowerCase().includes("tutor") || initialUser.email.toLowerCase().includes("teacher") ? "tutor" : "student"));
      setRole(userRole);
      setPlan((initialUser as any)?.plan || "pro");
      setImage(initialUser.image || null);

      // Fetch additional stored details from database
      const fetchDetails = async () => {
        setIsLoading(true);
        try {
          const token = await getTokenFromClient();
          const res = await fetch(`/api/user/profile?email=${encodeURIComponent(initialUser.email)}`, {
            headers: token ? { authorization: `Bearer ${token}` } : {},
          });
          if (res.ok) {
            const data = await res.json();
            if (data.name) setName(data.name);
            if (data.phone) setPhone(data.phone);
            if (data.bio) setBio(data.bio);
            if (data.role) setRole(data.role);
            if (data.plan) setPlan(data.plan);
            setImage(data.image || null);
          }
        } catch (err) {
          console.error("Failed to fetch profile details", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDetails();
    } else {
      setName("");
      setEmail("");
      setImage(null);
      setRole("student");
      setPlan("pro");
    }
  }, [sessionUser]);

  // Initials for avatar placeholder
  const getInitials = (str: string) => {
    const parts = str.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return str.slice(0, 2).toUpperCase() || "AS";
  };
  const initials = getInitials(name || "AS");

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previousImage = image;
    const localPreview = URL.createObjectURL(file);
    setImage(localPreview);
    setUploadingImage(true);

    try {
      const uploadedUrl = await uploadImageToImgBB(file);
      setImage(uploadedUrl);

      if (email) {
        const token = await getTokenFromClient();
        const res = await fetch("/api/user/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            email,
            image: uploadedUrl,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to save profile photo");
        }

        try {
          await authClient.updateUser({ image: uploadedUrl });
        } catch {}

        try {
          const cached = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") || {};
          cached.email = email;
          cached.image = uploadedUrl;
          localStorage.setItem("mentorlagbe_cached_user", JSON.stringify(cached));
          window.dispatchEvent(new Event("mentorlagbe_user_updated"));
        } catch {}
      }

      toast.success("Profile photo uploaded and saved!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload avatar";
      toast.error(msg);
      setImage(previousImage);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("User email is missing");
      return;
    }

    setIsSaving(true);
    try {
      const token = await getTokenFromClient();
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          email,
          name,
          phone,
          bio,
          ...(image ? { image } : {}),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      try {
        await authClient.updateUser({
          name,
          ...(image ? { image } : {}),
        });
      } catch {}

      try {
        const cached = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") || {};
        cached.name = name;
        if (image) cached.image = image;
        localStorage.setItem("mentorlagbe_cached_user", JSON.stringify(cached));
        window.dispatchEvent(new Event("mentorlagbe_user_updated"));
      } catch {}

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[11px] font-mono font-bold tracking-wider text-[#0284C7] dark:text-[#0EA5E9] uppercase mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ACCOUNT SETTINGS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1320] dark:text-white tracking-tight">
          Account Profile
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
          Update your public bio, profile avatar, and verified contact numbers.
        </p>
      </div>

      {/* Main Profile Card (MentorLagbe Signature Crimson Aesthetic) */}
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white dark:bg-[#0B1930]/90 p-6 sm:p-8 shadow-[0_12px_32px_-8px_rgba(11, 19, 32,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {/* Profile Photo Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
          {/* Avatar Circle with Crown Badge */}
          <div className="relative shrink-0">
            <div className="relative h-[76px] w-[76px] rounded-full overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={name || "Profile Avatar"}
                  width={76}
                  height={76}
                  unoptimized
                  className="h-[76px] w-[76px] rounded-full object-cover border-2 border-[#BAE6FD] dark:border-[#0284C7]/60 shadow-[0_4px_16px_rgba(2,132,199,0.15)] dark:shadow-[0_0_20px_rgba(2,132,199,0.4)]"
                />
              ) : (
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white font-black text-2xl shadow-[0_4px_20px_rgba(2,132,199,0.3)] dark:shadow-[0_0_25px_rgba(14,165,233,0.4)]">
                  {initials}
                </div>
              )}
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
                  <Loader2 className="h-6 w-6 text-[#38BDF8] animate-spin" />
                </div>
              )}
            </div>
            {role === "admin" ? (
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-md border-2 border-white dark:border-[#0B1930]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
            ) : plan.toLowerCase() === "pro" && (
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB800] text-black shadow-md border-2 border-white dark:border-[#0B1930]">
                <Crown className="h-3.5 w-3.5 fill-black" />
              </div>
            )}
          </div>

          {/* Upload Avatar Details */}
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-bold text-[#0B1320] dark:text-white">
              Profile Photo
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Upload a clear portrait to build trust with students and guardians. Supports PNG, JPG, or WebP (max 5MB).
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleAvatarFileChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={uploadingImage}
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F0F7FF] hover:bg-[#E2E8F0] dark:bg-[#102547] dark:hover:bg-[#132E59] border border-[#E2E8F0] dark:border-[#0284C7]/40 text-xs font-semibold text-[#0B1320] dark:text-white transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-60"
            >
              {uploadingImage ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9] animate-spin" />
                  <span>Uploading to ImgBB...</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#0EA5E9]" />
                  <span>Upload New Avatar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Roles & Subscriptions Pills Section */}
        <div className="py-6 border-b border-[#E2E8F0] dark:border-[#0284C7]/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Account Role */}
          <div className="space-y-1.5">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Account Role
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E0F2FE] dark:bg-[#132E59] border border-[#BAE6FD] dark:border-[#0EA5E9]/40 text-xs font-mono font-bold uppercase text-[#0284C7] dark:text-[#0EA5E9]">
              {role === "admin" ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </>
              ) : role === "tutor" ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Tutor</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Student</span>
                </>
              )}
            </div>
          </div>

          {/* Access Level (Admin) / Subscription Plan (Student & Tutor) */}
          <div className="space-y-1.5">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              {role === "admin" ? "Access Level" : "Subscription Plan"}
            </p>
            {role === "admin" ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF2FF] dark:bg-[#6366F1]/20 border border-[#C7D2FE] dark:border-[#6366F1]/40 text-xs font-mono font-bold uppercase text-[#4F46E5] dark:text-[#818CF8]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Platform Admin &bull; Full Access</span>
              </div>
            ) : plan.toLowerCase() === "pro" ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] dark:bg-[#281804] border border-[#FDE68A] dark:border-[#FFB800]/40 text-xs font-mono font-bold uppercase text-[#B45309] dark:text-[#FFB800]">
                <Crown className="w-3.5 h-3.5 fill-[#B45309] dark:fill-[#FFB800]" />
                <span>PRO Member</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F7FF] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#0284C7]/40 text-xs font-mono font-bold uppercase text-[#0284C7] dark:text-[#38BDF8]">
                <span>FREE Plan</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSaveChanges} className="pt-6 space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#0B1320] dark:text-[#E2E8F0] flex items-center gap-1">
              <span>Full Name</span>
              <span className="text-[#0284C7] dark:text-[#0EA5E9]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Hasan"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/50 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0284C7] dark:focus:ring-[#0EA5E9] transition-colors"
              />
            </div>
          </div>

          {/* Email Address (Non-editable) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
              Email Address (Non-editable)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
              <input
                type="email"
                disabled
                readOnly
                value={email}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F0F7FF] dark:bg-[#070102] border border-[#E2E8F0] dark:border-[#0284C7]/20 text-sm text-[#64748B] dark:text-[#94A3B8] cursor-not-allowed select-none opacity-80"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#0B1320] dark:text-[#E2E8F0]">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880-1700-000001"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/50 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0284C7] dark:focus:ring-[#0EA5E9] transition-colors"
              />
            </div>
          </div>

          {/* Bio / Academic Background */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#0B1320] dark:text-[#E2E8F0]">
              Bio / Academic Background
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Platform administrator overseeing mentors and course quality."
              className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#07101E] border border-[#E2E8F0] dark:border-[#0284C7]/30 text-sm text-[#0B1320] dark:text-white placeholder-[#64748B] dark:placeholder-[#94A3B8]/50 focus:border-[#0284C7] dark:focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0284C7] dark:focus:ring-[#0EA5E9] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] dark:bg-gradient-to-r dark:from-[#0284C7] dark:via-[#0EA5E9] dark:to-[#38BDF8] text-white font-bold text-xs shadow-[0_4px_16px_rgba(2, 132, 199,0.3)] dark:shadow-[0_0_20px_rgba(2, 132, 199,0.5)] dark:hover:shadow-[0_0_30px_rgba(14, 165, 233,0.8)] transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}