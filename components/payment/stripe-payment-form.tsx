"use client"

import type React from "react"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, CheckCircle } from "lucide-react"
import { getStripePublishableKey } from "@/lib/stripe"

const stripePromise = loadStripe(getStripePublishableKey())

interface PaymentFormProps {
  amount: number
  contractId: string
  userId: string
  onSuccess: () => void
  onError: (error: string) => void
}

function PaymentForm({ amount, contractId, userId, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "failed">("idle")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          contractId,
          userId,
        }),
      })

      const { clientSecret } = await response.json()

      // Confirm payment
      const cardElement = elements.getElement(CardElement)
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
        },
      })

      if (error) {
        setPaymentStatus("failed")
        onError(error.message || "Une erreur est survenue lors du paiement")
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("succeeded")
        onSuccess()
      }
    } catch (error) {
      setPaymentStatus("failed")
      onError("Une erreur est survenue lors du paiement")
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentStatus === "succeeded") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Paiement réussi !</h3>
            <p className="text-muted-foreground">Votre paiement de {amount}€ a été traité avec succès.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Paiement par carte</span>
        </CardTitle>
        <CardDescription>
          Montant à payer: <span className="font-semibold">{amount}€</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
              }}
            />
          </div>

          {paymentStatus === "failed" && (
            <Alert variant="destructive">
              <AlertDescription>
                Le paiement a échoué. Veuillez vérifier vos informations et réessayer.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={!stripe || isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traitement en cours...
              </>
            ) : (
              `Payer ${amount}€`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function StripePaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  )
}
