"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import AdminDashboardView from "@/components/dashboard/AdminDashboardView";
import TutorDashboardView from "@/components/dashboard/TutorDashboardView";
import StudentDashboardView from "@/components/dashboard/StudentDashboardView";

export default function DashboardOverviewPage() {
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const [livePlan, setLivePlan] = useState<string>("free");
  const [cachedUser, setCachedUser] = useState<{ name: string; email: string; role: string; plan?: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("mentorlagbe_cached_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCachedUser(parsed);
        if (parsed.plan) setLivePlan(parsed.plan.toLowerCase());
      }
    } catch {}

    const email = session?.user?.email || cachedUser?.email;
    if (!email) return;

    fetch(`/api/user/usage?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.plan) {
          setLivePlan(data.plan.toLowerCase());
          try {
            const current = JSON.parse(localStorage.getItem("mentorlagbe_cached_user") || "null") || {};
            current.plan = data.plan;
            localStorage.setItem("mentorlagbe_cached_user", JSON.stringify(current));
          } catch {}
        }
      })
      .catch(() => {});
  }, [session?.user?.email]);

  const activeUser = session?.user || cachedUser;
  const userEmail = activeUser?.email || "";
  const userRole = (activeUser as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const userName = activeUser?.name || "Member";
  const effectivePlan = livePlan === "pro" || ((activeUser as any)?.plan || "").toLowerCase() === "pro" || (cachedUser?.plan || "").toLowerCase() === "pro" ? "pro" : "free";
  const userWithPlan = { ...(activeUser as any), plan: effectivePlan };

  // When not mounted or pending without data, render identical skeleton on server and initial client hydration
  if (!mounted || (isPending && !activeUser)) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center animate-pulse">
        <div className="h-8 w-48 bg-[#E2E8F0] dark:bg-[#102547] rounded-xl mx-auto mb-4" />
        <div className="h-4 w-72 bg-[#E2E8F0]/60 dark:bg-[#102547]/60 rounded-lg mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {userRole === "admin" ? (
        <AdminDashboardView user={userWithPlan} userName={userName} userEmail={userEmail} />
      ) : userRole === "tutor" ? (
        <TutorDashboardView user={userWithPlan} userName={userName} userEmail={userEmail} />
      ) : (
        <StudentDashboardView user={userWithPlan} userName={userName} userEmail={userEmail} />
      )}
    </div>
  );
}
