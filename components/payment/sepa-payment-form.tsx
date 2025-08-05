"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Building, CheckCircle } from "lucide-react"

interface SepaPaymentFormProps {
  amount: number
  contractId: string
  userId: string
  onSuccess: () => void
  onError: (error: string) => void
}

export default function SepaPaymentForm({ amount, contractId, userId, onSuccess, onError }: SepaPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "failed">("idle")
  const [formData, setFormData] = useState({
    iban: "",
    accountHolderName: "",
    mandateAccepted: false,
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!formData.mandateAccepted) {
      onError("Vous devez accepter le mandat de prélèvement SEPA")
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    try {
      // TODO: Implement SEPA setup with Stripe
      // This would typically involve creating a SetupIntent with SEPA debit
      const response = await fetch("/api/create-setup-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          contractId,
          paymentMethod: "sepa_debit",
          iban: formData.iban,
          accountHolderName: formData.accountHolderName,
        }),
      })

      if (response.ok) {
        setPaymentStatus("succeeded")
        onSuccess()
      } else {
        throw new Error("Erreur lors de la configuration du prélèvement")
      }
    } catch (error) {
      setPaymentStatus("failed")
      onError("Une erreur est survenue lors de la configuration du prélèvement SEPA")
    } finally {
      setIsProcessing(false)
    }
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (paymentStatus === "succeeded") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Mandat SEPA configuré !</h3>
            <p className="text-muted-foreground">
              Votre prélèvement automatique de {amount}€/mois a été configuré avec succès.
            </p>
            <p className="text-sm text-muted-foreground">Le premier prélèvement aura lieu dans 5 jours ouvrés.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Prélèvement SEPA</span>
        </CardTitle>
        <CardDescription>
          Configurez votre prélèvement automatique de <span className="font-semibold">{amount}€/mois</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="iban">IBAN *</Label>
            <Input
              id="iban"
              placeholder="FR76 1234 5678 9012 3456 7890 123"
              value={formData.iban}
              onChange={(e) => updateFormData("iban", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountHolderName">Nom du titulaire du compte *</Label>
            <Input
              id="accountHolderName"
              placeholder="Jean Dupont"
              value={formData.accountHolderName}
              onChange={(e) => updateFormData("accountHolderName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold">Mandat de prélèvement SEPA</h4>
            <p className="text-sm text-muted-foreground">
              En signant ce mandat, vous autorisez Assuréo à envoyer des instructions à votre banque pour débiter
              votre compte et votre banque à débiter votre compte conformément aux instructions d'Assuréo.
            </p>
            <p className="text-sm text-muted-foreground">
              Vous bénéficiez du droit d'être remboursé par votre banque selon les conditions décrites dans la
              convention que vous avez passée avec elle. Une demande de remboursement doit être présentée dans les 8
              semaines suivant la date de débit de votre compte.
            </p>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mandateAccepted"
                checked={formData.mandateAccepted}
                onCheckedChange={(checked) => updateFormData("mandateAccepted", checked as boolean)}
                required
              />
              <Label htmlFor="mandateAccepted" className="text-sm">
                J'accepte le mandat de prélèvement SEPA
              </Label>
            </div>
          </div>

          {paymentStatus === "failed" && (
            <Alert variant="destructive">
              <AlertDescription>
                La configuration du prélèvement a échoué. Veuillez vérifier vos informations et réessayer.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isProcessing || !formData.mandateAccepted} className="w-full">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Configuration en cours...
              </>
            ) : (
              "Configurer le prélèvement"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
