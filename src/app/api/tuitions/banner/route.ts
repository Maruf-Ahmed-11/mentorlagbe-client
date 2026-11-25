import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, tuitionId, title, tutorEmail, bannerImage } = body;

    if (typeof bannerImage !== "string") {
      return NextResponse.json({ error: "bannerImage string is required" }, { status: 400 });
    }

    if (!id && !tuitionId && !title) {
      return NextResponse.json({ error: "Tuition identifier is required" }, { status: 400 });
    }

    const db = await getDb();
    const tuitionsCollection = db.collection("tuitions");

    const orFilters: Record<string, any>[] = [];
    if (id) {
      if (ObjectId.isValid(String(id))) {
        orFilters.push({ _id: new ObjectId(String(id)) });
      }
      orFilters.push({ id: String(id) });
    }
    if (tuitionId) {
      if (ObjectId.isValid(String(tuitionId))) {
        orFilters.push({ _id: new ObjectId(String(tuitionId)) });
      }
      orFilters.push({ id: String(tuitionId) });
    }
    if (title && tutorEmail) {
      orFilters.push({ title: String(title), tutorEmail: String(tutorEmail).toLowerCase() });
    } else if (title) {
      orFilters.push({ title: String(title) });
    }

    const result = await tuitionsCollection.updateOne(
      { $or: orFilters },
      { $set: { bannerImage, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Tuition not found in database" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      bannerImage,
    });
  } catch (error) {
    console.error("Error persisting tuition bannerImage:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
