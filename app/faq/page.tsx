"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Search, ChevronDown, ChevronRight, HelpCircle, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    id: "general",
    name: "Questions générales",
    count: 8,
    questions: [
      {
        question: "Comment fonctionne Assuréo ?",
        answer:
          "Assuréo est une plateforme d'assurance 100% digitale. Vous pouvez souscrire, gérer et modifier vos contrats entièrement en ligne. Notre processus simplifié vous permet d'obtenir un devis en quelques minutes et de signer électroniquement votre contrat.",
      },
      {
        question: "Vos tarifs sont-ils compétitifs ?",
        answer:
          "Oui, nous proposons des tarifs très compétitifs grâce à notre modèle 100% digital qui nous permet de réduire nos coûts opérationnels. De plus, nous analysons régulièrement le marché pour vous garantir les meilleurs prix.",
      },
      {
        question: "Puis-je avoir plusieurs assurances chez vous ?",
        answer:
          "Absolument ! Vous pouvez souscrire plusieurs types d'assurance (auto, habitation, santé, vie) et bénéficier de réductions multi-contrats. Tout est gérable depuis un seul espace client.",
      },
      {
        question: "Comment contacter le service client ?",
        answer:
          "Notre service client est disponible par téléphone (01 23 45 67 89), email (contact@assureo.fr), chat en ligne sur notre site, ou via la messagerie de votre espace client. Nous sommes disponibles du lundi au vendredi de 9h à 18h.",
      },
    ],
  },
  {
    id: "souscription",
    name: "Souscription",
    count: 6,
    questions: [
      {
        question: "Comment souscrire une assurance en ligne ?",
        answer:
          "1. Faites une simulation gratuite sur notre site\n2. Choisissez l'offre qui vous convient\n3. Remplissez le formulaire de souscription\n4. Signez électroniquement votre contrat\n5. Effectuez votre premier paiement\n6. Recevez votre contrat par email",
      },
      {
        question: "Quels documents dois-je fournir ?",
        answer:
          "Les documents requis dépendent du type d'assurance. Généralement : pièce d'identité, justificatif de domicile, RIB. Pour l'assurance auto : permis de conduire et carte grise. Pour l'habitation : bail ou acte de propriété.",
      },
      {
        question: "La signature électronique est-elle légale ?",
        answer:
          "Oui, notre signature électronique est certifiée et a la même valeur juridique qu'une signature manuscrite. Elle respecte le règlement européen eIDAS et garantit l'authenticité et l'intégrité de votre contrat.",
      },
      {
        question: "Puis-je annuler ma souscription ?",
        answer:
          "Vous disposez d'un délai de rétractation de 14 jours après la souscription pour annuler votre contrat sans frais ni justification. Passé ce délai, vous pouvez résilier selon les conditions générales.",
      },
    ],
  },
  {
    id: "contrats",
    name: "Gestion des contrats",
    count: 7,
    questions: [
      {
        question: "Comment modifier mon contrat ?",
        answer:
          "Vous pouvez modifier votre contrat directement depuis votre espace client ou en nous contactant. Certaines modifications (changement d'adresse, ajout de garanties) peuvent être effectuées immédiatement, d'autres nécessitent validation.",
      },
      {
        question: "Comment résilier mon contrat ?",
        answer:
          "Vous pouvez résilier votre contrat à tout moment après la première année, ou immédiatement en cas de changement de situation (déménagement, vente du véhicule, etc.). La résiliation peut se faire en ligne ou par courrier recommandé.",
      },
      {
        question: "Que se passe-t-il en cas de non-paiement ?",
        answer:
          "En cas de non-paiement, vous recevez d'abord un rappel. Après 10 jours, une mise en demeure est envoyée. Si le paiement n'est toujours pas effectué après 30 jours, le contrat peut être suspendu puis résilié.",
      },
      {
        question: "Comment obtenir une attestation d'assurance ?",
        answer:
          "Votre attestation d'assurance est disponible 24h/24 dans votre espace client. Vous pouvez la télécharger, l'imprimer ou la recevoir par email. Elle est mise à jour automatiquement à chaque modification de votre contrat.",
      },
    ],
  },
  {
    id: "sinistres",
    name: "Sinistres",
    count: 5,
    questions: [
      {
        question: "Comment déclarer un sinistre ?",
        answer:
          "Vous pouvez déclarer un sinistre 24h/24 via votre espace client, par téléphone au 01 23 45 67 89, ou par email à sinistres@assureo.fr. Plus la déclaration est rapide, plus le traitement sera efficace.",
      },
      {
        question: "Quels sont les délais de déclaration ?",
        answer:
          "Vous devez déclarer un sinistre dans les 5 jours ouvrés suivant sa survenance, ou dans les 2 jours en cas de vol. Pour les catastrophes naturelles, le délai est de 10 jours après publication de l'arrêté.",
      },
      {
        question: "Comment suivre mon dossier sinistre ?",
        answer:
          "Vous pouvez suivre l'avancement de votre dossier sinistre en temps réel depuis votre espace client. Vous recevez également des notifications par email à chaque étape importante du traitement.",
      },
      {
        question: "Quand serai-je indemnisé ?",
        answer:
          "Les délais d'indemnisation varient selon la complexité du sinistre. Pour les dossiers simples, l'indemnisation intervient sous 15 jours. Pour les dossiers complexes, cela peut prendre jusqu'à 3 mois.",
      },
    ],
  },
  {
    id: "paiements",
    name: "Paiements",
    count: 4,
    questions: [
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer:
          "Nous acceptons les paiements par carte bancaire, prélèvement SEPA, virement bancaire et chèque. Le prélèvement automatique est recommandé pour éviter tout oubli de paiement.",
      },
      {
        question: "Puis-je modifier ma fréquence de paiement ?",
        answer:
          "Oui, vous pouvez choisir entre un paiement mensuel, trimestriel, semestriel ou annuel. Cette modification peut être effectuée depuis votre espace client ou en nous contactant.",
      },
      {
        question: "Que faire en cas d'échec de prélèvement ?",
        answer:
          "En cas d'échec de prélèvement, nous vous en informons immédiatement par email et SMS. Vous avez 10 jours pour régulariser la situation via votre espace client ou en nous contactant.",
      },
      {
        question: "Puis-je obtenir un remboursement ?",
        answer:
          "Oui, en cas de résiliation en cours d'échéance, nous remboursons au prorata la partie non consommée de votre cotisation, déduction faite des éventuels frais de dossier.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          (selectedCategory === "all" || selectedCategory === category.id) &&
          (searchTerm === "" ||
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.count, 0)

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
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Centre d'aide</h1>
            <p className="text-xl text-muted-foreground">
              Trouvez rapidement les réponses à vos questions sur nos services d'assurance
            </p>
            <Badge variant="secondary">{totalQuestions} questions fréquentes</Badge>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans la FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  size="sm"
                >
                  Toutes
                </Button>
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    size="sm"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier votre recherche ou parcourez toutes les catégories
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                >
                  Voir toutes les questions
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center space-x-3 mb-6">
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <Badge variant="secondary">{category.questions.length}</Badge>
                    </div>

                    <div className="space-y-4">
                      {category.questions.map((item, index) => {
                        const itemId = `${category.id}-${index}`
                        const isOpen = openItems.includes(itemId)

                        return (
                          <Card key={index}>
                            <Collapsible>
                              <CollapsibleTrigger className="w-full" onClick={() => toggleItem(itemId)}>
                                <CardHeader className="hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-left text-lg font-medium">{item.question}</CardTitle>
                                    {isOpen ? (
                                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    )}
                                  </div>
                                </CardHeader>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <CardContent className="pt-0">
                                  <div className="text-muted-foreground whitespace-pre-line">{item.answer}</div>
                                </CardContent>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Vous ne trouvez pas votre réponse ?</CardTitle>
                <CardDescription>Notre équipe d'experts est là pour vous aider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="w-full sm:w-auto">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Nous contacter
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    <Phone className="mr-2 h-4 w-4" />
                    01 23 45 67 89
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
