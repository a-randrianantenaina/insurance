"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Search,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Shield,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react"

const supportCategories = [
  {
    icon: FileText,
    title: "Gestion des contrats",
    description: "Modification, résiliation, renouvellement",
    articles: 12,
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Shield,
    title: "Déclaration de sinistres",
    description: "Procédures et suivi des dossiers",
    articles: 8,
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Users,
    title: "Espace client",
    description: "Connexion, fonctionnalités, problèmes techniques",
    articles: 15,
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Clock,
    title: "Paiements",
    description: "Modes de paiement, échéances, remboursements",
    articles: 10,
    color: "bg-purple-100 text-purple-600",
  },
]

const quickActions = [
  {
    title: "Déclarer un sinistre",
    description: "Déclarez votre sinistre en quelques clics",
    icon: Shield,
    href: "/client/sinistres/nouveau",
    urgent: true,
  },
  {
    title: "Télécharger une attestation",
    description: "Obtenez votre attestation d'assurance",
    icon: FileText,
    href: "/client/documents",
    urgent: false,
  },
  {
    title: "Modifier mes informations",
    description: "Mettez à jour vos données personnelles",
    icon: Users,
    href: "/client/profil",
    urgent: false,
  },
  {
    title: "Contacter un conseiller",
    description: "Échangez avec notre équipe support",
    icon: MessageSquare,
    href: "/client/messages",
    urgent: false,
  },
]

const popularArticles = [
  {
    title: "Comment déclarer un sinistre auto ?",
    category: "Sinistres",
    readTime: "3 min",
    views: 1250,
  },
  {
    title: "Modifier mon adresse de facturation",
    category: "Compte",
    readTime: "2 min",
    views: 980,
  },
  {
    title: "Que faire en cas de vol de véhicule ?",
    category: "Sinistres",
    readTime: "5 min",
    views: 875,
  },
  {
    title: "Comment résilier mon contrat ?",
    category: "Contrats",
    readTime: "4 min",
    views: 756,
  },
  {
    title: "Problème de connexion à mon espace client",
    category: "Technique",
    readTime: "2 min",
    views: 654,
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Centre de support</h1>
            <p className="text-xl text-muted-foreground">
              Trouvez rapidement l'aide dont vous avez besoin ou contactez notre équipe d'experts
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans l'aide..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
                <Button className="absolute right-2 top-2">Rechercher</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Actions rapides</h2>
            <p className="text-muted-foreground">Les actions les plus courantes à portée de clic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card
                  key={index}
                  className={`transition-shadow cursor-pointer ${action.urgent ? "border-red-200 bg-red-50" : ""}`}
                >
                  <Link href={action.href}>
                    <CardHeader className="text-center">
                      <div
                        className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${action.urgent ? "bg-red-100" : "bg-primary/10"}`}
                      >
                        <Icon className={`h-6 w-6 ${action.urgent ? "text-red-600" : "text-primary"}`} />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      {action.urgent && (
                        <Badge variant="destructive" className="mx-auto">
                          Urgent
                        </Badge>
                      )}
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Parcourir par catégorie</h2>
            <p className="text-muted-foreground">Trouvez l'aide dont vous avez besoin par thématique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card key={index} className="transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary">{category.articles} articles</Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Articles populaires</h2>
              <p className="text-muted-foreground">Les questions les plus fréquemment consultées</p>
            </div>

            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <Card key={index} className="transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{article.title}</h3>
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.readTime}
                          </span>
                          <span>{article.views} vues</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/faq">
                <Button variant="outline" size="lg">
                  Voir toutes les questions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Besoin d'aide personnalisée ?</h2>
              <p className="text-muted-foreground">Notre équipe d'experts est là pour vous accompagner</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Chat en direct</CardTitle>
                  <CardDescription>Assistance instantanée avec nos conseillers</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">En ligne</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Lun-Ven 9h-20h</p>
                  <Button className="w-full">Démarrer le chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Téléphone</CardTitle>
                  <CardDescription>Appelez-nous pour une assistance directe</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="font-semibold text-lg">01 23 45 67 89</p>
                  <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler maintenant
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Envoyez-nous un message détaillé</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-sm">Réponse sous 24h</p>
                  <p className="text-sm text-muted-foreground">support@Assuréo.fr</p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Mail className="mr-2 h-4 w-4" />
                      Nous écrire
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">Urgence 24h/24</CardTitle>
                <CardDescription className="text-red-700">
                  En cas d'urgence ou de sinistre grave, contactez-nous immédiatement
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    <Phone className="mr-2 h-4 w-4" />
                    01 23 45 67 00
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    urgence@Assuréo.fr
                  </Button>
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
