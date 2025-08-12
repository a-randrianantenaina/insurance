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
import {
  ArrowRight,
  Camera,
  Check,
  CheckCircle,
  Clock,
  Headphones,
  Laptop,
  Shield,
  Smartphone,
  Star,
  Tv,
  Zap,
} from "lucide-react";
import Link from "next/link";

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
    icon: Headphones,
    popular: false,
    description: "Protection essentielle pour vos appareils de valeur modeste",
    monthlyPrice: 1.0,
    yearlyPrice: 12.0,
    savings: 0,
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
    icon: Smartphone,
    popular: true,
    description: "Le choix préféré pour les appareils du quotidien",
    monthlyPrice: 8.99,
    yearlyPrice: 97.0,
    savings: 11,
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
    icon: Laptop,
    popular: false,
    description: "Protection renforcée pour vos appareils premium",
    monthlyPrice: 12.99,
    yearlyPrice: 140.0,
    savings: 16,
  },
  {
    id: 4,
    range: "1501€ - 2000€",
    price: "16,99",
    examples: [
      "Ordinateurs portables professionnels",
      "Appareils photo hybrides",
    ],
    icon: Camera,
    popular: false,
    description: "Couverture complète pour vos équipements professionnels",
    monthlyPrice: 16.99,
    yearlyPrice: 184.0,
    savings: 20,
  },
  {
    id: 5,
    range: "2001€ - 2500€",
    price: "24,99",
    examples: ["MacBook Pro", "Appareils photo reflex haut de gamme"],
    icon: Laptop,
    popular: false,
    description: "Protection premium pour vos investissements technologiques",
    monthlyPrice: 24.99,
    yearlyPrice: 270.0,
    savings: 30,
  },
  {
    id: 6,
    range: "2501€ - 3000€",
    price: "34,99",
    examples: [
      "Matériel informatique très performant",
      "Matériel professionnel de pointe",
    ],
    icon: Tv,
    popular: false,
    description: "Couverture maximale pour vos équipements haut de gamme",
    monthlyPrice: 34.99,
    yearlyPrice: 378.0,
    savings: 42,
  },
];

const coverageFeatures = [
  {
    icon: Shield,
    title: "Casse accidentelle",
    description:
      "Protection contre les chutes, impacts et dommages accidentels",
    included: "Réparation ou remplacement selon dommages",
  },
  {
    icon: Zap,
    title: "Dommages électriques",
    description: "Court-circuits, surtensions, problèmes de batterie",
    included: "Prise en charge des réparations électroniques",
  },
  {
    icon: CheckCircle,
    title: "Vol et tentative de vol",
    description: "Protection en cas de vol avec ou sans violence",
    included: "Remboursement à valeur de remplacement",
  },
  {
    icon: Clock,
    title: "Remplacement rapide",
    description: "Service express de remplacement d'appareil",
    included: "Nouvel appareil livré sous 48h ouvrées",
  },
];

const whyChooseUs = [
  {
    title: "Souscription en 2 minutes",
    description: "Process simplifié, 100% en ligne, activation immédiate",
  },
  {
    title: "Franchise réduite",
    description: "Seulement 50€ de franchise sur tous nos plans",
  },
  {
    title: "Aucun questionnaire médical",
    description:
      "Pas de formalités complexes, juste les infos de votre appareil",
  },
  {
    title: "Résiliation à tout moment",
    description: "Flexibilité totale, résiliez quand vous voulez",
  },
];

export default function OffresPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Nos offres d'assurance{" "}
            <span className="text-primary">appareils électroniques</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protection complète adaptée à la valeur de vos appareils. Choisissez
            le plan qui correspond parfaitement à vos besoins.
          </p>
        </div>
      </section>

      {/* Coverage Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Ce que couvrent tous nos plans
            </h2>
            <p className="text-muted-foreground text-lg">
              Protection complète incluse dans toutes nos offres
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {feature.description}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {feature.included}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Choisissez votre plan d'assurance
            </h2>
            <p className="text-muted-foreground text-lg">
              Tarifs basés sur la valeur de votre appareil - Protection
              identique pour tous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {devicePlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.id}
                  className={`relative h-full transition-all hover:scale-105 ${
                    plan.popular ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Star className="h-3 w-3 mr-1" />
                      Le plus populaire
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg mb-2">{plan.range}</CardTitle>
                    <CardDescription className="text-sm mb-4">
                      {plan.description}
                    </CardDescription>

                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-primary">
                        {plan.price}€
                        <span className="text-sm font-normal text-muted-foreground">
                          /mois
                        </span>
                      </div>
                      {plan.savings > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <span className="line-through">
                            {(plan.monthlyPrice * 12).toFixed(0)}€
                          </span>
                          <span className="text-primary font-semibold ml-2">
                            {plan.yearlyPrice}€/an
                          </span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Économisez {plan.savings}€
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">
                          Exemples d'appareils :
                        </h4>
                        <ul className="space-y-1">
                          {plan.examples.map((example, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <Check className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Toutes garanties incluses</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Franchise 50€ seulement</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Sans engagement</span>
                        </div>
                      </div>

                      <div className="pt-4 space-y-2">
                        <Link href={`/simulation?plan=${plan.id}`}>
                          <Button
                            className="w-full"
                            variant={plan.popular ? "default" : "outline"}
                          >
                            Souscrire maintenant
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                        <Link href={`/simulation?plan=${plan.id}`}>
                          <Button variant="ghost" className="w-full text-sm">
                            Faire une simulation
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Pourquoi choisir notre assurance ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Des avantages pensés pour vous simplifier la vie
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((advantage, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à protéger vos appareils ?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui ont choisi notre
            assurance pour protéger leurs appareils électroniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulation">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Faire une simulation gratuite
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
