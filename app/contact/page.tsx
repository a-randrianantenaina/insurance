"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Shield } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Téléphone",
    description: "Appelez-nous du lundi au vendredi",
    contact: "01 23 45 67 89",
    hours: "9h - 18h",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Écrivez-nous, nous répondons sous 24h",
    contact: "contact@assureo.fr",
    hours: "24h/24",
  },
  {
    icon: MessageSquare,
    title: "Chat en ligne",
    description: "Assistance instantanée",
    contact: "Chat disponible",
    hours: "9h - 20h",
  },
  {
    icon: MapPin,
    title: "Siège social",
    description: "Venez nous rencontrer",
    contact: "123 Rue de la Paix, 75001 Paris",
    hours: "Sur RDV",
  },
]

const faqItems = [
  {
    question: "Comment souscrire une assurance en ligne ?",
    answer:
      "Il vous suffit de faire une simulation sur notre site, puis de suivre le processus de souscription. Vous recevrez votre contrat par email en quelques minutes.",
  },
  {
    question: "Puis-je modifier mon contrat après souscription ?",
    answer:
      "Oui, vous pouvez modifier votre contrat à tout moment depuis votre espace client ou en nous contactant directement.",
  },
  {
    question: "Comment déclarer un sinistre ?",
    answer:
      "Vous pouvez déclarer un sinistre 24h/24 via votre espace client, par téléphone ou par email. Notre équipe vous accompagne dans toutes les démarches.",
  },
  {
    question: "Quels sont les délais de remboursement ?",
    answer:
      "Les remboursements sont traités sous 48h après validation du dossier. Vous recevez une notification par email à chaque étape.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactReason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Message envoyé avec succès !</h1>
            <p className="text-muted-foreground mb-8">
              Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais, généralement sous 24h.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>Envoyer un autre message</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Contactez-nous</h1>
            <p className="text-xl text-muted-foreground">
              Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-1">{method.contact}</p>
                    <p className="text-sm text-muted-foreground flex items-center justify-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {method.hours}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Envoyez-nous un message</h2>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactReason">Motif de contact *</Label>
                    <Select onValueChange={(value) => updateFormData("contactReason", value)} disabled={isSubmitting}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le motif de votre contact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="devis">Demande de devis</SelectItem>
                        <SelectItem value="information">Demande d'information</SelectItem>
                        <SelectItem value="sinistre">Déclaration de sinistre</SelectItem>
                        <SelectItem value="modification">Modification de contrat</SelectItem>
                        <SelectItem value="resiliation">Résiliation</SelectItem>
                        <SelectItem value="reclamation">Réclamation</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => updateFormData("subject", e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => updateFormData("message", e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      isSubmitting ||
                      !formData.firstName ||
                      !formData.lastName ||
                      !formData.email ||
                      !formData.subject ||
                      !formData.message ||
                      !formData.contactReason
                    }
                    className="w-full"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-muted-foreground">Trouvez rapidement les réponses aux questions les plus courantes</p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <Shield className="mr-2 h-5 w-5" />
                  Urgence 24h/24
                </CardTitle>
                <CardDescription className="text-orange-700">
                  En cas d'urgence ou de sinistre grave, contactez-nous immédiatement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-orange-800">Numéro d'urgence</p>
                      <p className="text-orange-700">01 23 45 67 00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-orange-800">Email urgence</p>
                      <p className="text-orange-700">urgence@assureo.fr</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
