"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "./Logo";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Sun, Moon, Menu, X, User, LogOut, LayoutDashboard, ChevronDown, Bookmark } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase() || "ML";
  };

  const [mounted, setMounted] = useState(false);
  const [cachedUser, setCachedUser] = useState<{ name: string; email: string; role: string; plan?: string; image?: string } | null>(null);

  const [livePlan, setLivePlan] = useState<string>("free");
  const [liveImage, setLiveImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const sessionEmail = session?.user?.email?.toLowerCase();

    // 1. Load initial cache ONLY if there is no active session OR it belongs to the same email
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
          // Different user logged in — discard stale previous user's cache immediately
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

    // 2. Fetch latest plan & image directly from database usage endpoint for this specific email
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

    // 3. React instantly to local storage updates or profile/payment completion events
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

  const activeUser = session?.user || cachedUser;
  const userName = activeUser?.name || "";
  const userImage = session?.user?.email ? (liveImage ?? session.user.image ?? null) : null;
  const userEmail = activeUser?.email || "";
  const rawRole = (activeUser as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const roleLabel = rawRole === "admin" ? "Admin" : rawRole === "tutor" ? "Tutor" : "Student";
  const isAdmin = rawRole === "admin";
  const isUserPro = livePlan === "pro" || 
                    ((activeUser as any)?.plan || "").toLowerCase() === "pro" || 
                    (cachedUser?.plan || "").toLowerCase() === "pro";
  const userPlan = isAdmin ? "SYSTEM" : isUserPro ? "PRO" : "FREE";
  const initials = getInitials(userName);

  // Initialize theme from document or localStorage with MutationObserver
  useEffect(() => {
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const currentIsDark = storedTheme !== null ? storedTheme === "dark" : true;
    setIsDark(currentIsDark);

    if (currentIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Automatically sync JWT token to localStorage for authenticated sessions
  useEffect(() => {
    if (session?.user) {
      getTokenFromClient();
    }
  }, [session]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  const [activeHash, setActiveHash] = useState<string>("/#home");

  useEffect(() => {
    const syncHash = () => {
      if (pathname === "/") {
        const currentHash = window.location.hash;
        setActiveHash(currentHash ? `/${currentHash}` : "/#home");
      } else if (pathname.startsWith("/tuitions")) {
        setActiveHash("/#tuitions");
      } else {
        setActiveHash(pathname);
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const isActive = (path: string) => {
    return activeHash === path;
  };

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Browse Tuitions", href: "/#tuitions" },
    { name: "Pricing", href: "/#pricing" },
    { name: "About", href: "/#about" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
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
          toast.success("Logged out successfully");
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  const isDashboard = pathname?.startsWith("/dashboard");

  const getDashboardTitle = () => {
    if (pathname?.includes("/profile")) return "Account Settings";
    if (pathname?.includes("/post-tuition")) return "Post New Tuition";
    if (pathname?.includes("/my-tuitions")) return "My Tuitions";
    if (pathname?.includes("/applicants")) return "Manage Applicants";
    if (rawRole === "admin") return "Platform Admin";
    if (rawRole === "tutor") return "Tutor Workspace";
    return "Student Workspace";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#07101E]/90 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-[#0284C7]/25 transition-colors duration-200">
      {isDashboard ? (
        /* ========================================================================= */
        /* DASHBOARD NAVBAR: Only Logo, Workspace Title, Theme Toggle & User Pill    */
        /* (Clicking Logo redirects to /, Clicking User pill redirects to Profile)  */
        /* ========================================================================= */
        <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Workspace Title */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Logo />
            <div className="h-5 w-px bg-[#E2E8F0] dark:bg-[#0284C7]/30 hidden sm:block" />
            <span className="font-bold text-sm sm:text-base text-[#0B1320] dark:text-white tracking-tight flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] animate-pulse shadow-[0_0_8px_rgba(2, 132, 199,0.6)] dark:shadow-[0_0_8px_#0EA5E9]" />
              <span>{getDashboardTitle()}</span>
            </span>
          </div>

          {/* Right: Theme Toggle & User Button leading directly to Update Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[#0284C7] dark:text-[#0EA5E9] hover:text-[#0B1320] dark:hover:text-white hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#102547] shadow-sm transition-all cursor-pointer"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-[#0EA5E9] transition-transform hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-[#0284C7] transition-transform hover:-rotate-12" />
              )}
            </button>

            <Link
              href="/dashboard/profile"
              title="Update Profile"
              className="flex items-center gap-2 rounded-full pl-1.5 pr-3.5 py-1.5 bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-[0_4px_16px_rgba(2, 132, 199,0.15)] dark:hover:shadow-[0_0_18px_rgba(14, 165, 233,0.35)] transition-all cursor-pointer shadow-sm group active:scale-95"
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={28}
                  height={28}
                  unoptimized
                  className="h-7 w-7 rounded-full object-cover border border-[#0284C7]/50"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#0284C7] to-[#0EA5E9] text-white font-bold text-xs shadow-sm">
                  {initials}
                </div>
              )}
              <span className="text-xs font-bold text-[#0B1320] dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#0EA5E9] transition-colors truncate max-w-[130px]">
                {userName}
              </span>
            </Link>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* PUBLIC SITE NAVBAR: Full Nav Links, Theme Toggle & Dropdown Menu         */
        /* ========================================================================= */
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Logo />

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => {
                  setActiveHash(link.href);
                  if (link.href === "/#home") {
                    window.dispatchEvent(new Event("mentorlagbe_replay_home"));
                  }
                }}
                className={`group relative py-1 transition-colors duration-200 ${
                  active
                    ? "nav-link-active text-[#0284C7] dark:text-[#0EA5E9] font-semibold dark:drop-shadow-[0_0_10px_rgba(14,165,233,0.7)]"
                    : "text-[#475569] dark:text-[#E2E8F0] hover:text-[#0284C7] dark:hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] transition-all duration-300 ${
                    active
                      ? "w-full opacity-100 shadow-[0_0_12px_rgba(14,165,233,0.9)]"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-75"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle & Auth Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 text-[#0284C7] dark:text-[#0EA5E9] hover:text-[#0B1320] dark:hover:text-white hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:bg-[#F0F7FF] dark:hover:bg-[#102547] shadow-sm transition-all cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-[#0EA5E9] transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-[#0284C7] transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* User State */}
          {!mounted || isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-[#F0F7FF] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#0284C7]/30" />
          ) : activeUser ? (
            /* User Pill & Dropdown (MentorLagbe Signature Crimson Aesthetic) */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-label="Toggle user menu"
                className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1 bg-white dark:bg-[#0D1D38] border border-[#BAE6FD] dark:border-[#0284C7]/35 hover:border-[#0284C7] dark:hover:border-[#0EA5E9] hover:shadow-[0_4px_14px_rgba(2, 132, 199,0.15)] dark:hover:shadow-[0_0_15px_rgba(14, 165, 233,0.3)] transition-all cursor-pointer shadow-sm group"
              >
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName}
                    width={28}
                    height={28}
                    unoptimized
                    className="h-7 w-7 rounded-full object-cover border border-[#0284C7]/50"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#0284C7] to-[#0EA5E9] text-white font-bold text-xs shadow-sm">
                    {initials}
                  </div>
                )}

                <div className="flex flex-col text-left leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0B1320] dark:text-white max-w-[85px] truncate">
                      {userName}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
                      isAdmin
                        ? "bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#4F46E5] dark:text-[#818CF8] border-[#C7D2FE] dark:border-[#6366F1]/40"
                        : isUserPro
                        ? "bg-[#FEF3C7] dark:bg-[#FFB800]/20 text-[#D97706] dark:text-[#FFB800] border-[#FCD34D] dark:border-[#FFB800]/40"
                        : "bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#0284C7]/20"
                    }`}>
                      {userPlan}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-mono font-medium mt-0.5">
                    {roleLabel}
                  </span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0B1320] dark:group-hover:text-white transition-transform" />
              </button>

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-[#0D1D38]/95 backdrop-blur-xl border border-[#E2E8F0] dark:border-[#0284C7]/35 p-3 shadow-[0_16px_40px_-8px_rgba(11, 19, 32,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-2 border-b border-[#E2E8F0] dark:border-[#0284C7]/25 space-y-1">
                    <p className="text-sm font-bold text-[#0B1320] dark:text-white truncate">
                      {userName}
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono truncate">
                      {userEmail}
                    </p>
                    <div className="flex items-center gap-2 pt-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#F0F7FF] dark:bg-[#132E59] text-[#0284C7] dark:text-[#0EA5E9] border border-[#BAE6FD] dark:border-[#0EA5E9]/40">
                        {roleLabel}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        isAdmin
                          ? "bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#4F46E5] dark:text-[#818CF8] border-[#C7D2FE] dark:border-[#6366F1]/40"
                          : isUserPro
                          ? "bg-[#FEF3C7] dark:bg-[#241704] text-[#D97706] dark:text-[#FFB800] border border-[#FCD34D] dark:border-[#FFB800]/40"
                          : "bg-[#F0F7FF] dark:bg-[#0D1D38] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#0284C7]/20"
                      }`}>
                        {userPlan}
                      </span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#475569] dark:text-[#E2E8F0] hover:text-[#0B1320] dark:hover:text-white hover:bg-[#F0F7FF] dark:hover:bg-[#102547] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9]" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#475569] dark:text-[#E2E8F0] hover:text-[#0B1320] dark:hover:text-white hover:bg-[#F0F7FF] dark:hover:bg-[#102547] transition-colors"
                    >
                      <User className="w-4 h-4 text-[#0284C7] dark:text-[#0EA5E9]" />
                      <span>Update Profile</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#0284C7]/25">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:text-white hover:bg-[#0284C7] dark:hover:bg-[#0284C7] transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Buttons */
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/sign-in"
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#E2E8F0] hover:text-[#0EA5E9] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-[#0284C7] hover:bg-[#0EA5E9] px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(2, 132, 199,0.5)] hover:shadow-[0_0_30px_rgba(14, 165, 233,0.8)] transition-all cursor-pointer active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#0284C7]/35 bg-[#0D1D38] text-[#E2E8F0] hover:text-white hover:border-[#0EA5E9] transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      )}

      {/* Mobile Drawer Menu (Public Site Only) */}
      {!isDashboard && isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#0284C7]/25 bg-[#0B1930] px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => {
                  setActiveHash(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-[#102547] text-[#0EA5E9] border border-[#0EA5E9]/40 font-semibold"
                    : "text-[#E2E8F0] hover:text-white hover:bg-[#102547]"
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9] shadow-[0_0_8px_#0EA5E9]" />
                )}
              </Link>
            );
          })}

          {!session?.user && (
            <div className="pt-3 border-t border-[#0284C7]/25 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-[#E2E8F0] hover:text-white rounded-xl bg-[#102547]"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold text-white bg-[#0284C7] hover:bg-[#0EA5E9] rounded-xl shadow-[0_0_18px_rgba(2, 132, 199,0.4)]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
