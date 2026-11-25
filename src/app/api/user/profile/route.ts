import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection("user").findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const effectiveRole = user.role || (email.toLowerCase().includes("admin") ? "admin" : "student");

    return NextResponse.json({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: user.bio || "",
      role: effectiveRole,
      plan: effectiveRole === "admin" ? "pro" : (user.plan || "free"),
      image: user.image || null,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { email, name, phone, bio, image } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await getDb();
    const updateDoc: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updateDoc.name = name;
    if (phone !== undefined) updateDoc.phone = phone;
    if (bio !== undefined) updateDoc.bio = bio;
    if (image !== undefined) updateDoc.image = image;

    await db.collection("user").updateOne(
      { email: email.toLowerCase() },
      { $set: updateDoc },
      { upsert: false }
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        email: email.toLowerCase(),
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(bio !== undefined && { bio }),
        ...(image !== undefined && { image }),
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
