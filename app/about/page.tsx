import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Users, Award, TrendingUp, Heart, Globe, CheckCircle, ArrowRight, Check } from "lucide-react"

const stats = [
  { label: "Clients satisfaits", value: "50,000+", icon: Users },
  { label: "Années d'expérience", value: "25+", icon: Award },
  { label: "Taux de satisfaction", value: "98%", icon: Heart },
  { label: "Présence nationale", value: "100%", icon: Globe },
]

const values = [
  {
    icon: Shield,
    title: "Sécurité",
    description: "Protection maximale de vos données et transparence totale sur nos engagements.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Une équipe dédiée à votre écoute pour vous accompagner à chaque étape.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "Des solutions modernes et digitales pour simplifier votre expérience.",
  },
  {
    icon: Heart,
    title: "Engagement",
    description: "Un service de qualité et des tarifs justes pour tous nos clients.",
  },
]

const timeline = [
  {
    year: "1999",
    title: "Création d'Assuréo",
    description: "Fondation de l'entreprise avec la vision de démocratiser l'assurance.",
  },
  {
    year: "2005",
    title: "Expansion nationale",
    description: "Ouverture de 10 agences régionales et lancement de l'assurance habitation.",
  },
  {
    year: "2012",
    title: "Révolution digitale",
    description: "Première plateforme de souscription 100% en ligne du marché français.",
  },
  {
    year: "2018",
    title: "Intelligence artificielle",
    description: "Intégration de l'IA pour personnaliser les offres et améliorer le service client.",
  },
  {
    year: "2024",
    title: "Nouvelle génération",
    description: "Lancement de la plateforme nouvelle génération avec signature électronique.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              À propos de nous
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              25 ans d'expertise au service de <span className="text-primary">votre protection</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Depuis 1999, Assuréo accompagne les particuliers et les professionnels avec des solutions d'assurance
              innovantes, transparentes et accessibles.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Notre mission</h2>
              <p className="text-xl text-muted-foreground">
                Rendre l'assurance simple, accessible et transparente pour tous
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Une vision moderne de l'assurance</h3>
                <p className="text-muted-foreground">
                  Chez Assuréo, nous croyons que l'assurance ne doit plus être un casse-tête. C'est pourquoi nous
                  avons développé une approche 100% digitale qui vous permet de souscrire, gérer et modifier vos
                  contrats en quelques clics.
                </p>
                <p className="text-muted-foreground">
                  Notre équipe d'experts travaille chaque jour pour vous proposer des solutions sur mesure, des tarifs
                  compétitifs et un service client d'exception. Nous mettons la technologie au service de l'humain pour
                  vous offrir la meilleure expérience possible.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5" />
                    <span>Souscription 100% en ligne en moins de 10 minutes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5" />
                    <span>Signature électronique certifiée et sécurisée</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5" />
                    <span>Gestion de vos contrats depuis votre espace client</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5" />
                    <span>Support client 7j/7 par chat, email ou téléphone</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <Shield className="h-32 w-32 text-primary/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos valeurs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Notre histoire</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              25 ans d'innovation et d'engagement à vos côtés
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="secondary">{item.year}</Badge>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Notre équipe</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Des experts passionnés à votre service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">JD</span>
                </div>
                <h3 className="font-semibold text-lg">Jean Dupont</h3>
                <p className="text-muted-foreground mb-2">Directeur Général</p>
                <p className="text-sm text-muted-foreground">
                  25 ans d'expérience dans l'assurance, passionné par l'innovation et la satisfaction client.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">SM</span>
                </div>
                <h3 className="font-semibold text-lg">Sophie Martin</h3>
                <p className="text-muted-foreground mb-2">Directrice Technique</p>
                <p className="text-sm text-muted-foreground">
                  Experte en transformation digitale, elle pilote l'innovation technologique d'Assuréo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">PL</span>
                </div>
                <h3 className="font-semibold text-lg">Pierre Leroy</h3>
                <p className="text-muted-foreground mb-2">Directeur Commercial</p>
                <p className="text-sm text-muted-foreground">
                  Spécialiste des relations clients, il veille à ce que chaque interaction soit exceptionnelle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Rejoignez la famille Assuréo</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Découvrez pourquoi plus de 50,000 clients nous font confiance pour leur protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulation">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Faire une simulation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
