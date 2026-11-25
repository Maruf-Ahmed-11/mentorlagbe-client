import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const topRated = searchParams.get("topRated") === "true";
    const q = (searchParams.get("q") || "").trim();
    const subject = (searchParams.get("subject") || "").trim();
    const classLevel = (searchParams.get("classLevel") || "").trim();
    const mode = (searchParams.get("mode") || "").trim();

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

    const basePublicFilter = {
      approvalStatus: "approved",
      isActive: { $ne: false },
    };

    const mongoFilter: Record<string, unknown> = { ...basePublicFilter };

    if (subject && subject.toLowerCase() !== "all") {
      mongoFilter.subject = { $regex: `^${escapeRegex(subject)}$`, $options: "i" };
    }
    if (classLevel && classLevel.toLowerCase() !== "all") {
      mongoFilter.classLevel = { $regex: `^${escapeRegex(classLevel)}$`, $options: "i" };
    }
    if (mode && mode.toLowerCase() !== "all") {
      mongoFilter.mode = { $regex: escapeRegex(mode), $options: "i" };
    }
    if (q) {
      const safeQ = escapeRegex(q);
      mongoFilter.$or = [
        { title: { $regex: safeQ, $options: "i" } },
        { subject: { $regex: safeQ, $options: "i" } },
        { classLevel: { $regex: safeQ, $options: "i" } },
        { location: { $regex: safeQ, $options: "i" } },
        { tutorName: { $regex: safeQ, $options: "i" } },
      ];
    }

    // Aggregate review averages & counts per tuitionId + distinct facets
    const [docs, reviewStats, facetSubjects, facetClassLevels, facetModes] = await Promise.all([
      tuitionsCollection
        .find(mongoFilter)
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
      tuitionsCollection.distinct("subject", basePublicFilter),
      tuitionsCollection.distinct("classLevel", basePublicFilter),
      tuitionsCollection.distinct("mode", basePublicFilter),
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

    return NextResponse.json({
      tuitions: formatted,
      facets: {
        subjects: (facetSubjects || []).filter(Boolean),
        classLevels: (facetClassLevels || []).filter(Boolean),
        modes: (facetModes || []).filter(Boolean),
      },
    });
  } catch (error) {
    console.error("Error fetching public tuitions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
