import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    // BetterAuth with mongoAdapter creates the "user" collection, but check both "user" and "users"
    const adminUser =
      (await db.collection("user").findOne({ role: "admin" })) ||
      (await db.collection("users").findOne({ role: "admin" }));

    return NextResponse.json({
      hasAdmin: Boolean(adminUser),
    });
  } catch (error) {
    console.error("Error checking admin existence:", error);
    // If DB is unreachable or empty, default to false
    return NextResponse.json({
      hasAdmin: false,
    });
  }
}
