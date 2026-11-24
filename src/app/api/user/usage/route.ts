import { NextResponse } from "next/server";
import { getServerAuth, getTrackedUserUsage } from "@/lib/core/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryEmail = searchParams.get("email");

    const session = await getServerAuth();
    const effectiveEmail = queryEmail || session?.user?.email;

    if (!effectiveEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const usage = await getTrackedUserUsage(effectiveEmail);

    if (!usage) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(usage);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch usage";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
