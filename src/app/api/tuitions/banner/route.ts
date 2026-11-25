import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { getServerAuth } from "@/lib/core/server";

export async function PATCH(request: Request) {
  try {
    const session = await getServerAuth();
    const email = session?.user?.email?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, bannerImage } = body;

    if (!id || typeof bannerImage !== "string") {
      return NextResponse.json({ error: "id and bannerImage string are required" }, { status: 400 });
    }

    const db = await getDb();
    const tuitionsCollection = db.collection("tuitions");

    const filter = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { id: String(id) }] }
      : { id: String(id) };

    const result = await tuitionsCollection.updateOne(filter, {
      $set: { bannerImage, updatedAt: new Date() },
    });

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
