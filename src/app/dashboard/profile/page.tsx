"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
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
  Loader2 
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load user profile details
  useEffect(() => {
    if (sessionUser?.email) {
      setEmail(sessionUser.email);
      setName(sessionUser.name || "asdf");
      
      const sessionRole = (sessionUser as any)?.role || 
        (sessionUser.email.toLowerCase().includes("admin") ? "admin" : "student");
      setRole(sessionRole);
      setPlan((sessionUser as any)?.plan || "pro");
      if (sessionUser.image) setImage(sessionUser.image);

      // Fetch additional stored details from database
      const fetchDetails = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/user/profile?email=${encodeURIComponent(sessionUser.email)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.name) setName(data.name);
            if (data.phone) setPhone(data.phone);
            if (data.bio) setBio(data.bio);
            if (data.role) setRole(data.role);
            if (data.plan) setPlan(data.plan);
            if (data.image) setImage(data.image);
          }
        } catch (err) {
          console.error("Failed to fetch profile details", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDetails();
    } else {
      // Default demo state matching mockups
      setName("asdf");
      setEmail("admin@mentorlagbe.com");
      setRole("admin");
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

  const handleAvatarPlaceholderClick = () => {
    toast.success("ImgBB image upload will be connected in the next milestone! Avatar generated from initials.", {
      icon: "🖼️",
    });
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("User email is missing");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          phone,
          bio,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Account Profile
        </h2>
        <p className="text-sm text-[#94A3B8] mt-1">
          Update your public bio, profile avatar, and verified contact numbers.
        </p>
      </div>

      {/* Main Profile Card (Matching Image 8) */}
      <div className="rounded-2xl border border-[#15233E] bg-[#0A1124] p-6 sm:p-8 shadow-xl">
        {/* Profile Photo Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-[#15233E]">
          {/* Avatar Circle with Crown Badge */}
          <div className="relative shrink-0">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={76}
                height={76}
                className="h-[76px] w-[76px] rounded-full object-cover border-2 border-[#00C48C]/50"
              />
            ) : (
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#00BFA5] text-[#080D1A] font-black text-2xl shadow-lg">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB800] text-black shadow-md border-2 border-[#0A1124]">
              <Crown className="h-3.5 w-3.5 fill-black" />
            </div>
          </div>

          {/* Upload Avatar Details */}
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-bold text-white">
              Profile Photo
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Upload a clear portrait to build trust with students and guardians. Supports PNG, JPG, or WebP.
            </p>
            <button
              type="button"
              onClick={handleAvatarPlaceholderClick}
              className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F223D] hover:bg-[#142B4E] border border-[#00C48C]/30 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Upload className="w-3.5 h-3.5 text-[#00C48C]" />
              <span>Upload New Avatar</span>
            </button>
          </div>
        </div>

        {/* Roles & Subscriptions Pills Section */}
        <div className="py-6 border-b border-[#15233E] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Account Role */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#94A3B8]">
              Account Role
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F223D] border border-[#38BDF8]/30 text-xs font-semibold text-[#38BDF8]">
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

          {/* Subscription Plan */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#94A3B8]">
              Subscription Plan
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#231A0F] border border-[#FFB800]/30 text-xs font-semibold text-[#FFB800]">
              <Crown className="w-3.5 h-3.5 fill-[#FFB800]" />
              <span>PRO Member</span>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSaveChanges} className="pt-6 space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <span>Full Name</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Hasan"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070C18] border border-[#15233E] text-sm text-white placeholder-[#64748B] focus:border-[#00C48C] focus:outline-none focus:ring-1 focus:ring-[#00C48C] transition-colors"
              />
            </div>
          </div>

          {/* Email Address (Non-editable) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#64748B]">
              Email Address (Non-editable)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
              <input
                type="email"
                disabled
                readOnly
                value={email}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050811] border border-[#15233E] text-sm text-[#94A3B8] cursor-not-allowed select-none opacity-80"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880-1700-000001"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070C18] border border-[#15233E] text-sm text-white placeholder-[#64748B] focus:border-[#00C48C] focus:outline-none focus:ring-1 focus:ring-[#00C48C] transition-colors"
              />
            </div>
          </div>

          {/* Bio / Academic Background */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">
              Bio / Academic Background
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Platform administrator overseeing mentors and course quality."
              className="w-full px-4 py-3 rounded-xl bg-[#070C18] border border-[#15233E] text-sm text-white placeholder-[#64748B] focus:border-[#00C48C] focus:outline-none focus:ring-1 focus:ring-[#00C48C] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00C48C] hover:bg-[#00DDA0] text-[#080D1A] font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
