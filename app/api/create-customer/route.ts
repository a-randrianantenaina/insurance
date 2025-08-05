import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, address } = await request.json()

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      address: address
        ? {
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            postal_code: address.postal_code,
            country: address.country || "FR",
          }
        : undefined,
    })

    return NextResponse.json({
      customerId: customer.id,
    })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
