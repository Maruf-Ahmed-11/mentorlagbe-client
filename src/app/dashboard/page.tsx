"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import AdminDashboardView from "@/components/dashboard/AdminDashboardView";
import TutorDashboardView from "@/components/dashboard/TutorDashboardView";
import StudentDashboardView from "@/components/dashboard/StudentDashboardView";

export default function DashboardOverviewPage() {
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const [cachedUser, setCachedUser] = useState<{ name: string; email: string; role: string; plan?: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("mentorlagbe_cached_user");
      if (saved) setCachedUser(JSON.parse(saved));
    } catch {}
  }, []);

  const activeUser = session?.user || cachedUser;
  const userEmail = activeUser?.email || "";
  const userRole = (activeUser as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const userName = activeUser?.name || "Member";

  // When not mounted or pending without data, render identical skeleton on server and initial client hydration
  if (!mounted || (isPending && !activeUser)) {
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
