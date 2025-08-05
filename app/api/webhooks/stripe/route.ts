import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get("stripe-signature")!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        console.log("Payment succeeded:", paymentIntent.id)

        // TODO: Update payment status in database
        // await updatePaymentStatus(paymentIntent.metadata.contractId, 'PAID')
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object
        console.log("Payment failed:", failedPayment.id)

        // TODO: Update payment status in database and notify user
        // await updatePaymentStatus(failedPayment.metadata.contractId, 'FAILED')
        break

      case "setup_intent.succeeded":
        const setupIntent = event.data.object
        console.log("Setup intent succeeded:", setupIntent.id)

        // TODO: Save payment method for future use
        break

      case "invoice.payment_succeeded":
        const invoice = event.data.object
        console.log("Invoice payment succeeded:", invoice.id)
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object
        console.log("Invoice payment failed:", failedInvoice.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
