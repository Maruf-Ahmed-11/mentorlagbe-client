import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerAuth } from "@/lib/core/server";

export async function GET() {
  try {
    const session = await getServerAuth();
    const email = session?.user?.email?.toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const currentUser = await db.collection("user").findOne({ email });
    const role = (currentUser?.role as string) || (session?.user as any)?.role;

    if (role !== "admin" && !email.includes("admin")) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const usersCollection = db.collection("user");
    const tuitionsCollection = db.collection("tuitions");
    const paymentsCollection = db.collection("payments");

    const [totalUsers, totalTutors, totalStudents, allTuitions, payments] = await Promise.all([
      usersCollection.countDocuments({}),
      usersCollection.countDocuments({ role: "tutor" }),
      usersCollection.countDocuments({ role: "student" }),
      tuitionsCollection.find({}).project({ approvalStatus: 1, adminVerifiedAt: 1 }).toArray(),
      paymentsCollection.find({}).sort({ createdAt: -1 }).limit(50).toArray(),
    ]);

    const pendingTuitions = allTuitions.filter((item) => {
      if (item.adminVerifiedAt) return item.approvalStatus === "pending";
      return item.approvalStatus !== "rejected";
    }).length;

    const approvedTuitions = allTuitions.filter(
      (item) => item.adminVerifiedAt && item.approvalStatus === "approved"
    ).length;

    const totalRevenue = payments.reduce((sum, p) => {
      if (p.status === "paid" || p.status === "completed") {
        return sum + Number(p.amount || 0);
      }
      return sum;
    }, 0);

    const recentPayments = payments.map((p) => ({
      id: p._id?.toString() || p.sessionId,
      sessionId: p.sessionId || "",
      paymentIntentId: p.paymentIntentId || "",
      userEmail: p.userEmail || p.customerEmail || "",
      amount: Number(p.amount || 0),
      currency: p.currency || "usd",
      role: p.role || "student",
      plan: p.plan || "pro",
      status: p.status || "paid",
      createdAt: p.createdAt || new Date().toISOString(),
    }));

    return NextResponse.json({
      totalUsers,
      totalTutors,
      totalStudents,
      pendingTuitions,
      approvedTuitions,
      totalTuitions: allTuitions.length,
      totalRevenue,
      recentPayments,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
