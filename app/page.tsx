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
import { motion } from "framer-motion";
import {
  Camera,
  Check,
  Clock,
  Headphones,
  Laptop,
  Shield,
  Smartphone,
  Tv,
  Zap,
} from "lucide-react";
import Link from "next/link";

// Données des tarifs d'assurance appareils
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
  },
  {
    id: 5,
    range: "2001€ - 2500€",
    price: "24,99",
    examples: ["MacBook Pro", "Appareils photo reflex haut de gamme"],
    icon: Laptop,
    popular: false,
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background image (z-0) */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('/images/img-hero.png'), linear-gradient(120deg, hsl(var(--background)/0.3), hsl(var(--background)/0.55))",
            backgroundBlendMode: "overlay",
          }}
        />
        {/* Accent soft shapes overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-soft-light bg-[radial-gradient(at_30%_40%,hsl(var(--primary)/0.35),transparent_60%),radial-gradient(at_70%_70%,hsl(var(--accent)/0.35),transparent_65%)]" />
        {/* Darkening overlay */}
        <div className="absolute inset-0 z-[1] bg-black/45 md:bg-black/55 backdrop-brightness-90" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl lg:text-6xl font-bold  text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Protégez vos{" "}
              <span className="text-primary">appareils électroniques</span> en
              toute sérénité
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground text-white max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Assurance complète pour tous vos appareils : smartphones,
              ordinateurs, appareils photo et plus encore. Souscription en ligne
              en 2 minutes.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="#tarifs">
                <Button size="lg" className="text-lg px-8">
                  Voir nos tarifs
                </Button>
              </Link>
              <Link href="/simulation">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Faire une simulation
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Que couvre notre assurance ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Protection complète pour tous les incidents du quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="tarifs" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Nos tarifs selon la valeur de vos appareils
            </h2>
            <p className="text-muted-foreground text-lg">
              Choisissez le plan adapté à la valeur de votre appareil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devicePlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`relative h-full ${
                      plan.popular
                        ? "border-primary ring-2 ring-primary/20"
                        : ""
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        Le plus populaire
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{plan.range}</CardTitle>
                      <div className="text-3xl font-bold text-primary">
                        {plan.price}€
                        <span className="text-sm font-normal text-muted-foreground">
                          /mois
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        <strong>Exemples d'appareils :</strong>
                      </CardDescription>
                      <ul className="space-y-2 mb-6">
                        {plan.examples.map((example, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/simulation?plan=${plan.id}`}>
                        <Button
                          className="w-full"
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Souscrire maintenant
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Prêt à protéger vos appareils ?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Souscrivez en moins de 2 minutes et bénéficiez d'une protection
              immédiate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulation">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Commencer ma souscription
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
