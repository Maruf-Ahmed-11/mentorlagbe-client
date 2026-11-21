"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "./Logo";
import { Sun, Moon, Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tuitions", href: "/tuitions" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
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
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07080B]/90 backdrop-blur-md border-b border-[#1E2335] transition-colors duration-200">
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
                    ? "text-[#7C8CE4] font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7C8CE4] to-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(124,140,228,0.8)]" />
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
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0E1018] border border-[#1E2335] text-[#7C8CE4] hover:text-[#38BDF8] hover:border-[#7C8CE4]/50 hover:bg-[#141724] transition-all cursor-pointer shadow-sm"
          >
            {isDark ? (
              <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* User State */}
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-[#141724] border border-[#1E2335]" />
          ) : session?.user ? (
            /* User Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-label="Toggle user menu"
                className="flex items-center gap-2 rounded-full p-0.5 border-2 border-[#1E2335] hover:border-[#7C8CE4] transition-all focus:outline-none focus:ring-2 focus:ring-[#7C8CE4] cursor-pointer"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#191E30] text-xs font-bold text-[#7C8CE4]">
                    {session.user.name?.[0] || "U"}
                  </div>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#0E1018] border border-[#1E2335] p-2 shadow-[0_15px_50px_rgba(0,0,0,0.9)] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 border-b border-[#1E2335]">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7C8CE4] mb-1">
                      ACTIVE ACCOUNT
                    </p>
                    <p className="text-sm font-semibold text-white truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
                      {session.user.email}
                    </p>
                  </div>

                  <div className="py-2 space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-[#141724] transition-colors"
                    >
                      <User className="w-4 h-4 text-[#7C8CE4]" />
                      My Profile
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-[#1E2335]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-white hover:bg-[#BE123C] transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Buttons */
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:text-[#7C8CE4] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-[#7C8CE4] px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-[#07080B] shadow-[0_0_18px_rgba(124,140,228,0.35)] hover:bg-[#94A3F2] hover:shadow-[0_0_24px_rgba(56,189,248,0.55)] transition-all cursor-pointer active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#1E2335] bg-[#0E1018] text-slate-300 hover:text-white hover:border-[#7C8CE4] transition-all cursor-pointer"
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
        <div className="md:hidden border-t border-[#1E2335] bg-[#0A0C12] px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
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
                    ? "bg-[#191E30] text-[#7C8CE4] border border-[#7C8CE4]/40 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-[#141724]"
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C8CE4] shadow-[0_0_8px_#7C8CE4]" />
                )}
              </Link>
            );
          })}

          {!session?.user && (
            <div className="pt-3 border-t border-[#1E2335] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-slate-300 hover:text-white rounded-xl bg-[#141724]"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold text-[#07080B] bg-[#7C8CE4] hover:bg-[#94A3F2] rounded-xl shadow-[0_0_15px_rgba(124,140,228,0.3)]"
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
