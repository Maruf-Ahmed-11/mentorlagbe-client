"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import AdminDashboardView from "@/components/dashboard/AdminDashboardView";
import TutorDashboardView from "@/components/dashboard/TutorDashboardView";
import StudentDashboardView from "@/components/dashboard/StudentDashboardView";

export default function DashboardOverviewPage() {
  const { data: session, isPending } = authClient.useSession();

  // Instant cached user from localStorage to eliminate demo admin flash
  const [cachedUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mentorlagbe_cached_user");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return null;
  });

  const activeUser = session?.user || cachedUser;
  const userEmail = activeUser?.email || "";
  const userRole = (activeUser as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const userName = activeUser?.name || "Member";

  if (isPending && !activeUser) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center animate-pulse">
        <div className="h-8 w-48 bg-[#EADCDD] dark:bg-[#2A060C] rounded-xl mx-auto mb-4" />
        <div className="h-4 w-72 bg-[#EADCDD]/60 dark:bg-[#2A060C]/60 rounded-lg mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {userRole === "admin" ? (
        <AdminDashboardView user={activeUser as any} userName={userName} userEmail={userEmail} />
      ) : userRole === "tutor" ? (
        <TutorDashboardView user={activeUser as any} userName={userName} userEmail={userEmail} />
      ) : (
        <StudentDashboardView user={activeUser as any} userName={userName} userEmail={userEmail} />
      )}
    </div>
  );
}
