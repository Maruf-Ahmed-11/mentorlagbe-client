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
  Sun, 
  Moon, 
  Crown,
  GraduationCap,
  ShieldCheck,
  UserCheck
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
  const [isDark, setIsDark] = useState(true);

  // Initialize theme
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

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          localStorage.removeItem("access-token");
          toast.success("Signed out successfully");
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  // Derive user info
  const user = session?.user;
  const userName = user?.name || "asdf";
  const userEmail = user?.email || "admin@mentorlagbe.com";
  // Role: default to 'admin' if email contains admin or role is admin, else user role or 'student'
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : "student");
  // Plan: admin is always PRO
  const userPlan = userRole === "admin" ? "PRO" : ((user as any)?.plan === "pro" ? "PRO" : "PRO");

  // Initials for avatar placeholder
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase() || "ML";
  };
  const initials = getInitials(userName);

  // Header Title based on route & role
  const getHeaderTitle = () => {
    if (pathname.includes("/profile")) return "Account Settings";
    if (userRole === "admin") return "Platform Admin";
    if (userRole === "tutor") return "Tutor Workspace";
    return "Student Workspace";
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Applications", href: "/dashboard/applications", icon: FileText },
    { name: "Saved Tuitions", href: "/dashboard/saved-tuitions", icon: Bookmark },
  ];

  return (
    <div className="flex h-screen w-full bg-[#080D1A] text-white overflow-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION (Matching Image 1 & 2)                                 */}
      {/* ========================================================================= */}
      <aside
        className={`relative flex flex-col justify-between border-r border-[#15233E] bg-[#0A1124] transition-all duration-300 z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top: Brand & User Profile */}
        <div>
          {/* Logo Header */}
          <div className="flex h-16 items-center px-4 border-b border-[#15233E]">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00C48C] text-[#0A1124] font-black font-mono text-sm shadow-[0_0_15px_rgba(0,196,140,0.4)]">
                ML
              </div>
              {!isCollapsed && (
                <span className="font-bold text-lg text-white tracking-tight">
                  MentorLagbe
                </span>
              )}
            </Link>
          </div>

          {/* User Profile Card */}
          <div className={`p-4 border-b border-[#15233E] ${isCollapsed ? "flex justify-center" : ""}`}>
            <div className="flex items-center gap-3">
              {/* Avatar with little crown badge */}
              <div className="relative shrink-0">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={userName}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border border-[#00C48C]/50"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00BFA5] text-[#080D1A] font-bold text-sm shadow-md">
                    {initials}
                  </div>
                )}
                {/* Crown / Verified Badge on Avatar */}
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFB800] text-black shadow-sm">
                  <Crown className="h-2.5 w-2.5 fill-black" />
                </div>
              </div>

              {/* User Name & Badges (Visible when expanded) */}
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate max-w-[90px]">
                      {userName}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
                      {userPlan}
                    </span>
                  </div>

                  {/* Dynamic Role Capsule (Admin / Tutor / Student) */}
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#14284B] text-[#38BDF8] border border-[#38BDF8]/30">
                    {userRole === "admin" ? (
                      <>
                        <ShieldCheck className="h-3 w-3 text-[#38BDF8]" />
                        <span>Admin</span>
                      </>
                    ) : userRole === "tutor" ? (
                      <>
                        <GraduationCap className="h-3 w-3 text-[#38BDF8]" />
                        <span>Tutor</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-3 w-3 text-[#38BDF8]" />
                        <span>Student</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div className="p-3 space-y-6">
            {/* MAIN MENU */}
            <div>
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  MAIN MENU
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-[#0E223D] text-[#00C48C] border border-[#00C48C]/40 shadow-sm font-semibold"
                          : "text-[#94A3B8] hover:text-white hover:bg-[#111C35]"
                      } ${isCollapsed ? "justify-center px-0" : ""}`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* PREFERENCES */}
            <div>
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  PREFERENCES
                </p>
              )}
              <Link
                href="/dashboard/profile"
                title={isCollapsed ? "Update Profile" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  pathname === "/dashboard/profile"
                    ? "bg-[#0E223D] text-[#00C48C] border border-[#00C48C]/40 shadow-sm font-semibold"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#111C35]"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
              >
                <Settings className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>Update Profile</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Sign Out & Minimize Sidebar Toggle */}
        <div className="p-3 border-t border-[#15233E] space-y-2">
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            title={isCollapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-[#F87171] hover:text-white hover:bg-[#E11D48]/20 transition-all cursor-pointer ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0 text-[#F87171]" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>

          {/* Minimize / Expand Toggle Button (Matching Requirement 2) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-[#64748B] hover:text-white hover:bg-[#111C35] transition-colors cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA WITH HEADER (Matching Image 1 & 4)                      */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#070C18]">
        
        {/* Top Navbar in Dashboard */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-[#15233E] bg-[#0A1124]">
          {/* Workspace Title */}
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {getHeaderTitle()}
          </h1>

          {/* Right Header: Theme & User Avatar */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#111C35] transition-all cursor-pointer"
            >
              {isDark ? <Sun className="h-4 w-4 text-[#F59E0B]" /> : <Moon className="h-4 w-4 text-[#38BDF8]" />}
            </button>

            {/* User Pill Button */}
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#111C35] hover:bg-[#17274B] border border-[#1E3056] transition-all cursor-pointer"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00BFA5] text-[#080D1A] font-bold text-xs">
                {initials}
              </div>
              <span className="text-xs font-semibold text-white pr-1">
                {userName}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Children (Scrollable Container) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
