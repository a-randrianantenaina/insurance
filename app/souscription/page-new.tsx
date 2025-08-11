"use client";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Import the payment components
import SepaPaymentForm from "@/components/payment/sepa-payment-form";
import StripePaymentForm from "@/components/payment/stripe-payment-form";

const steps = [
  { id: 1, title: "Informations personnelles", icon: Shield },
  { id: 2, title: "Détails de l'appareil", icon: Smartphone },
  { id: 3, title: "Paiement et signature", icon: CreditCard },
];

const devicePlans = [
  {
    id: 1,
    range: "1€ - 500€",
    price: "1,00",
    examples: [
      "Smartphones d'entrée de gamme",
      "Casques audio",
      "Petits objets électroniques",
    ],
  },
  {
    id: 2,
    range: "501€ - 1000€",
    price: "8,99",
    examples: [
      "Smartphones milieu de gamme",
      "Tablettes",
      "Ordinateurs portables classiques",
    ],
  },
  {
    id: 3,
    range: "1001€ - 1500€",
    price: "12,99",
    examples: [
      "Smartphones haut de gamme",
      "Ordinateurs portables performants",
      "Téléviseurs",
    ],
  },
  {
    id: 4,
    range: "1501€ - 2000€",
    price: "16,99",
    examples: [
      "Ordinateurs portables professionnels",
      "Appareils photo hybrides",
    ],
  },
  {
    id: 5,
    range: "2001€ - 2500€",
    price: "24,99",
    examples: ["MacBook Pro", "Appareils photo reflex haut de gamme"],
  },
  {
    id: 6,
    range: "2501€ - 3000€",
    price: "34,99",
    examples: [
      "Matériel informatique très performant",
      "Matériel professionnel de pointe",
    ],
  },
];

const coverageFeatures = [
  {
    icon: Shield,
    title: "Casse accidentelle",
    description: "Protection contre les chutes et impacts",
  },
  {
    icon: Zap,
    title: "Court-circuit",
    description: "Dommages électriques et surtensions",
  },
  {
    icon: Check,
    title: "Vol et tentative de vol",
    description: "Remboursement en cas de vol",
  },
  {
    icon: Clock,
    title: "Remplacement rapide",
    description: "Nouvel appareil sous 48h",
  },
];

export default function SouscriptionPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");

  const [currentStep, setCurrentStep] = useState(1);
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

    // Step 2: Device Details
    deviceCategory: "",
    deviceBrand: "",
    deviceModel: "",
    deviceSerialNumber: "",
    purchaseDate: "",
    purchasePrice: "",
    retailer: "",

    // Step 3: Payment & Terms
    paymentMethod: "card",
    acceptTerms: false,
    acceptMarketing: false,
  });

  const selectedPlan = planId
    ? devicePlans.find((p) => p.id === parseInt(planId))
    : null;

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.birthDate &&
          formData.address &&
          formData.city &&
          formData.zipCode
        );
      case 2:
        return (
          formData.deviceCategory &&
          formData.deviceBrand &&
          formData.deviceModel &&
          formData.purchaseDate &&
          formData.purchasePrice
        );
      case 3:
        return formData.acceptTerms;
      default:
        return false;
    }
  };

  const getRecommendedPlan = () => {
    const price = parseFloat(formData.purchasePrice || "0");

    if (price <= 500) return devicePlans[0];
    if (price <= 1000) return devicePlans[1];
    if (price <= 1500) return devicePlans[2];
    if (price <= 2000) return devicePlans[3];
    if (price <= 2500) return devicePlans[4];
    return devicePlans[5];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Vos informations personnelles
              </CardTitle>
              <CardDescription>
                Ces informations sont nécessaires pour établir votre contrat
                d'assurance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      updateFormData("firstName", e.target.value)
                    }
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="birthDate">Date de naissance *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateFormData("birthDate", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Adresse *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Numéro et nom de rue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    placeholder="Votre ville"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Code postal *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    placeholder="75001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Détails de votre appareil
              </CardTitle>
              <CardDescription>
                Renseignez les informations de l'appareil que vous souhaitez
                assurer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="deviceCategory">Catégorie d'appareil *</Label>
                <Select
                  value={formData.deviceCategory}
                  onValueChange={(value) =>
                    updateFormData("deviceCategory", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="laptop">Ordinateur portable</SelectItem>
                    <SelectItem value="tablet">Tablette</SelectItem>
                    <SelectItem value="camera">Appareil photo</SelectItem>
                    <SelectItem value="tv">Téléviseur</SelectItem>
                    <SelectItem value="audio">
                      Audio (casques, écouteurs...)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deviceBrand">Marque *</Label>
                  <Input
                    id="deviceBrand"
                    value={formData.deviceBrand}
                    onChange={(e) =>
                      updateFormData("deviceBrand", e.target.value)
                    }
                    placeholder="Ex: Apple, Samsung, Sony..."
                  />
                </div>
                <div>
                  <Label htmlFor="deviceModel">Modèle *</Label>
                  <Input
                    id="deviceModel"
                    value={formData.deviceModel}
                    onChange={(e) =>
                      updateFormData("deviceModel", e.target.value)
                    }
                    placeholder="Ex: iPhone 15 Pro, Galaxy S24..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="deviceSerialNumber">
                  Numéro de série (optionnel)
                </Label>
                <Input
                  id="deviceSerialNumber"
                  value={formData.deviceSerialNumber}
                  onChange={(e) =>
                    updateFormData("deviceSerialNumber", e.target.value)
                  }
                  placeholder="Numéro de série de l'appareil"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchaseDate">Date d'achat *</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      updateFormData("purchaseDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="purchasePrice">Prix d'achat (€) *</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) =>
                      updateFormData("purchasePrice", e.target.value)
                    }
                    placeholder="Ex: 899"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="retailer">Lieu d'achat (optionnel)</Label>
                <Input
                  id="retailer"
                  value={formData.retailer}
                  onChange={(e) => updateFormData("retailer", e.target.value)}
                  placeholder="Ex: Apple Store, Amazon, Fnac..."
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        const currentPlan = selectedPlan || getRecommendedPlan();

        return (
          <div className="space-y-6">
            {/* Plan Summary */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Récapitulatif de votre assurance</span>
                  <Badge>Plan recommandé</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {formData.deviceBrand} {formData.deviceModel}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Valeur : {formData.purchasePrice}€ - Plan{" "}
                      {currentPlan.range}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {currentPlan.price}€
                      <span className="text-sm font-normal">/mois</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">
                    Votre protection inclut :
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {coverageFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Mode de paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer ${
                      formData.paymentMethod === "card" ? "border-primary" : ""
                    }`}
                    onClick={() => updateFormData("paymentMethod", "card")}
                  >
                    <CardContent className="p-4 text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-2" />
                      <h3 className="font-semibold">Carte bancaire</h3>
                      <p className="text-sm text-muted-foreground">
                        Paiement sécurisé par Stripe
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer ${
                      formData.paymentMethod === "sepa" ? "border-primary" : ""
                    }`}
                    onClick={() => updateFormData("paymentMethod", "sepa")}
                  >
                    <CardContent className="p-4 text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-2" />
                      <h3 className="font-semibold">Prélèvement SEPA</h3>
                      <p className="text-sm text-muted-foreground">
                        Virement automatique
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {formData.paymentMethod === "card" && (
                  <StripePaymentForm
                    amount={parseFloat(currentPlan.price) * 100}
                    contractId="temp-contract-id"
                    userId="temp-user-id"
                    onSuccess={() => {
                      alert(
                        "Paiement réussi ! Votre contrat sera activé sous 24h."
                      );
                    }}
                    onError={(error) => {
                      alert(`Erreur de paiement : ${error}`);
                    }}
                  />
                )}

                {formData.paymentMethod === "sepa" && (
                  <SepaPaymentForm
                    amount={parseFloat(currentPlan.price)}
                    contractId="temp-contract-id"
                    userId="temp-user-id"
                    onSuccess={() => {
                      alert(
                        "Mandat SEPA créé ! Votre premier prélèvement aura lieu dans 5 jours."
                      );
                    }}
                    onError={(error) => {
                      alert(`Erreur SEPA : ${error}`);
                    }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      updateFormData("acceptTerms", checked as boolean)
                    }
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    J'accepte les{" "}
                    <a
                      href="/terms"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      conditions générales
                    </a>{" "}
                    et la{" "}
                    <a
                      href="/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      politique de confidentialité
                    </a>{" "}
                    *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptMarketing"
                    checked={formData.acceptMarketing}
                    onCheckedChange={(checked) =>
                      updateFormData("acceptMarketing", checked as boolean)
                    }
                  />
                  <Label htmlFor="acceptMarketing" className="text-sm">
                    J'accepte de recevoir des communications marketing par email
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Finaliser votre souscription
          </h1>
          <p className="text-xl text-muted-foreground">
            Plus que quelques étapes pour protéger votre appareil
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div
                      className={`text-sm font-medium ${
                        isActive || isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <Progress
            value={(currentStep / steps.length) * 100}
            className="mt-4"
          />
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex justify-between max-w-3xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceedToNextStep()}
            >
              Suivant
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              disabled={!canProceedToNextStep()}
              onClick={() => {
                // Handle final submission here
                alert(
                  "Souscription finalisée ! Un email de confirmation vous sera envoyé."
                );
              }}
            >
              Finaliser ma souscription
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
