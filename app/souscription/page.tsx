"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Shield, FileText, CreditCard } from "lucide-react"

// Import the payment components at the top
import StripePaymentForm from "@/components/payment/stripe-payment-form"
import SepaPaymentForm from "@/components/payment/sepa-payment-form"

const steps = [
  { id: 1, title: "Informations personnelles", icon: Shield },
  { id: 2, title: "Détails de l'assurance", icon: FileText },
  { id: 3, title: "Paiement et signature", icon: CreditCard },
]

export default function SouscriptionPage() {
  const searchParams = useSearchParams()
  const offerId = searchParams.get("offer")

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    city: "",
    zipCode: "",

    // Step 2: Insurance Details
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleYear: "",
    usage: "",
    parkingType: "",

    // Step 3: Payment
    paymentMethod: "",
    acceptTerms: false,
    acceptMarketing: false,
  })

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // TODO: Implement contract generation and signature
    console.log("Form submitted:", formData)
  }

  const progress = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Souscription en ligne</h1>
            <p className="text-muted-foreground">Complétez votre souscription en quelques minutes</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form Steps */}
          <Card>
            <CardHeader>
              <CardTitle>
                Étape {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Renseignez vos informations personnelles"}
                {currentStep === 2 && "Précisez les détails de votre assurance"}
                {currentStep === 3 && "Finalisez votre souscription"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date de naissance *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => updateFormData("birthDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Code postal *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => updateFormData("zipCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Insurance Details */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Type de véhicule *</Label>
                    <Select onValueChange={(value) => updateFormData("vehicleType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="voiture">Voiture</SelectItem>
                        <SelectItem value="moto">Moto</SelectItem>
                        <SelectItem value="utilitaire">Utilitaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleBrand">Marque *</Label>
                    <Input
                      id="vehicleBrand"
                      value={formData.vehicleBrand}
                      onChange={(e) => updateFormData("vehicleBrand", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel">Modèle *</Label>
                    <Input
                      id="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleYear">Année *</Label>
                    <Input
                      id="vehicleYear"
                      type="number"
                      min="1990"
                      max="2024"
                      value={formData.vehicleYear}
                      onChange={(e) => updateFormData("vehicleYear", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usage">Usage du véhicule *</Label>
                    <Select onValueChange={(value) => updateFormData("usage", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez l'usage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personnel">Personnel</SelectItem>
                        <SelectItem value="professionnel">Professionnel</SelectItem>
                        <SelectItem value="mixte">Mixte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parkingType">Type de stationnement *</Label>
                    <Select onValueChange={(value) => updateFormData("parkingType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le stationnement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="garage">Garage fermé</SelectItem>
                        <SelectItem value="parking">Parking privé</SelectItem>
                        <SelectItem value="rue">Rue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Payment and Signature */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Récapitulatif</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Offre sélectionnée:</span>
                        <span className="font-semibold">{offerId || "Auto Confort"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Prime mensuelle:</span>
                        <span className="font-semibold">49,99€</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Mode de paiement</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="card"
                          checked={formData.paymentMethod === "card"}
                          onCheckedChange={(checked) => updateFormData("paymentMethod", checked ? "card" : "")}
                        />
                        <Label htmlFor="card">Paiement par carte bancaire</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sepa"
                          checked={formData.paymentMethod === "sepa"}
                          onCheckedChange={(checked) => updateFormData("paymentMethod", checked ? "sepa" : "")}
                        />
                        <Label htmlFor="sepa">Prélèvement SEPA automatique</Label>
                      </div>

                      {/* Payment Forms */}
                      {formData.paymentMethod === "card" && (
                        <StripePaymentForm
                          amount={49.99}
                          contractId="temp-contract-id"
                          userId="temp-user-id"
                          onSuccess={() => {
                            console.log("Payment successful")
                            // TODO: Redirect to success page
                          }}
                          onError={(error) => {
                            console.error("Payment error:", error)
                          }}
                        />
                      )}

                      {formData.paymentMethod === "sepa" && (
                        <SepaPaymentForm
                          amount={49.99}
                          contractId="temp-contract-id"
                          userId="temp-user-id"
                          onSuccess={() => {
                            console.log("SEPA setup successful")
                            // TODO: Redirect to success page
                          }}
                          onError={(error) => {
                            console.error("SEPA setup error:", error)
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        J'accepte les{" "}
                        <a href="/terms" className="text-primary hover:underline">
                          conditions générales
                        </a>{" "}
                        et la{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          politique de confidentialité
                        </a>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onCheckedChange={(checked) => updateFormData("acceptMarketing", checked as boolean)}
                      />
                      <Label htmlFor="acceptMarketing" className="text-sm">
                        J'accepte de recevoir des offres commerciales par email
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>

                {currentStep < 3 ? (
                  <Button onClick={nextStep}>
                    Suivant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!formData.acceptTerms}>
                    Finaliser la souscription
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
