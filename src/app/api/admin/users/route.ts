import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { getServerAuth } from "@/lib/core/server";

async function verifyAdmin() {
  const session = await getServerAuth();
  const email = session?.user?.email?.toLowerCase();
  if (!email) return { error: "Unauthorized", status: 401 as const };

  const db = await getDb();
  const currentUser = await db.collection("user").findOne({ email });
  const role = (currentUser?.role as string) || (session?.user as any)?.role;

  if (role !== "admin" && !email.includes("admin")) {
    return { error: "Forbidden: Admin access required", status: 403 as const };
  }

  return { db, adminEmail: email };
}

export async function GET() {
  try {
    const authResult = await verifyAdmin();
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { db } = authResult;
    const users = await db
      .collection("user")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const sanitized = users.map((u) => {
      const email = (u.email || "").toLowerCase();
      const role = u.role || (email.includes("admin") ? "admin" : "student");
      const plan = role === "admin" ? "pro" : (u.plan || "free");
      return {
        id: u._id?.toString() || u.id || "",
        name: u.name || "Unnamed User",
        email: u.email || "",
        role,
        plan,
        image: u.image || null,
        phone: u.phone || "",
        bio: u.bio || "",
        emailVerified: Boolean(u.emailVerified),
        createdAt: u.createdAt || null,
      };
    });

    return NextResponse.json({ users: sanitized });
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const authResult = await verifyAdmin();
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    const { userId, email, role, plan } = body;

    if (!userId && !email) {
      return NextResponse.json({ error: "userId or email is required" }, { status: 400 });
    }

    const { db } = authResult;
    const usersCollection = db.collection("user");

    const filter = email
      ? { email: email.toLowerCase() }
      : ObjectId.isValid(userId)
      ? { _id: new ObjectId(userId) }
      : { id: userId };

    const targetUser = await usersCollection.findOne(filter);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (targetUser.role === "admin" && role && role !== "admin") {
      return NextResponse.json(
        { error: "Cannot demote the System Administrator account" },
        { status: 400 }
      );
    }

    const updateDoc: Record<string, any> = { updatedAt: new Date() };
    if (role && ["student", "tutor"].includes(role)) {
      updateDoc.role = role;
    }
    if (plan && ["free", "pro"].includes(plan)) {
      updateDoc.plan = plan;
    }

    await usersCollection.updateOne(filter, { $set: updateDoc });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      updated: updateDoc,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
