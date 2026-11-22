import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (typeof (auth.api as unknown as { getJwks?: () => Promise<unknown> })?.getJwks === "function") {
      const res = await (auth.api as unknown as { getJwks: () => Promise<{ keys?: unknown[] }> }).getJwks();
      if (res && Array.isArray(res.keys)) {
        return NextResponse.json(res);
      }
    }

    const db = await getDb();
    const keySets = await db.collection("jwks").find().toArray();
    const keys = keySets.map((key) => {
      const parsedPublic =
        typeof key.publicKey === "string" ? JSON.parse(key.publicKey) : key.publicKey;
      return {
        alg: key.alg || "EdDSA",
        crv: key.crv || parsedPublic?.crv || "Ed25519",
        ...parsedPublic,
        kid: key._id ? key._id.toString() : key.id,
      };
    });

    return NextResponse.json({ keys });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve JWKS";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
