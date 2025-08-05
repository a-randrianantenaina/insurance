import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle, Star, ArrowRight, Check } from "lucide-react"

const offers = [
  {
    id: "auto-essentiel",
    category: "Auto",
    name: "Essentiel",
    price: 29.99,
    description: "Protection de base pour votre véhicule",
    features: [
      "Responsabilité civile obligatoire",
      "Défense pénale et recours",
      "Assistance panne 0 km",
      "Protection juridique",
    ],
    popular: false,
  },
  {
    id: "auto-confort",
    category: "Auto",
    name: "Confort",
    price: 49.99,
    description: "Protection étendue avec garanties supplémentaires",
    features: [
      "Toutes garanties Essentiel",
      "Vol et incendie",
      "Bris de glace",
      "Catastrophes naturelles",
      "Assistance étendue",
    ],
    popular: true,
  },
  {
    id: "auto-premium",
    category: "Auto",
    name: "Premium",
    price: 79.99,
    description: "Protection maximale tous risques",
    features: [
      "Toutes garanties Confort",
      "Tous risques collision",
      "Valeur à neuf 2 ans",
      "Véhicule de remplacement",
      "Équipements personnels",
    ],
    popular: false,
  },
  {
    id: "habitation-base",
    category: "Habitation",
    name: "Habitation Base",
    price: 19.99,
    description: "Protection essentielle pour votre logement",
    features: [
      "Multirisque habitation",
      "Responsabilité civile vie privée",
      "Incendie et explosion",
      "Dégâts des eaux",
      "Vol et vandalisme",
    ],
    popular: false,
  },
  {
    id: "habitation-plus",
    category: "Habitation",
    name: "Habitation Plus",
    price: 34.99,
    description: "Protection complète avec services étendus",
    features: [
      "Toutes garanties Base",
      "Bris de glace",
      "Catastrophes naturelles",
      "Assistance habitation 24h/24",
      "Remboursement valeur à neuf",
    ],
    popular: true,
  },
  {
    id: "sante-famille",
    category: "Santé",
    name: "Santé Famille",
    price: 89.99,
    description: "Couverture santé complète pour toute la famille",
    features: [
      "Remboursement jusqu'à 300%",
      "Médecines douces incluses",
      "Téléconsultation illimitée",
      "Dentaire et optique renforcés",
      "Hospitalisation premium",
    ],
    popular: true,
  },
]

export default function OffresPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Nos offres d'assurance</h1>
            <p className="text-xl text-muted-foreground">
              Découvrez nos formules adaptées à tous vos besoins. Souscription en ligne simple et rapide avec signature
              électronique.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <Card key={offer.id} className={`relative ${offer.popular ? "border-primary" : ""}`}>
                {offer.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Populaire</Badge>
                )}

                <CardHeader className="text-center">
                  <div className="space-y-2">
                    <Badge variant="secondary">{offer.category}</Badge>
                    <CardTitle className="text-2xl">{offer.name}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                  </div>
                  <div className="pt-4">
                    <div className="text-4xl font-bold">
                      {offer.price}€<span className="text-lg font-normal text-muted-foreground">/mois</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {offer.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-primary mt-1" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link href={`/souscription?offer=${offer.id}`}>
                      <Button className="w-full" variant={offer.popular ? "default" : "outline"}>
                        Souscrire maintenant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/offres/${offer.id}`}>
                      <Button variant="ghost" className="w-full">
                        Voir les détails
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir nos offres ?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des garanties transparentes, des tarifs compétitifs et un service client d'exception
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Sans engagement</h3>
              <p className="text-muted-foreground">Résiliez à tout moment sans frais ni pénalités</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Service premium</h3>
              <p className="text-muted-foreground">Support client 7j/7 et gestion 100% digitale</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Souscription rapide</h3>
              <p className="text-muted-foreground">Contrat signé et actif en moins de 10 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Une question sur nos offres ?</h2>
            <p className="text-xl mb-8 opacity-90">Nos conseillers sont là pour vous accompagner dans votre choix</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Nous contacter
                </Button>
              </Link>
              <Link href="/simulation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  Faire une simulation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
