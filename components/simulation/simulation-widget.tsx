"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SimulationWidgetProps {
  type?: "auto" | "habitation" | "sante" | "vie"
  title?: string
  description?: string
}

export function SimulationWidget({
  type = "auto",
  title = "Simulation rapide",
  description = "Obtenez une estimation en 30 secondes",
}: SimulationWidgetProps) {
  const [formData, setFormData] = useState({
    age: "",
    postalCode: "",
    vehicleYear: "",
    propertySize: "",
    familySize: "",
    investmentAmount: "",
  })
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateQuickEstimate = () => {
    let basePrice = 0

    switch (type) {
      case "auto":
        basePrice = 45
        if (Number.parseInt(formData.age) < 25) basePrice *= 1.4
        if (Number.parseInt(formData.vehicleYear) > 2020) basePrice *= 1.2
        break
      case "habitation":
        basePrice = 20
        basePrice += Number.parseInt(formData.propertySize) * 0.15
        break
      case "sante":
        basePrice = 60
        basePrice *= Number.parseInt(formData.familySize) * 0.9
        break
      case "vie":
        basePrice = Number.parseInt(formData.investmentAmount) * 0.015
        break
    }

    setEstimatedPrice(Math.round(basePrice))
  }

  const getFields = () => {
    switch (type) {
      case "auto":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="age">Votre âge</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={formData.age}
                onChange={(e) => updateFormData("age", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleYear">Année du véhicule</Label>
              <Input
                id="vehicleYear"
                type="number"
                placeholder="2020"
                value={formData.vehicleYear}
                onChange={(e) => updateFormData("vehicleYear", e.target.value)}
              />
            </div>
          </>
        )
      case "habitation":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="propertySize">Surface (m²)</Label>
              <Input
                id="propertySize"
                type="number"
                placeholder="75"
                value={formData.propertySize}
                onChange={(e) => updateFormData("propertySize", e.target.value)}
              />
            </div>
          </>
        )
      case "sante":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="familySize">Nombre de personnes</Label>
              <Select onValueChange={(value) => updateFormData("familySize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 personne</SelectItem>
                  <SelectItem value="2">2 personnes</SelectItem>
                  <SelectItem value="3">3 personnes</SelectItem>
                  <SelectItem value="4">4+ personnes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "vie":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="investmentAmount">Montant à investir (€)</Label>
              <Input
                id="investmentAmount"
                type="number"
                placeholder="10000"
                value={formData.investmentAmount}
                onChange={(e) => updateFormData("investmentAmount", e.target.value)}
              />
            </div>
          </>
        )
    }
  }

  const isFormValid = () => {
    switch (type) {
      case "auto":
        return formData.age && formData.vehicleYear
      case "habitation":
        return formData.propertySize
      case "sante":
        return formData.familySize
      case "vie":
        return formData.investmentAmount
      default:
        return false
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Code postal</Label>
          <Input
            id="postalCode"
            placeholder="75001"
            value={formData.postalCode}
            onChange={(e) => updateFormData("postalCode", e.target.value)}
          />
        </div>

        {getFields()}

        {estimatedPrice ? (
          <div className="text-center space-y-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">À partir de {estimatedPrice}€/mois</div>
              <p className="text-sm text-muted-foreground">Estimation indicative</p>
            </div>

            <div className="space-y-2">
              <Link href={`/simulation?type=${type}`}>
                <Button className="w-full">
                  Simulation détaillée
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setEstimatedPrice(null)}>
                Nouvelle estimation
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={calculateQuickEstimate} disabled={!isFormValid()} className="w-full">
            Calculer
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
