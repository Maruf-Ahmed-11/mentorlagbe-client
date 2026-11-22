"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
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
  Sparkles
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
          const token = await getTokenFromClient();
          const res = await fetch(`/api/user/profile?email=${encodeURIComponent(sessionUser.email)}`, {
            headers: token ? { authorization: `Bearer ${token}` } : {},
          });
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
      // Default demo state
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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#1C0307] border border-[#F2B8C4] dark:border-[#E11D48]/35 text-[11px] font-mono font-bold tracking-wider text-[#D91E48] dark:text-[#FF1E40] uppercase mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ACCOUNT SETTINGS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#180C0E] dark:text-white tracking-tight">
          Account Profile
        </h2>
        <p className="text-xs sm:text-sm text-[#5C494C] dark:text-[#BFA5AA] mt-1">
          Update your public bio, profile avatar, and verified contact numbers.
        </p>
      </div>

      {/* Main Profile Card (MentorLagbe Signature Crimson Aesthetic) */}
      <div className="rounded-2xl border border-[#EADCDD] dark:border-[#E11D48]/25 bg-white dark:bg-[#160307]/90 p-6 sm:p-8 shadow-[0_12px_32px_-8px_rgba(24,12,14,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {/* Profile Photo Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-[#EADCDD] dark:border-[#E11D48]/20">
          {/* Avatar Circle with Crown Badge */}
          <div className="relative shrink-0">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={76}
                height={76}
                className="h-[76px] w-[76px] rounded-full object-cover border-2 border-[#F2B8C4] dark:border-[#E11D48]/60 shadow-[0_4px_16px_rgba(217,30,72,0.15)] dark:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
              />
            ) : (
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-[#E11D48] via-[#FF1E40] to-[#FF4D6D] text-white font-black text-2xl shadow-[0_4px_20px_rgba(217,30,72,0.3)] dark:shadow-[0_0_25px_rgba(255,30,64,0.4)]">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB800] text-black shadow-md border-2 border-white dark:border-[#160307]">
              <Crown className="h-3.5 w-3.5 fill-black" />
            </div>
          </div>

          {/* Upload Avatar Details */}
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-bold text-[#180C0E] dark:text-white">
              Profile Photo
            </h3>
            <p className="text-xs text-[#5C494C] dark:text-[#BFA5AA] leading-relaxed">
              Upload a clear portrait to build trust with students and guardians. Supports PNG, JPG, or WebP.
            </p>
            <button
              type="button"
              onClick={handleAvatarPlaceholderClick}
              className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F5ECEC] hover:bg-[#EADCDD] dark:bg-[#2A060C] dark:hover:bg-[#3D0A13] border border-[#EADCDD] dark:border-[#E11D48]/40 text-xs font-semibold text-[#180C0E] dark:text-white transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Upload className="w-3.5 h-3.5 text-[#D91E48] dark:text-[#FF1E40]" />
              <span>Upload New Avatar</span>
            </button>
          </div>
        </div>

        {/* Roles & Subscriptions Pills Section */}
        <div className="py-6 border-b border-[#EADCDD] dark:border-[#E11D48]/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Account Role */}
          <div className="space-y-1.5">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Account Role
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDECEF] dark:bg-[#2E070F] border border-[#F2B8C4] dark:border-[#FF1E40]/40 text-xs font-mono font-bold uppercase text-[#D91E48] dark:text-[#FF1E40]">
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
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C7679] dark:text-[#BFA5AA]">
              Subscription Plan
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] dark:bg-[#281804] border border-[#FDE68A] dark:border-[#FFB800]/40 text-xs font-mono font-bold uppercase text-[#B45309] dark:text-[#FFB800]">
              <Crown className="w-3.5 h-3.5 fill-[#B45309] dark:fill-[#FFB800]" />
              <span>PRO Member</span>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSaveChanges} className="pt-6 space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#180C0E] dark:text-[#F4E2E5] flex items-center gap-1">
              <span>Full Name</span>
              <span className="text-[#D91E48] dark:text-[#FF1E40]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Hasan"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none focus:ring-1 focus:ring-[#D91E48] dark:focus:ring-[#FF1E40] transition-colors"
              />
            </div>
          </div>

          {/* Email Address (Non-editable) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#8C7679] dark:text-[#BFA5AA]">
              Email Address (Non-editable)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
              <input
                type="email"
                disabled
                readOnly
                value={email}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5ECEC] dark:bg-[#070102] border border-[#EADCDD] dark:border-[#E11D48]/20 text-sm text-[#8C7679] dark:text-[#BFA5AA] cursor-not-allowed select-none opacity-80"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#180C0E] dark:text-[#F4E2E5]">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7679] dark:text-[#BFA5AA]" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880-1700-000001"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none focus:ring-1 focus:ring-[#D91E48] dark:focus:ring-[#FF1E40] transition-colors"
              />
            </div>
          </div>

          {/* Bio / Academic Background */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#180C0E] dark:text-[#F4E2E5]">
              Bio / Academic Background
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Platform administrator overseeing mentors and course quality."
              className="w-full px-4 py-3 rounded-xl bg-[#FCF9F8] dark:bg-[#0D0204] border border-[#EADCDD] dark:border-[#E11D48]/30 text-sm text-[#180C0E] dark:text-white placeholder-[#8C7679] dark:placeholder-[#BFA5AA]/50 focus:border-[#D91E48] dark:focus:border-[#FF1E40] focus:outline-none focus:ring-1 focus:ring-[#D91E48] dark:focus:ring-[#FF1E40] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D91E48] hover:bg-[#B31438] dark:bg-gradient-to-r dark:from-[#E11D48] dark:via-[#FF1E40] dark:to-[#FF4D6D] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,30,72,0.3)] dark:shadow-[0_0_20px_rgba(225,29,72,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,30,64,0.8)] transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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