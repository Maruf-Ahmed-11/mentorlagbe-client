import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerAuth } from "@/lib/core/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tuitionId = searchParams.get("tuitionId");

    if (!tuitionId) {
      return NextResponse.json({ error: "tuitionId is required" }, { status: 400 });
    }

    const db = await getDb();
    const reviews = await db
      .collection("reviews")
      .find({ tuitionId: String(tuitionId) })
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = reviews.map((r) => ({
      id: r._id?.toString() || "",
      tuitionId: r.tuitionId,
      studentName: r.studentName || "Student",
      studentEmail: r.studentEmail || "",
      studentImage: r.studentImage || null,
      rating: Number(r.rating || 5),
      comment: r.comment || "",
      createdAt: r.createdAt || new Date().toISOString(),
    }));

    const totalReviews = formatted.length;
    const averageRating =
      totalReviews > 0
        ? Number(
            (
              formatted.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            ).toFixed(1)
          )
        : 0;

    return NextResponse.json({
      reviews: formatted,
      totalReviews,
      averageRating,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerAuth();
    const body = await request.json();
    const { tuitionId, rating, comment, studentName, studentEmail, studentImage } = body;

    const effectiveEmail = (session?.user?.email || studentEmail || "").toLowerCase().trim();
    const effectiveName = session?.user?.name || studentName || "Student";

    if (!effectiveEmail) {
      return NextResponse.json(
        { error: "Please sign in as a student to submit a review" },
        { status: 401 }
      );
    }

    if (!tuitionId || !rating || !comment?.trim()) {
      return NextResponse.json(
        { error: "tuitionId, rating, and comment are required" },
        { status: 400 }
      );
    }

    const numericRating = Math.min(5, Math.max(1, Number(rating)));
    const db = await getDb();

    const userDoc = await db.collection("user").findOne({ email: effectiveEmail });
    const role = (userDoc?.role as string) || (session?.user as any)?.role || "student";
    if (role !== "student") {
      return NextResponse.json(
        { error: "Only student accounts can submit tuition reviews" },
        { status: 403 }
      );
    }

    const reviewDoc = {
      tuitionId: String(tuitionId),
      studentName: effectiveName,
      studentEmail: effectiveEmail,
      studentImage: userDoc?.image || session?.user?.image || studentImage || null,
      rating: numericRating,
      comment: comment.trim(),
      createdAt: new Date(),
    };

    const result = await db.collection("reviews").insertOne(reviewDoc);

    return NextResponse.json({
      success: true,
      review: {
        id: result.insertedId.toString(),
        ...reviewDoc,
      },
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
