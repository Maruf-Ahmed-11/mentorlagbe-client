import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";

export interface UserUsageInfo {
  userId: string;
  email: string;
  name: string;
  image?: string | null;
  role: "tutor" | "student" | "admin";
  plan: "free" | "pro";
  tuitionsCount: number;
  applicationsCount: number;
  canPost: boolean;
  canApply: boolean;
  tutorFreeLimit: number;
  studentFreeLimit: number;
}

/**
 * Common server-side authentication tracking utility using Next.js headers()
 */
export async function getServerAuth() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    return session;
  } catch (err) {
    console.error("Error retrieving server auth session:", err);
    return null;
  }
}

/**
 * Tracks current user usage limits using MongoDB countDocuments
 * Tutors: 2 free tuition posts (Unlimited for Pro)
 * Students: 10 free applications (Unlimited for Pro)
 */
export async function getTrackedUserUsage(userEmail: string): Promise<UserUsageInfo | null> {
  if (!userEmail) return null;

  try {
    const db = await getDb();
    const usersCollection = db.collection("user");
    const tuitionsCollection = db.collection("tuitions");
    const applicationsCollection = db.collection("applications");

    const userDoc = await usersCollection.findOne({ email: userEmail });
    const role = (userDoc?.role as "tutor" | "student" | "admin") || "student";
    const plan = (userDoc?.plan as "free" | "pro") || "free";
    const isPro = plan === "pro" || role === "admin";

    // Count tuitions and applications using countDocuments
    const [tuitionsCount, applicationsCount] = await Promise.all([
      tuitionsCollection.countDocuments({ tutorEmail: userEmail }),
      applicationsCollection.countDocuments({ studentEmail: userEmail }),
    ]);

    const tutorFreeLimit = 2;
    const studentFreeLimit = 10;

    const canPost = isPro || tuitionsCount < tutorFreeLimit;
    const canApply = isPro || applicationsCount < studentFreeLimit;

    return {
      userId: userDoc?._id?.toString() || userDoc?.id || "",
      email: userEmail,
      name: userDoc?.name || "",
      image: userDoc?.image || null,
      role,
      plan: isPro ? "pro" : "free",
      tuitionsCount,
      applicationsCount,
      canPost,
      canApply,
      tutorFreeLimit,
      studentFreeLimit,
    };
  } catch (err) {
    console.error("Error getting tracked user usage:", err);
    return null;
  }
}
