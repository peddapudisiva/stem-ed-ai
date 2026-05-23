import { NextRequest, NextResponse } from "next/server"

interface CheckoutRequest {
  priceId: string
  userId?: string
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    )
  }

  try {
    const { Stripe } = await import("stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" })

    const body: CheckoutRequest = await req.json()
    const { priceId, userId } = body

    if (!priceId) {
      return NextResponse.json({ error: "priceId required" }, { status: 400 })
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/settings/billing?success=1`,
      cancel_url: `${baseUrl}/settings/billing?canceled=1`,
      metadata: { userId: userId ?? "" },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("[/api/billing/create-checkout] error:", err)
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 })
  }
}
