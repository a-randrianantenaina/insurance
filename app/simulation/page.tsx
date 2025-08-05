"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"

const insuranceTypes = [
  {
    id: "auto",
    name: "Assurance Auto",
    description: "Protection complète pour votre véhicule",
    basePrice: "À partir de 45€/mois",
  },
  {
    id: "habitation",
    name: "Assurance Habitation", 
    description: "Sécurisez votre logement et vos biens",
    basePrice: "À partir de 25€/mois",
  },
  {
    id: "sante",
    name: "Assurance Santé",
    description: "Couverture santé optimale pour vous et votre famille",
    basePrice: "À partir de 80€/mois",
  },
  {
    id: "vie",
    name: "Assurance Vie",
    description: "Épargne et transmission patrimoniale",
    basePrice: "À partir de 100€/mois",
  },
]

const steps = [
  "Choisir votre assurance",
  "Renseigner vos informations", 
  "Recevoir votre estimation"
]

interface SimulationData {
  insuranceType: string
  // Personal info
  age: string
  postalCode: string
  situation: string
  // Auto specific
  vehicleType: string
  vehicleBrand: string
  vehicleModel: string
  vehicleYear: string
  vehicleValue: string
  usage: string
  parkingType: string
  drivingExperience: string
  previousClaims: string
  // Habitation specific
  propertyType: string
  propertySize: string
  propertyValue: string
  securityLevel: string
  // Santé specific
  familySize: string
  currentCoverage: string
  medicalHistory: string
  // Vie specific
  investmentAmount: string
  investmentDuration: string
  riskProfile: string
}

interface SimulationResult {
  monthlyPremium: number
  yearlyPremium: number
  coverage: string[]
  discounts: Array<{
    name: string
    amount: number
    description: string
  }>
  recommendations: string[]
  economyVsCompetitors: number
}

export default function SimulationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [simulationData, setSimulationData] = useState<SimulationData>({
    insuranceType: "",
    age: "",
    postalCode: "",
    situation: "",
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleValue: "",
    usage: "",
    parkingType: "",
    drivingExperience: "",
    previousClaims: "",
    propertyType: "",
    propertySize: "",
    propertyValue: "",
    securityLevel: "",
    familySize: "",
    currentCoverage: "",
    medicalHistory: "",
    investmentAmount: "",
    investmentDuration: "",
    riskProfile: "",
  })
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const updateSimulationData = (field: string, value: string) => {
    setSimulationData((prev) => ({ ...prev, [field]: value }))
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

  const calculateSimulation = async () => {
    setIsCalculating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock calculation based on insurance type
    let basePrice = 0
    let coverage: string[] = []
    const discounts: Array<{ name: string; amount: number; description: string }> = []
    let recommendations: string[] = []

    switch (simulationData.insuranceType) {
      case "auto":
        basePrice = calculateAutoInsurance()
        coverage = [
          "Responsabilité civile obligatoire",
          "Défense pénale et recours",
          "Vol et incendie",
          "Bris de glace",
          "Assistance 24h/24",
        ]
        recommendations = [
          "Considérez l'option tous risques pour une protection maximale",
          "Un garage fermé peut réduire votre prime de 15%",
          "Bonus de fidélité après 2 ans sans sinistre",
        ]
        break
      case "habitation":
        basePrice = calculateHabitationInsurance()
        coverage = [
          "Multirisque habitation",
          "Responsabilité civile vie privée",
          "Incendie et explosion",
          "Dégâts des eaux",
          "Vol et vandalisme",
        ]
        recommendations = [
          "Système d'alarme recommandé pour réduire les risques",
          "Évaluez régulièrement la valeur de vos biens",
          "Gardez les factures de vos objets de valeur",
        ]
        break
      case "sante":
        basePrice = calculateSanteInsurance()
        coverage = [
          "Remboursement jusqu'à 300%",
          "Médecines douces incluses",
          "Téléconsultation illimitée",
          "Dentaire et optique renforcés",
          "Hospitalisation premium",
        ]
        recommendations = [
          "Profitez de la téléconsultation pour un suivi régulier",
          "Bilans de santé préventifs remboursés à 100%",
          "Réseau de professionnels partenaires",
        ]
        break
      case "vie":
        basePrice = calculateVieInsurance()
        coverage = [
          "Capital décès garanti",
          "Épargne sécurisée",
          "Transmission optimisée",
          "Fiscalité avantageuse",
          "Rachat partiel possible",
        ]
        recommendations = [
          "Versements programmés pour optimiser votre épargne",
          "Avantages fiscaux après 8 ans",
          "Diversification recommandée selon votre profil",
        ]
        break
    }

    // Add common discounts
    if (Number.parseInt(simulationData.age) < 25) {
      discounts.push({
        name: "Jeune conducteur",
        amount: -10,
        description: "Réduction pour les moins de 25 ans",
      })
    }

    if (simulationData.previousClaims === "0") {
      discounts.push({
        name: "Bonus sans sinistre",
        amount: 15,
        description: "Aucun sinistre déclaré",
      })
    }

    const totalDiscount = discounts.reduce((sum, discount) => sum + discount.amount, 0)
    const finalPrice = Math.max(basePrice * (1 + totalDiscount / 100), basePrice * 0.5)

    setSimulationResult({
      monthlyPremium: Math.round(finalPrice * 100) / 100,
      yearlyPremium: Math.round(finalPrice * 12 * 100) / 100,
      coverage,
      discounts,
      recommendations,
      economyVsCompetitors: Math.round(Math.random() * 200 + 100), // Mock savings
    })

    setIsCalculating(false)
    nextStep()
  }

  const calculateAutoInsurance = (): number => {
    let price = 50 // Base price

    // Age factor
    const age = Number.parseInt(simulationData.age)
    if (age < 25) price *= 1.5
    else if (age > 50) price *= 0.8

    // Vehicle value
    const value = Number.parseInt(simulationData.vehicleValue)
    if (value > 30000) price *= 1.3
    else if (value < 10000) price *= 0.8

    // Usage
    if (simulationData.usage === "professionnel") price *= 1.2

    // Parking
    if (simulationData.parkingType === "garage") price *= 0.85
    else if (simulationData.parkingType === "rue") price *= 1.1

    return price
  }

  const calculateHabitationInsurance = (): number => {
    let price = 25 // Base price

    // Property size
    const size = Number.parseInt(simulationData.propertySize)
    price += size * 0.1

    // Property type
    if (simulationData.propertyType === "maison") price *= 1.2

    // Security level
    if (simulationData.securityLevel === "high") price *= 0.9
    else if (simulationData.securityLevel === "low") price *= 1.1

    return price
  }

  const calculateSanteInsurance = (): number => {
    let price = 80 // Base price

    // Family size
    const familySize = Number.parseInt(simulationData.familySize)
    price *= familySize * 0.8

    // Age factor
    const age = Number.parseInt(simulationData.age)
    if (age > 50) price *= 1.2

    return price
  }

  const calculateVieInsurance = (): number => {
    let price = 100 // Base price

    // Investment amount
    const amount = Number.parseInt(simulationData.investmentAmount)
    price = amount * 0.02 // 2% of investment

    // Risk profile
    if (simulationData.riskProfile === "high") price *= 1.1
    else if (simulationData.riskProfile === "low") price *= 0.9

    return price
  }

  const progress = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simulation d'assurance
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Obtenez une estimation personnalisée et transparente en moins de 3 minutes
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Progress value={progress} className="mb-6 h-2" />
            <div className="flex justify-between">
              {steps.map((title, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center space-y-2 ${
                    currentStep > index + 1 ? "text-green-600" : 
                    currentStep === index + 1 ? "text-blue-600" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep > index + 1 ? "bg-green-600 text-white" :
                      currentStep === index + 1 ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-center max-w-32">{title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 1: Insurance Type Selection */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">Quel type d'assurance vous intéresse ?</CardTitle>
                  <CardDescription className="text-lg">
                    Choisissez le domaine pour lequel vous souhaitez une estimation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {insuranceTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer h-full transition-all duration-200 ${
                            simulationData.insuranceType === type.id
                              ? "ring-2 ring-blue-500 bg-blue-50"
                              : "hover:bg-slate-50"
                          }`}
                          onClick={() => updateSimulationData("insuranceType", type.id)}
                        >
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">{type.name}</h3>
                                <Badge variant="secondary" className="text-xs">
                                  {type.basePrice}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground">{type.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-8">
                    <Button 
                      onClick={nextStep} 
                      disabled={!simulationData.insuranceType}
                      size="lg"
                      className="px-8"
                    >
                      Continuer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Information Form */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Quelques informations sur vous</CardTitle>
                  <CardDescription className="text-lg">
                    Ces informations nous permettront de calculer votre tarif personnalisé
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Common fields */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Informations générales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-base">Votre âge</Label>
                        <Input
                          id="age"
                          type="number"
                          min="18"
                          max="100"
                          placeholder="Ex: 35"
                          value={simulationData.age}
                          onChange={(e) => updateSimulationData("age", e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-base">Code postal</Label>
                        <Input
                          id="postalCode"
                          placeholder="Ex: 75001"
                          value={simulationData.postalCode}
                          onChange={(e) => updateSimulationData("postalCode", e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="situation" className="text-base">Situation familiale</Label>
                      <Select onValueChange={(value) => updateSimulationData("situation", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Choisissez votre situation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celibataire">Célibataire</SelectItem>
                          <SelectItem value="marie">Marié(e)</SelectItem>
                          <SelectItem value="pacs">Pacsé(e)</SelectItem>
                          <SelectItem value="divorce">Divorcé(e)</SelectItem>
                          <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                {/* Auto specific fields */}
                {simulationData.insuranceType === "auto" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations sur votre véhicule</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Type de véhicule</Label>
                        <Select onValueChange={(value) => updateSimulationData("vehicleType", value)}>
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
                        <Label htmlFor="vehicleBrand">Marque</Label>
                        <Input
                          id="vehicleBrand"
                          placeholder="Renault, Peugeot..."
                          value={simulationData.vehicleBrand}
                          onChange={(e) => updateSimulationData("vehicleBrand", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleYear">Année de mise en circulation</Label>
                        <Input
                          id="vehicleYear"
                          type="number"
                          min="1990"
                          max="2024"
                          value={simulationData.vehicleYear}
                          onChange={(e) => updateSimulationData("vehicleYear", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicleValue">Valeur du véhicule (€)</Label>
                        <Input
                          id="vehicleValue"
                          type="number"
                          placeholder="15000"
                          value={simulationData.vehicleValue}
                          onChange={(e) => updateSimulationData("vehicleValue", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="usage">Usage du véhicule</Label>
                        <Select onValueChange={(value) => updateSimulationData("usage", value)}>
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
                        <Label htmlFor="parkingType">Type de stationnement</Label>
                        <Select onValueChange={(value) => updateSimulationData("parkingType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Où garez-vous votre véhicule ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="garage">Garage fermé</SelectItem>
                            <SelectItem value="parking">Parking privé</SelectItem>
                            <SelectItem value="rue">Rue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="previousClaims">Nombre de sinistres dans les 3 dernières années</Label>
                      <Select onValueChange={(value) => updateSimulationData("previousClaims", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le nombre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Aucun</SelectItem>
                          <SelectItem value="1">1 sinistre</SelectItem>
                          <SelectItem value="2">2 sinistres</SelectItem>
                          <SelectItem value="3+">3 sinistres ou plus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Habitation specific fields */}
                {simulationData.insuranceType === "habitation" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations sur votre logement</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Type de logement</Label>
                        <Select onValueChange={(value) => updateSimulationData("propertyType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="appartement">Appartement</SelectItem>
                            <SelectItem value="maison">Maison</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propertySize">Surface (m²)</Label>
                        <Input
                          id="propertySize"
                          type="number"
                          placeholder="75"
                          value={simulationData.propertySize}
                          onChange={(e) => updateSimulationData("propertySize", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyValue">Valeur des biens mobiliers (€)</Label>
                        <Input
                          id="propertyValue"
                          type="number"
                          placeholder="30000"
                          value={simulationData.propertyValue}
                          onChange={(e) => updateSimulationData("propertyValue", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="securityLevel">Niveau de sécurité</Label>
                        <Select onValueChange={(value) => updateSimulationData("securityLevel", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Évaluez la sécurité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Basique</SelectItem>
                            <SelectItem value="medium">Standard (serrure 3 points)</SelectItem>
                            <SelectItem value="high">Renforcé (alarme, digicode)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Santé specific fields */}
                {simulationData.insuranceType === "sante" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations santé</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="familySize">Nombre de personnes à assurer</Label>
                        <Select onValueChange={(value) => updateSimulationData("familySize", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le nombre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 personne</SelectItem>
                            <SelectItem value="2">2 personnes</SelectItem>
                            <SelectItem value="3">3 personnes</SelectItem>
                            <SelectItem value="4">4 personnes ou plus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentCoverage">Couverture actuelle</Label>
                        <Select onValueChange={(value) => updateSimulationData("currentCoverage", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Votre situation actuelle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Aucune couverture</SelectItem>
                            <SelectItem value="basic">Sécurité sociale uniquement</SelectItem>
                            <SelectItem value="mutuelle">Mutuelle d'entreprise</SelectItem>
                            <SelectItem value="private">Assurance privée</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vie specific fields */}
                {simulationData.insuranceType === "vie" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Projet d'épargne</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="investmentAmount">Montant d'investissement initial (€)</Label>
                        <Input
                          id="investmentAmount"
                          type="number"
                          placeholder="10000"
                          value={simulationData.investmentAmount}
                          onChange={(e) => updateSimulationData("investmentAmount", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="investmentDuration">Durée d'investissement (années)</Label>
                        <Select onValueChange={(value) => updateSimulationData("investmentDuration", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 ans</SelectItem>
                            <SelectItem value="10">10 ans</SelectItem>
                            <SelectItem value="15">15 ans</SelectItem>
                            <SelectItem value="20">20 ans ou plus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="riskProfile">Profil de risque</Label>
                      <Select onValueChange={(value) => updateSimulationData("riskProfile", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Évaluez votre appétence au risque" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Prudent (sécurité privilégiée)</SelectItem>
                          <SelectItem value="medium">Équilibré (rendement modéré)</SelectItem>
                          <SelectItem value="high">Dynamique (rendement élevé)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                  <div className="flex justify-between pt-8">
                    <Button variant="outline" onClick={prevStep} size="lg">
                      Retour
                    </Button>
                    <Button 
                      onClick={calculateSimulation} 
                      disabled={!simulationData.age || !simulationData.postalCode}
                      size="lg"
                      className="px-8"
                    >
                      {isCalculating ? "Calcul en cours..." : "Calculer ma prime"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {currentStep === 3 && simulationResult && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Main Result Card */}
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Votre estimation personnalisée
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Tarif calculé selon vos informations et notre expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <div className="text-6xl font-bold text-slate-800">
                        {simulationResult.monthlyPremium}€
                        <span className="text-2xl font-normal text-muted-foreground ml-2">/mois</span>
                      </div>
                      <p className="text-muted-foreground text-lg">
                        Soit {simulationResult.yearlyPremium}€ par an
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <Badge variant="secondary" className="text-green-700 bg-green-100 px-4 py-2 text-base">
                        Économie de {simulationResult.economyVsCompetitors}€/an vs concurrence
                      </Badge>
                    </div>

                    {simulationResult.discounts.length > 0 && (
                      <Card className="bg-green-50 border-green-200 max-w-md mx-auto">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-green-800 mb-4">Réductions appliquées</h4>
                          <div className="space-y-3">
                            {simulationResult.discounts.map((discount, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-green-700">{discount.name}</span>
                                <Badge variant="outline" className="text-green-800 border-green-300">
                                  {discount.amount > 0 ? "+" : ""}{discount.amount}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Coverage Details */}
              <Card className="border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Garanties incluses</CardTitle>
                  <CardDescription>
                    Protection complète adaptée à vos besoins
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {simulationResult.coverage.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Nos conseils personnalisés</CardTitle>
                  <CardDescription>
                    Pour optimiser votre protection et vos économies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {simulationResult.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href={`/souscription?offer=${simulationData.insuranceType}&premium=${simulationResult.monthlyPremium}`}
                >
                  <Button size="lg" className="w-full sm:w-auto px-8 h-14 text-lg">
                    Souscrire maintenant
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 h-14 text-lg"
                  onClick={() => {
                    setCurrentStep(1)
                    setSimulationData({
                      insuranceType: "",
                      age: "",
                      postalCode: "",
                      situation: "",
                      vehicleType: "",
                      vehicleBrand: "",
                      vehicleModel: "",
                      vehicleYear: "",
                      vehicleValue: "",
                      usage: "",
                      parkingType: "",
                      drivingExperience: "",
                      previousClaims: "",
                      propertyType: "",
                      propertySize: "",
                      propertyValue: "",
                      securityLevel: "",
                      familySize: "",
                      currentCoverage: "",
                      medicalHistory: "",
                      investmentAmount: "",
                      investmentDuration: "",
                      riskProfile: "",
                    })
                    setSimulationResult(null)
                  }}
                >
                  Nouvelle simulation
                </Button>
                <Button variant="ghost" size="lg" className="w-full sm:w-auto px-8 h-14 text-lg">
                  Télécharger le devis
                </Button>
              </div>

              <Card className="bg-slate-50 border-0">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-2">
                    Cette estimation est indicative et peut varier selon l'analyse complète de votre profil.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Un conseiller vous contactera sous 24h pour finaliser votre offre personnalisée.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
