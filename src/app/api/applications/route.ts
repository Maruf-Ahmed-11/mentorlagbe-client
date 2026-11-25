import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { getServerAuth, getTrackedUserUsage } from "@/lib/core/server";

export async function GET(request: Request) {
  try {
    const session = await getServerAuth();
    const { searchParams } = new URL(request.url);
    const roleParam = searchParams.get("role");
    const emailParam = searchParams.get("email")?.toLowerCase();

    const effectiveEmail = emailParam || session?.user?.email?.toLowerCase();
    if (!effectiveEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const applicationsCollection = db.collection("applications");
    const tuitionsCollection = db.collection("tuitions");

    const userDoc = await db.collection("user").findOne({ email: effectiveEmail });
    const role = roleParam || (userDoc?.role as string) || (session?.user as any)?.role || "student";

    if (role === "tutor") {
      // Find all tuitions owned by this tutor to match both tutorEmail and tuitionId
      const tutorTuitions = await tuitionsCollection
        .find({ tutorEmail: effectiveEmail })
        .project({ _id: 1 })
        .toArray();
      const tuitionIds = tutorTuitions.map((t) => t._id.toString());

      const query =
        tuitionIds.length > 0
          ? { $or: [{ tutorEmail: effectiveEmail }, { tuitionId: { $in: tuitionIds } }] }
          : { tutorEmail: effectiveEmail };

      const apps = await applicationsCollection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      const formatted = apps.map((a) => ({
        id: a._id?.toString() || "",
        tuitionId: a.tuitionId || "",
        tuitionTitle: a.tuitionTitle || "Tuition Session",
        name: a.studentName || "Student",
        email: a.studentEmail || "",
        phone: a.studentPhone || "",
        preferredSchedule: a.preferredSchedule || "",
        note: a.note || "",
        status: a.status || "Pending",
        appliedDate: a.createdAt
          ? new Date(a.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recently",
        createdAt: a.createdAt || null,
      }));

      return NextResponse.json({ applications: formatted });
    }

    // Student view: applications submitted by this student
    const apps = await applicationsCollection
      .find({ studentEmail: effectiveEmail })
      .sort({ createdAt: -1 })
      .toArray();

    // Enrich with monthlyFee from tuitions collection
    const appTuitionObjectIds = apps
      .map((a) => a.tuitionId)
      .filter((tid) => ObjectId.isValid(tid))
      .map((tid) => new ObjectId(tid));
    const tuitionFeeMap = new Map<string, number>();
    if (appTuitionObjectIds.length > 0) {
      const tuitionDocs = await tuitionsCollection
        .find({ _id: { $in: appTuitionObjectIds } })
        .project({ _id: 1, monthlyFee: 1 })
        .toArray();
      for (const t of tuitionDocs) {
        tuitionFeeMap.set(t._id.toString(), Number(t.monthlyFee || 0));
      }
    }

    const formatted = apps.map((a) => ({
      id: a._id?.toString() || "",
      tuitionId: a.tuitionId || "",
      tuitionTitle: a.tuitionTitle || "Tuition Session",
      monthlyFee: Number(a.monthlyFee ?? tuitionFeeMap.get(String(a.tuitionId)) ?? 0),
      tutorName: a.tutorName || "Mentor",
      tutorEmail: a.tutorEmail || "",
      preferredSchedule: a.preferredSchedule || "",
      note: a.note || "",
      status: a.status || "Pending",
      appliedDate: a.createdAt
        ? new Date(a.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Recently",
      createdAt: a.createdAt || null,
    }));

    return NextResponse.json({ applications: formatted });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerAuth();
    const body = await request.json();
    const {
      tuitionId,
      tuitionTitle,
      tutorEmail,
      tutorName,
      studentPhone,
      preferredSchedule,
      note,
      studentEmail: bodyEmail,
      studentName: bodyName,
    } = body;

    const effectiveEmail = (session?.user?.email || bodyEmail || "").toLowerCase().trim();
    const effectiveName = session?.user?.name || bodyName || "Student";

    if (!effectiveEmail) {
      return NextResponse.json({ error: "Authentication required to apply" }, { status: 401 });
    }
    if (!tuitionId) {
      return NextResponse.json({ error: "tuitionId is required" }, { status: 400 });
    }

    const usage = await getTrackedUserUsage(effectiveEmail);
    if (usage && usage.role === "tutor") {
      return NextResponse.json(
        { error: "Tutor accounts cannot apply for tuitions" },
        { status: 403 }
      );
    }
    if (usage && !usage.canApply) {
      return NextResponse.json(
        {
          error: `Free limit reached (${usage.applicationsCount}/${usage.studentFreeLimit}). Upgrade to Pro for unlimited applications.`,
          limitReached: true,
        },
        { status: 403 }
      );
    }

    const db = await getDb();
    const applicationsCollection = db.collection("applications");

    // Prevent duplicate application to the same tuition
    const existing = await applicationsCollection.findOne({
      tuitionId: String(tuitionId),
      studentEmail: effectiveEmail,
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied for this tuition listing." },
        { status: 409 }
      );
    }

    const doc = {
      tuitionId: String(tuitionId),
      tuitionTitle: tuitionTitle || "Tuition Session",
      tutorEmail: (tutorEmail || "").toLowerCase().trim(),
      tutorName: tutorName || "Mentor",
      studentName: effectiveName,
      studentEmail: effectiveEmail,
      studentPhone: (studentPhone || "").trim(),
      preferredSchedule: (preferredSchedule || "").trim(),
      note: (note || "").trim(),
      status: "Pending",
      createdAt: new Date(),
    };

    const result = await applicationsCollection.insertOne(doc);

    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
      application: { ...doc, id: result.insertedId.toString() },
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerAuth();
    const email = session?.user?.email?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !["Pending", "Accepted", "Rejected"].includes(status)) {
      return NextResponse.json({ error: "Valid id and status are required" }, { status: 400 });
    }

    const db = await getDb();
    const applicationsCollection = db.collection("applications");

    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };
    const existing = await applicationsCollection.findOne(filter);
    if (!existing) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Only the tutor who owns this tuition can accept or reject applications
    if (existing.tutorEmail && existing.tutorEmail.toLowerCase() !== email) {
      return NextResponse.json(
        { error: "Forbidden: Only the tuition owner can update application status" },
        { status: 403 }
      );
    }

    await applicationsCollection.updateOne(filter, {
      $set: { status, updatedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      id,
      status,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerAuth();
    const email = session?.user?.email?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Application id is required" }, { status: 400 });
    }

    const db = await getDb();
    const applicationsCollection = db.collection("applications");
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };
    const existing = await applicationsCollection.findOne(filter);

    if (!existing) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if ((existing.studentEmail || "").toLowerCase() !== email) {
      return NextResponse.json(
        { error: "Forbidden: You can only cancel your own applications" },
        { status: 403 }
      );
    }

    if (String(existing.status || "Pending").toLowerCase() !== "pending") {
      return NextResponse.json(
        { error: "Only pending applications can be cancelled" },
        { status: 400 }
      );
    }

    await applicationsCollection.deleteOne(filter);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
