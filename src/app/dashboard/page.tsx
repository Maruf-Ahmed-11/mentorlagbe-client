"use client";

import { authClient } from "@/lib/auth-client";
import AdminDashboardView from "@/components/dashboard/AdminDashboardView";
import TutorDashboardView from "@/components/dashboard/TutorDashboardView";
import StudentDashboardView from "@/components/dashboard/StudentDashboardView";

export default function DashboardOverviewPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email || "admin@mentorlagbe.com";
  const userRole = (user as any)?.role || (userEmail.toLowerCase().includes("admin") ? "admin" : (userEmail.toLowerCase().includes("tutor") || userEmail.toLowerCase().includes("teacher") ? "tutor" : "student"));
  const userName = user?.name || "Member";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {userRole === "admin" ? (
        <AdminDashboardView user={user} userName={userName} userEmail={userEmail} />
      ) : userRole === "tutor" ? (
        <TutorDashboardView user={user} userName={userName} userEmail={userEmail} />
      ) : (
        <StudentDashboardView user={user} userName={userName} userEmail={userEmail} />
      )}
    </div>
  );
}
