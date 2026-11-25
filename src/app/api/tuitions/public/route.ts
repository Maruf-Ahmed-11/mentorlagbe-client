import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const topRated = searchParams.get("topRated") === "true";
    const q = (searchParams.get("q") || "").trim().toLowerCase();

    const db = await getDb();
    const tuitionsCollection = db.collection("tuitions");
    const reviewsCollection = db.collection("reviews");

    // Single tuition lookup by _id or custom id
    if (id) {
      const filter = ObjectId.isValid(id)
        ? { $or: [{ _id: new ObjectId(id) }, { id }] }
        : { id };
      const doc = await tuitionsCollection.findOne(filter);
      if (!doc) {
        return NextResponse.json({ error: "Tuition not found" }, { status: 404 });
      }
      return NextResponse.json({
        ...doc,
        _id: doc._id?.toString(),
        id: doc._id?.toString() || doc.id,
      });
    }

    // Aggregate review averages & counts per tuitionId
    const [docs, reviewStats] = await Promise.all([
      tuitionsCollection
        .find({
          approvalStatus: "approved",
          isActive: { $ne: false },
        })
        .sort({ createdAt: -1 })
        .toArray(),
      reviewsCollection
        .aggregate([
          {
            $group: {
              _id: "$tuitionId",
              avgRating: { $avg: "$rating" },
              reviewCount: { $sum: 1 },
            },
          },
        ])
        .toArray(),
    ]);

    const statsMap = new Map<string, { averageRating: number; reviewCount: number }>();
    for (const s of reviewStats) {
      if (s._id) {
        statsMap.set(String(s._id), {
          averageRating: Number((s.avgRating || 0).toFixed(1)),
          reviewCount: Number(s.reviewCount || 0),
        });
      }
    }

    let formatted = docs.map((t) => {
      const tid = t._id?.toString() || t.id || "";
      const stat = statsMap.get(tid) || statsMap.get(String(t.id || "")) || {
        averageRating: 0,
        reviewCount: 0,
      };
      return {
        _id: t._id?.toString() || "",
        id: tid,
        title: t.title || "",
        subject: t.subject || "General",
        classLevel: t.classLevel || "",
        mode: t.mode || "Offline Tuition",
        location: t.location || "Online",
        schedule: t.schedule || "3 days / week",
        monthlyFee: Number(t.monthlyFee || 0),
        bannerImage: t.bannerImage || "",
        description: t.description || "",
        tutorEmail: t.tutorEmail || "",
        tutorName: t.tutorName || "Verified Mentor",
        approvalStatus: t.approvalStatus || "approved",
        isActive: t.isActive !== false,
        averageRating: stat.averageRating,
        reviewCount: stat.reviewCount,
        createdAt: t.createdAt || null,
      };
    });

    if (topRated) {
      const sortedByRating = [...formatted].sort((a, b) => {
        if (b.averageRating !== a.averageRating) {
          return b.averageRating - a.averageRating;
        }
        if (b.reviewCount !== a.reviewCount) {
          return b.reviewCount - a.reviewCount;
        }
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      return NextResponse.json({ tuition: sortedByRating[0] || null });
    }

    if (q) {
      formatted = formatted.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.classLevel.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.tutorName.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ tuitions: formatted });
  } catch (error) {
    console.error("Error fetching public tuitions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
