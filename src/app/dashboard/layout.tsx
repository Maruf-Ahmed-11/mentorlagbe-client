"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crown,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Plus,
  BookOpen,
  Users
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [livePlan, setLivePlan] = useState<string>("free");
  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [cachedUser, setCachedUser] = useState<{
    name: string;
    email: string;
    role: string;
    plan?: string;
    image?: string | null;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    const sessionEmail = session?.user?.email?.toLowerCase();
    let validCachedEmail: string | null = null;

    try {
      const saved = localStorage.getItem("mentorlagbe_cached_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        const cachedEmail = parsed?.email?.toLowerCase();
        if (sessionEmail && cachedEmail && cachedEmail === sessionEmail) {
          setCachedUser(parsed);
          validCachedEmail = cachedEmail || null;
          setLivePlan((parsed.plan || "free").toLowerCase());
          setLiveImage(parsed.image || session?.user?.image || null);
        } else {
          localStorage.removeItem("mentorlagbe_cached_user");
          setCachedUser(null);
          setLivePlan(((session?.user as any)?.plan || "free").toLowerCase());
          setLiveImage(session?.user?.image || null);
        }
      } else if (session?.user) {
        setLivePlan(((session.user as any)?.plan || "free").toLowerCase());
        setLiveImage(session.user.image || null);
      }
    } catch {}

    const email = sessionEmail || validCachedEmail;
    if (!email) return;

    const syncPlan = async () => {
      try {
        const res = await fetch(`/api/user/usage?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          if (data?.plan) {
            setLivePlan(data.plan.toLowerCase());
          }
          setLiveImage(data?.image || null);
          try {
            const current = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") || {};
            const isSame = !current.email || current.email.toLowerCase() === email;
            const nextCache = isSame ? { ...current } : {};
            nextCache.email = email;
            if (data?.name) nextCache.name = data.name;
            if (data?.role) nextCache.role = data.role;
            if (data?.plan) nextCache.plan = data.plan;
            nextCache.image = data?.image || null;
            localStorage.setItem("mentorlagbe_cached_user", JSON.stringify(nextCache));
          } catch {}
        }
      } catch {}
    };

    syncPlan();

    const handleUpdate = () => {
      try {
        const updated = localStorage.getItem("mentorlagbe_cached_user");
        if (updated) {
          const parsed = JSON.parse(updated);
          if (!sessionEmail || parsed?.email?.toLowerCase() === sessionEmail) {
            setCachedUser(parsed);
            setLivePlan((parsed.plan || "free").toLowerCase());
            setLiveImage(parsed.image || null);
          }
        } else {
          setCachedUser(null);
          setLiveImage(session?.user?.image || null);
        }
      } catch {}
      syncPlan();
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("mentorlagbe_user_updated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("mentorlagbe_user_updated", handleUpdate);
    };
  }, [session?.user?.email]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          localStorage.removeItem("access-token");
          localStorage.removeItem("mentorlagbe_cached_user");
          localStorage.removeItem("mentorlagbe_last_active_email");
          setCachedUser(null);
          setLiveImage(null);
          setLivePlan("free");
          window.dispatchEvent(new Event("mentorlagbe_user_updated"));
          toast.success("Signed out successfully");
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  // Derive user info strictly from active session (ZERO cross-account leakage)
  const user = mounted ? (session?.user || (cachedUser?.email?.toLowerCase() === session?.user?.email?.toLowerCase() ? cachedUser : null)) : null;
  const userImage = mounted && session?.user?.email ? (liveImage ?? session.user.image ?? null) : null;
  const userEmail = user?.email || "";
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const userName = user?.name || (isPending ? "Loading..." : "Member");
  const isUserPro = livePlan === "pro" || 
                    ((user as any)?.plan || "").toLowerCase() === "pro" || 
                    (cachedUser?.plan || "").toLowerCase() === "pro";
  const userPlan = isUserPro ? "PRO" : "FREE";

  // Initials for avatar placeholder
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase() || "ML";
  };
  const initials = getInitials(userName);

  const isAdmin = userRole === "admin";
  const isTutor = userRole === "tutor";

  const navItems = isAdmin
    ? [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Manage Tuitions", href: "/dashboard/my-tuitions", icon: BookOpen },
        { name: "User Directory", href: "/dashboard/applicants", icon: Users },
      ]
    : isTutor
    ? [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "+ Post Tuition", href: "/dashboard/post-tuition", icon: Plus },
        { name: "My Tuitions", href: "/dashboard/my-tuitions", icon: BookOpen },
        { name: "Applicants", href: "/dashboard/applicants", icon: Users },
      ]
    : [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Applications", href: "/dashboard/applications", icon: FileText },
        { name: "Saved Tuitions", href: "/dashboard/saved-tuitions", icon: Bookmark },
      ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full bg-[#F8FAFC] text-[#0B1320] dark:bg-[#050B14] dark:text-white font-sans relative transition-colors duration-300">

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION (MentorLagbe Signature Crimson & Warm Alabaster)       */}
      {/* ========================================================================= */}
      <aside
        className={`sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between border-r border-[#E2E8F0] dark:border-[#0284C7]/25 bg-white/95 dark:bg-[#07101E]/95 backdrop-blur-xl transition-all duration-300 z-30 shrink-0 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top: User Profile & Nav Links */}
        <div className="overflow-y-auto py-4">

          {/* User Profile Card */}
          <div className={`px-4 pb-5 border-b border-[#E2E8F0] dark:border-[#0284C7]/20 ${isCollapsed ? "flex justify-center px-2" : ""}`}>
            {!mounted ? (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-[#E2E8F0] dark:bg-[#102547]" />
                {!isCollapsed && (
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-20 rounded bg-[#E2E8F0] dark:bg-[#102547]" />
                    <div className="h-2.5 w-14 rounded bg-[#E2E8F0]/70 dark:bg-[#102547]/70" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Avatar with gold crown badge */}
                <div className="relative shrink-0">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      width={42}
                      height={42}
                      unoptimized
                      className="h-10 w-10 rounded-full object-cover border-2 border-[#BAE6FD] dark:border-[#0284C7]/50 shadow-sm dark:shadow-[0_0_15px_rgba(2, 132, 199,0.3)]"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white font-black text-sm shadow-[0_2px_10px_rgba(2, 132, 199,0.3)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.4)]">
                      {initials}
                    </div>
                  )}
                  {/* Shield Badge for Admin / Crown Badge for Pro users */}
                  {userRole === "admin" ? (
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-sm border border-white dark:border-[#07101E]">
                      <ShieldCheck className="h-2.5 w-2.5" />
                    </div>
                  ) : isUserPro && (
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFB800] text-black shadow-sm">
                      <Crown className="h-2.5 w-2.5 fill-black" />
                    </div>
                  )}
                </div>

                {/* User Name & Badges (Visible when expanded) */}
                {!isCollapsed && (
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#0B1320] dark:text-white truncate max-w-[95px]">
                        {userName}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
                        userRole === "admin"
                          ? "bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#4F46E5] dark:text-[#818CF8] border-[#C7D2FE] dark:border-[#6366F1]/40"
                          : isUserPro
                          ? "bg-[#FEF3C7] dark:bg-[#FFB800]/20 text-[#B45309] dark:text-[#FFB800] border-[#FDE68A] dark:border-[#FFB800]/40"
                          : "bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#0284C7]/20"
                      }`}>
                        {userRole === "admin" ? "SYSTEM" : userPlan}
                      </span>
                    </div>

                    {/* Dynamic Role Capsule (Admin / Tutor / Student) */}
                    <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase">
                      {userRole === "admin" ? (
                        <span className="inline-flex items-center gap-1 text-[#0284C7] dark:text-[#0EA5E9] bg-[#E0F2FE] dark:bg-[#132E59] border border-[#BAE6FD] dark:border-[#0EA5E9]/40 px-2 py-0.5 rounded-full">
                          <ShieldCheck className="h-3 w-3" />
                          <span>Admin</span>
                        </span>
                      ) : userRole === "tutor" ? (
                        <span className="inline-flex items-center gap-1 text-[#B45309] dark:text-[#FFB800] bg-[#FEF3C7] dark:bg-[#281804] border border-[#FDE68A] dark:border-[#FFB800]/40 px-2 py-0.5 rounded-full">
                          <GraduationCap className="h-3 w-3" />
                          <span>Tutor</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] bg-[#E0F2FE] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#38BDF8]/40 px-2 py-0.5 rounded-full">
                          <UserCheck className="h-3 w-3" />
                          <span>Student</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav Links */}
          <div className="p-3 space-y-6">
            {/* MAIN MENU */}
            <div>
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] shadow-[0_0_6px_rgba(2, 132, 199,0.6)] dark:shadow-[0_0_6px_#0EA5E9]" />
                  <span>MAIN MENU</span>
                </p>
              )}
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      title={isCollapsed ? item.name : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        active
                          ? "bg-[#E0F2FE] dark:bg-[#132E59] text-[#0284C7] dark:text-white border border-[#BAE6FD] dark:border-[#0EA5E9]/60 shadow-[0_4px_12px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_20px_rgba(14, 165, 233,0.3)] font-semibold"
                          : "text-[#475569] dark:text-[#E2E8F0]/80 hover:text-[#0B1320] dark:hover:text-white hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] hover:border hover:border-[#E2E8F0] dark:hover:border-[#0284C7]/30"
                      } ${isCollapsed ? "justify-center px-0" : ""}`}
                    >
                      <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-[#0284C7] dark:text-[#0EA5E9]" : "text-[#64748B] dark:text-[#94A3B8]"}`} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* PREFERENCES */}
            <div>
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] dark:bg-[#38BDF8] shadow-[0_0_6px_rgba(2, 132, 199,0.6)]" />
                  <span>PREFERENCES</span>
                </p>
              )}
              <Link
                href="/dashboard/profile"
                title={isCollapsed ? "Update Profile" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  pathname === "/dashboard/profile"
                    ? "bg-[#E0F2FE] dark:bg-[#132E59] text-[#0284C7] dark:text-white border border-[#BAE6FD] dark:border-[#0EA5E9]/60 shadow-[0_4px_12px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_20px_rgba(14, 165, 233,0.3)] font-semibold"
                    : "text-[#475569] dark:text-[#E2E8F0]/80 hover:text-[#0B1320] dark:hover:text-white hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] hover:border hover:border-[#E2E8F0] dark:hover:border-[#0284C7]/30"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
              >
                <Settings className={`h-4.5 w-4.5 shrink-0 ${pathname === "/dashboard/profile" ? "text-[#0284C7] dark:text-[#0EA5E9]" : "text-[#64748B] dark:text-[#94A3B8]"}`} />
                {!isCollapsed && <span>Update Profile</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Sign Out & Collapse Sidebar Toggle */}
        <div className="p-3 border-t border-[#E2E8F0] dark:border-[#0284C7]/20 space-y-2 bg-[#FAF5F5] dark:bg-[#050B14]">
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            title={isCollapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#0284C7] dark:text-rose-400 hover:text-[#0369A1] dark:hover:text-white hover:bg-[#E0F2FE] dark:hover:bg-[#0284C7]/30 transition-all cursor-pointer ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0 text-[#0284C7] dark:text-rose-400" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>

          {/* Minimize / Expand Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl text-[#475569] dark:text-[#94A3B8] hover:text-[#0B1320] dark:hover:text-white hover:bg-[#F0F7FF] dark:hover:bg-[#0D1D38] border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#0284C7]/30 transition-all cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-[#475569] dark:text-[#94A3B8]">
                <ChevronLeft className="h-4 w-4 text-[#0284C7] dark:text-[#0EA5E9]" />
                <span>Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN WORKSPACE CONTENT AREA                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] dark:bg-[#050B14] relative overflow-hidden transition-colors duration-300">

        {/* Ambient Crimson Aura */}
        <div className="absolute top-0 right-1/4 w-[750px] h-[400px] bg-[radial-gradient(ellipse_at_top,_rgba(224, 242, 254,0.7)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(2, 132, 199,0.14)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 relative z-10">
          {children}
        </main>
      </div>

    </div>
  );
}