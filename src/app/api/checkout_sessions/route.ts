import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getServerAuth } from "@/lib/core/server";

export const TUTOR_PRICE_ID = "price_1UfDp4FE0yzRsXvaEsBsvGLU"; // $15 Pro Tutor
export const STUDENT_PRICE_ID = "price_1UfEJdFE0yzRsXvab17JDSqU"; // $10 Pro Student

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || headersList.get("referer") || "http://localhost:3000";
    const cleanOrigin = origin.replace(/\/$/, "");

    // Get current authenticated user
    const session = await getServerAuth();
    const user = session?.user;

    // Parse requested plan from JSON or FormData or query params
    let plan = "tutor";
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      plan = body.plan || plan;
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        plan = (formData.get("plan") as string) || plan;
      }
    }

    const isStudent = plan.toLowerCase() === "student";
    const selectedPriceId = isStudent ? STUDENT_PRICE_ID : TUTOR_PRICE_ID;
    const planRole = isStudent ? "student" : "tutor";

    // Create Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user?.email || undefined,
      metadata: {
        userId: user?.id || "",
        userEmail: user?.email || "",
        role: planRole,
        plan: "pro",
        integration_identifier: "mentor_lagbe_web_001",
      },
      client_reference_id: user?.id || undefined,
      success_url: `${cleanOrigin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cleanOrigin}/payment/cancel`,
    });

    if (contentType.includes("application/json")) {
      return NextResponse.json({ url: checkoutSession.url, sessionId: checkoutSession.id });
    }

    return NextResponse.redirect(checkoutSession.url as string, 303);
  } catch (err: unknown) {
    console.error("Error creating Stripe checkout session:", err);
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const plan = searchParams.get("plan") || "tutor";
    const headersList = await headers();
    const origin = headersList.get("origin") || headersList.get("referer") || "http://localhost:3000";
    const cleanOrigin = origin.replace(/\/$/, "");

    const session = await getServerAuth();
    const user = session?.user;

    const isStudent = plan.toLowerCase() === "student";
    const selectedPriceId = isStudent ? STUDENT_PRICE_ID : TUTOR_PRICE_ID;
    const planRole = isStudent ? "student" : "tutor";

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user?.email || undefined,
      metadata: {
        userId: user?.id || "",
        userEmail: user?.email || "",
        role: planRole,
        plan: "pro",
        integration_identifier: "mentor_lagbe_web_001",
      },
      client_reference_id: user?.id || undefined,
      success_url: `${cleanOrigin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cleanOrigin}/payment/cancel`,
    });

    return NextResponse.redirect(checkoutSession.url as string, 303);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
