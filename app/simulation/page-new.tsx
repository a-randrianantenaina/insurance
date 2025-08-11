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
import { motion } from "framer-motion";
import {
  Camera,
  Check,
  Clock,
  Headphones,
  Laptop,
  Shield,
  Smartphone,
  Tablet,
  Tv,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const deviceCategories = [
  {
    id: "smartphone",
    name: "Smartphone",
    icon: Smartphone,
    description: "iPhone, Samsung, OnePlus...",
  },
  {
    id: "laptop",
    name: "Ordinateur portable",
    icon: Laptop,
    description: "MacBook, PC portable, ultrabook...",
  },
  {
    id: "tablet",
    name: "Tablette",
    icon: Tablet,
    description: "iPad, tablettes Android...",
  },
  {
    id: "camera",
    name: "Appareil photo",
    icon: Camera,
    description: "Reflex, hybride, compact...",
  },
  {
    id: "tv",
    name: "Téléviseur",
    icon: Tv,
    description: "Smart TV, OLED, QLED...",
  },
  {
    id: "headphones",
    name: "Audio",
    icon: Headphones,
    description: "Casques, écouteurs, enceintes...",
  },
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

const steps = [
  "Type d'appareil",
  "Informations de l'appareil",
  "Votre devis personnalisé",
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

interface DeviceData {
  category: string;
  brand: string;
  model: string;
  purchasePrice: string;
  purchaseDate: string;
  condition: string;
  // Personal info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
}

export default function SimulationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [deviceData, setDeviceData] = useState<DeviceData>({
    category: "",
    brand: "",
    model: "",
    purchasePrice: "",
    purchaseDate: "",
    condition: "excellent",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
  });

  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const planId = searchParams.get("plan");
    if (planId) {
      const plan = devicePlans.find((p) => p.id === parseInt(planId));
      if (plan) {
        setSelectedPlan(plan);
        setCurrentStep(2);
      }
    }
  }, [searchParams]);

  const updateDeviceData = (field: string, value: string) => {
    setDeviceData((prev) => ({ ...prev, [field]: value }));
  };

  const getRecommendedPlan = () => {
    const price = parseFloat(deviceData.purchasePrice || "0");

    if (price <= 500) return devicePlans[0];
    if (price <= 1000) return devicePlans[1];
    if (price <= 1500) return devicePlans[2];
    if (price <= 2000) return devicePlans[3];
    if (price <= 2500) return devicePlans[4];
    return devicePlans[5];
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return deviceData.category !== "";
      case 2:
        return (
          deviceData.brand &&
          deviceData.model &&
          deviceData.purchasePrice &&
          deviceData.purchaseDate
        );
      case 3:
        return (
          deviceData.firstName &&
          deviceData.lastName &&
          deviceData.email &&
          deviceData.phone &&
          deviceData.postalCode
        );
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Quel type d'appareil souhaitez-vous assurer ?
              </h2>
              <p className="text-muted-foreground">
                Sélectionnez la catégorie de votre appareil
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deviceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      deviceData.category === category.id
                        ? "border-primary ring-2 ring-primary/20"
                        : ""
                    }`}
                    onClick={() => updateDeviceData("category", category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Parlez-nous de votre appareil
              </h2>
              <p className="text-muted-foreground">
                Ces informations nous permettront de vous proposer le meilleur
                tarif
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="brand">Marque de l'appareil</Label>
                  <Input
                    id="brand"
                    placeholder="Ex: Apple, Samsung, Sony..."
                    value={deviceData.brand}
                    onChange={(e) => updateDeviceData("brand", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="model">Modèle</Label>
                  <Input
                    id="model"
                    placeholder="Ex: iPhone 15 Pro, Galaxy S24..."
                    value={deviceData.model}
                    onChange={(e) => updateDeviceData("model", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="condition">État de l'appareil</Label>
                  <Select
                    value={deviceData.condition}
                    onValueChange={(value) =>
                      updateDeviceData("condition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez l'état" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">
                        Excellent (comme neuf)
                      </SelectItem>
                      <SelectItem value="good">
                        Bon (quelques traces d'usure)
                      </SelectItem>
                      <SelectItem value="fair">
                        Correct (usure visible)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="purchasePrice">Prix d'achat (€)</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    placeholder="Ex: 899"
                    value={deviceData.purchasePrice}
                    onChange={(e) =>
                      updateDeviceData("purchasePrice", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="purchaseDate">Date d'achat</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={deviceData.purchaseDate}
                    onChange={(e) =>
                      updateDeviceData("purchaseDate", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        const recommendedPlan = selectedPlan || getRecommendedPlan();

        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Votre devis personnalisé
              </h2>
              <p className="text-muted-foreground">
                Finalisez votre souscription en renseignant vos coordonnées
              </p>
            </div>

            {/* Pricing Card */}
            <Card className="border-primary">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2">Tarif recommandé</Badge>
                <CardTitle className="text-2xl">
                  {recommendedPlan.range}
                </CardTitle>
                <div className="text-4xl font-bold text-primary">
                  {recommendedPlan.price}€
                  <span className="text-lg font-normal text-muted-foreground">
                    /mois
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Votre appareil :</h4>
                    <p className="text-sm">
                      {deviceData.brand} {deviceData.model} -{" "}
                      {deviceData.purchasePrice}€
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">
                      Votre protection inclut :
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Vos coordonnées</CardTitle>
                <CardDescription>
                  Pour finaliser votre devis et vous recontacter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      value={deviceData.firstName}
                      onChange={(e) =>
                        updateDeviceData("firstName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      value={deviceData.lastName}
                      onChange={(e) =>
                        updateDeviceData("lastName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={deviceData.email}
                      onChange={(e) =>
                        updateDeviceData("email", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      placeholder="06 12 34 56 78"
                      value={deviceData.phone}
                      onChange={(e) =>
                        updateDeviceData("phone", e.target.value)
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                      id="postalCode"
                      placeholder="75001"
                      value={deviceData.postalCode}
                      onChange={(e) =>
                        updateDeviceData("postalCode", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
            Simulation d'assurance appareil
          </h1>
          <p className="text-xl text-muted-foreground">
            Obtenez votre devis en quelques clics
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index + 1 <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    index + 1 <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <Progress
            value={(currentStep / steps.length) * 100}
            className="h-2"
          />
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between max-w-4xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Précédent
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceedToNextStep()}
            >
              Suivant
            </Button>
          ) : (
            <Link href="/souscription">
              <Button disabled={!canProceedToNextStep()}>
                Finaliser ma souscription
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
