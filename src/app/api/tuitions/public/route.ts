import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const q = (searchParams.get("q") || "").trim().toLowerCase();

    const db = await getDb();
    const tuitionsCollection = db.collection("tuitions");

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

    // Fetch all approved & active tuitions for public marketplace
    const docs = await tuitionsCollection
      .find({
        approvalStatus: "approved",
        isActive: { $ne: false },
      })
      .sort({ createdAt: -1 })
      .toArray();

    let formatted = docs.map((t) => ({
      _id: t._id?.toString() || "",
      id: t._id?.toString() || t.id || "",
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
      createdAt: t.createdAt || null,
    }));

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
