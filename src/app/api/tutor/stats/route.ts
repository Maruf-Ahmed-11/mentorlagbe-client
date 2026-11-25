import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerAuth } from "@/lib/core/server";

export async function GET(request: Request) {
  try {
    const session = await getServerAuth();
    const { searchParams } = new URL(request.url);
    const queryEmail = searchParams.get("email")?.toLowerCase();
    const effectiveEmail = queryEmail || session?.user?.email?.toLowerCase();

    if (!effectiveEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await getDb();
    const userDoc = await db.collection("user").findOne({ email: effectiveEmail });
    const tuitionsCollection = db.collection("tuitions");
    const applicationsCollection = db.collection("applications");

    const tutorTuitions = await tuitionsCollection
      .find({ tutorEmail: effectiveEmail })
      .project({ _id: 1, approvalStatus: 1, adminVerifiedAt: 1, isActive: 1 })
      .toArray();

    const tuitionIds = tutorTuitions.map((t) => t._id.toString());
    const totalTuitions = tutorTuitions.length;
    const activeAndApproved = tutorTuitions.filter((t) => {
      const approved = t.approvalStatus === "approved" || Boolean(t.adminVerifiedAt);
      const active = t.isActive !== false;
      return approved && active;
    }).length;

    const appQuery =
      tuitionIds.length > 0
        ? { $or: [{ tutorEmail: effectiveEmail }, { tuitionId: { $in: tuitionIds } }] }
        : { tutorEmail: effectiveEmail };

    const totalApplicants = await applicationsCollection.countDocuments(appQuery);
    const plan = (userDoc?.plan as string) || "free";

    return NextResponse.json({
      totalTuitions,
      activeAndApproved,
      totalApplicants,
      plan,
    });
  } catch (error) {
    console.error("Error fetching tutor stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
