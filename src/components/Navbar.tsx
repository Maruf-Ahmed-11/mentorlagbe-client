"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "./Logo";
import { Sun, Moon, Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

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
    return name.slice(0, 2).toUpperCase() || "AS";
  };

  const userName = session?.user?.name || "asdf";
  const userEmail = session?.user?.email || "admin@mentorlagbe.com";
  const rawRole = (session?.user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : "student");
  const roleLabel = rawRole === "admin" ? "Admin" : rawRole === "tutor" ? "Tutor" : "Student";
  const userPlan = "PRO";
  const initials = getInitials(userName);

  // Initialize theme from document or localStorage
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isActive = (path: string) => {
    if (path === "/" || path === "/#home") return pathname === "/";
    return pathname === path;
  };

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Browse Tuitions", href: "/#tuitions" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About", href: "/#about" },
    { name: "Pricing", href: "/#pricing" },
    ...(session
      ? [
          { name: "Post Tuition", href: "/post-tuition" },
          { name: "My Tuitions", href: "/my-tuitions" },
        ]
      : []),
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
          toast.success("Logged out successfully");
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#130204]/90 backdrop-blur-xl border-b border-[#E11D48]/25 transition-colors duration-200">
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
                className={`relative py-1 transition-colors duration-150 ${
                  active
                    ? "text-[#FF1E40] font-semibold drop-shadow-[0_0_10px_rgba(255,30,64,0.7)]"
                    : "text-[#F4E2E5] hover:text-white"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E11D48] via-[#FF1E40] to-[#FF4D6D] rounded-full shadow-[0_0_12px_rgba(255,30,64,0.9)]" />
                )}
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
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C0307] border border-[#E11D48]/35 text-[#FF1E40] hover:text-white hover:border-[#FF1E40] hover:bg-[#2A060C] hover:shadow-[0_0_15px_rgba(255,30,64,0.3)] transition-all cursor-pointer shadow-sm"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-[#FF1E40] transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-[#FF4D6D] transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* User State */}
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-[#111C35] border border-[#15233E]" />
          ) : session?.user ? (
            /* User Pill & Dropdown (Matching Image 7) */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-label="Toggle user menu"
                className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1 bg-[#0A1124] border border-[#15233E] hover:border-[#00C48C]/50 transition-all cursor-pointer shadow-sm group"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={userName}
                    width={28}
                    height={28}
                    unoptimized
                    className="h-7 w-7 rounded-full object-cover border border-[#00C48C]/40"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00BFA5] text-[#080D1A] font-bold text-xs">
                    {initials}
                  </div>
                )}

                <div className="flex flex-col text-left leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white max-w-[80px] truncate">
                      {userName}
                    </span>
                    <span className="px-1 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
                      {userPlan}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] font-medium mt-0.5">
                    {roleLabel}
                  </span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-white transition-transform" />
              </button>

              {/* Profile Dropdown Menu (Matching Image 7) */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#0A1124] border border-[#15233E] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-2 border-b border-[#15233E] space-y-1">
                    <p className="text-sm font-bold text-white truncate">
                      {userName}
                    </p>
                    <p className="text-xs text-[#94A3B8] font-mono truncate">
                      {userEmail}
                    </p>
                    <div className="flex items-center gap-2 pt-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0F223D] text-[#38BDF8] border border-[#38BDF8]/30">
                        {roleLabel}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#231A0F] text-[#FFB800] border border-[#FFB800]/30">
                        {userPlan}
                      </span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#111C35] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#00C48C]" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-[#111C35] transition-colors"
                    >
                      <User className="w-4 h-4 text-[#00C48C]" />
                      <span>Update Profile</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-[#15233E]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#F87171] hover:text-white hover:bg-[#E11D48]/20 transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-[#F87171]" />
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
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#F4E2E5] hover:text-[#FF1E40] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-[#E11D48] hover:bg-[#FF1E40] px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(255,30,64,0.8)] transition-all cursor-pointer active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#E11D48]/35 bg-[#1C0307] text-[#F4E2E5] hover:text-white hover:border-[#FF1E40] transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E11D48]/25 bg-[#140205] px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-[#3A0912] text-[#FF1E40] border border-[#FF1E40]/40 font-semibold"
                    : "text-[#F4E2E5] hover:text-white hover:bg-[#2A060C]"
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] shadow-[0_0_8px_#FF1E40]" />
                )}
              </Link>
            );
          })}

          {!session?.user && (
            <div className="pt-3 border-t border-[#E11D48]/25 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-[#F4E2E5] hover:text-white rounded-xl bg-[#2A060C]"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold text-white bg-[#E11D48] hover:bg-[#FF1E40] rounded-xl shadow-[0_0_18px_rgba(225,29,72,0.4)]"
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
