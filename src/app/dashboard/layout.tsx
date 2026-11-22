"use client";

import { useState } from "react";
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
  Sparkles
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : "student");
  const userPlan = "PRO";

  // Initials for avatar placeholder
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase() || "ML";
  };
  const initials = getInitials(userName);

  // Status subtitle based on role
  const getWorkspaceBadge = () => {
    if (userRole === "admin") return "PLATFORM ADMIN // SYSTEM CORE";
    if (userRole === "tutor") return "TUTOR WORKSPACE // VERIFIED";
    return "STUDENT WORKSPACE // VERIFIED";
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Applications", href: "/dashboard/applications", icon: FileText },
    { name: "Saved Tuitions", href: "/dashboard/saved-tuitions", icon: Bookmark },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full bg-[#0A0203] text-white font-sans relative">
      
      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION (MentorLagbe Signature Crimson Aesthetic)              */}
      {/* ========================================================================= */}
      <aside
        className={`sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between border-r border-[#E11D48]/25 bg-[#130204]/95 backdrop-blur-xl transition-all duration-300 z-30 shrink-0 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top: User Profile & Nav Links */}
        <div className="overflow-y-auto py-4">
          
          {/* User Profile Card */}
          <div className={`px-4 pb-5 border-b border-[#E11D48]/20 ${isCollapsed ? "flex justify-center px-2" : ""}`}>
            <div className="flex items-center gap-3">
              {/* Avatar with gold crown badge */}
              <div className="relative shrink-0">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={userName}
                    width={42}
                    height={42}
                    className="h-10 w-10 rounded-full object-cover border-2 border-[#E11D48]/50 shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E11D48] via-[#FF1E40] to-[#FF4D6D] text-white font-black text-sm shadow-[0_0_15px_rgba(255,30,64,0.4)]">
                    {initials}
                  </div>
                )}
                {/* Crown Badge */}
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFB800] text-black shadow-sm">
                  <Crown className="h-2.5 w-2.5 fill-black" />
                </div>
              </div>

              {/* User Name & Badges (Visible when expanded) */}
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white truncate max-w-[95px]">
                      {userName}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
                      {userPlan}
                    </span>
                  </div>

                  {/* Dynamic Role Capsule (Admin / Tutor / Student) */}
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase">
                    {userRole === "admin" ? (
                      <span className="inline-flex items-center gap-1 text-[#FF1E40] bg-[#2E070F] border border-[#FF1E40]/40 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Admin</span>
                      </span>
                    ) : userRole === "tutor" ? (
                      <span className="inline-flex items-center gap-1 text-[#FFB800] bg-[#281804] border border-[#FFB800]/40 px-2 py-0.5 rounded-full">
                        <GraduationCap className="h-3 w-3" />
                        <span>Tutor</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#FF4D6D] bg-[#2A0612] border border-[#FF4D6D]/40 px-2 py-0.5 rounded-full">
                        <UserCheck className="h-3 w-3" />
                        <span>Student</span>
                      </span>
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
                <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#BFA5AA] mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] shadow-[0_0_6px_#FF1E40]" />
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
                          ? "bg-[#2E070F] text-white border border-[#FF1E40]/60 shadow-[0_0_20px_rgba(255,30,64,0.3)] font-semibold"
                          : "text-[#F4E2E5]/80 hover:text-white hover:bg-[#1C0307] hover:border hover:border-[#E11D48]/30"
                      } ${isCollapsed ? "justify-center px-0" : ""}`}
                    >
                      <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-[#FF1E40]" : "text-[#BFA5AA]"}`} />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* PREFERENCES */}
            <div>
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#BFA5AA] mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D6D] shadow-[0_0_6px_#FF4D6D]" />
                  <span>PREFERENCES</span>
                </p>
              )}
              <Link
                href="/dashboard/profile"
                title={isCollapsed ? "Update Profile" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  pathname === "/dashboard/profile"
                    ? "bg-[#2E070F] text-white border border-[#FF1E40]/60 shadow-[0_0_20px_rgba(255,30,64,0.3)] font-semibold"
                    : "text-[#F4E2E5]/80 hover:text-white hover:bg-[#1C0307] hover:border hover:border-[#E11D48]/30"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
              >
                <Settings className={`h-4.5 w-4.5 shrink-0 ${pathname === "/dashboard/profile" ? "text-[#FF1E40]" : "text-[#BFA5AA]"}`} />
                {!isCollapsed && <span>Update Profile</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Sign Out & Collapse Sidebar Toggle */}
        <div className="p-3 border-t border-[#E11D48]/20 space-y-2 bg-[#100103]">
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            title={isCollapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-[#E11D48]/30 transition-all cursor-pointer ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <LogOut className="h-4 w-4 shrink-0 text-rose-400" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>

          {/* Minimize / Expand Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl text-[#BFA5AA] hover:text-white hover:bg-[#1C0307] border border-transparent hover:border-[#E11D48]/30 transition-all cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-[#FF1E40]" />
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-[#BFA5AA]">
                <ChevronLeft className="h-4 w-4 text-[#FF1E40]" />
                <span>Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN WORKSPACE CONTENT AREA                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0203] relative overflow-hidden">
        
        {/* Ambient Crimson Aura */}
        <div className="absolute top-0 right-1/4 w-[750px] h-[400px] bg-[radial-gradient(ellipse_at_top,_rgba(225,29,72,0.14)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        {/* Top Status Bar (Cyber-Academic Header) */}
        <div className="h-12 border-b border-[#E11D48]/15 bg-[#120205]/60 backdrop-blur-md px-6 flex items-center justify-between text-xs relative z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF1E40] animate-pulse shadow-[0_0_8px_#FF1E40]" />
            <span className="font-mono font-bold tracking-wider text-[#FF1E40]">
              {getWorkspaceBadge()}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#BFA5AA] font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>ENCRYPTED // REAL-TIME SESSION</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 relative z-10">
          {children}
        </main>
      </div>

    </div>
  );
}
