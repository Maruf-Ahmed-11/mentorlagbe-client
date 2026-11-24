import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerAuth } from "@/lib/core/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    // 1. Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (!session || session.payment_status !== "paid") {
      return NextResponse.json(
        { 
          error: "Payment has not been completed on Stripe",
          paymentStatus: session?.payment_status 
        },
        { status: 400 }
      );
    }

    // 2. Identify currently authenticated user
    const authSession = await getServerAuth();
    const currentEmail = (authSession?.user?.email || "").toLowerCase().trim();
    const sessionEmail = (
      session.customer_email || 
      session.metadata?.userEmail || 
      session.customer_details?.email || 
      ""
    ).toLowerCase().trim();

    // Anti-spoofing check: session email vs current logged in user
    if (currentEmail && sessionEmail && currentEmail !== sessionEmail) {
      return NextResponse.json(
        { error: "Forbidden: Checkout session does not match logged-in user account" },
        { status: 403 }
      );
    }

    const effectiveEmail = sessionEmail || currentEmail;
    const db = await getDb();
    const paymentsCollection = db.collection("payments");
    const usersCollection = db.collection("user");

    // 3. Anti-replay check: prevent multiple users claiming the same checkout session
    const existingPayment = await paymentsCollection.findOne({ sessionId });
    if (existingPayment) {
      if (existingPayment.userEmail && currentEmail && existingPayment.userEmail.toLowerCase() !== currentEmail) {
        return NextResponse.json(
          { error: "Conflict: This checkout session was already used by another user account" },
          { status: 409 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "Payment already verified and Pro membership active.",
        payment: existingPayment,
        paymentIntentId: existingPayment.paymentIntentId,
        amount: existingPayment.amount,
        plan: "pro",
      });
    }

    // 4. Extract Payment Intent ID and Amount
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || session.id;

    const amount = (session.amount_total || 0) / 100;
    const role = session.metadata?.role || (amount >= 15 ? "tutor" : "student");

    const paymentRecord = {
      sessionId: session.id,
      paymentIntentId,
      userId: session.metadata?.userId || authSession?.user?.id || "",
      userEmail: effectiveEmail,
      customerEmail: session.customer_details?.email || session.customer_email || effectiveEmail,
      amount,
      currency: session.currency || "usd",
      plan: "pro",
      role,
      status: "paid",
      createdAt: new Date(),
    };

    // 5. Insert payment record into payments collection
    await paymentsCollection.insertOne(paymentRecord);

    // 6. Update user's plan to 'pro' in MongoDB users collection
    if (effectiveEmail) {
      await usersCollection.updateOne(
        { email: { $regex: new RegExp(`^${effectiveEmail}$`, "i") } },
        { $set: { plan: "pro", updatedAt: new Date() } }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pro plan activated successfully!",
      payment: paymentRecord,
      paymentIntentId,
      amount,
      currency: session.currency || "usd",
      plan: "pro",
      role,
    });
  } catch (err: unknown) {
    console.error("Payment verification error:", err);
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "session_id parameter is required" }, { status: 400 });
    }

    // Reuse POST logic with the provided sessionId
    const fakeReq = new Request(req.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });

    return await POST(fakeReq);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
