import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Politique de confidentialité</h1>
            <p className="text-muted-foreground">
              Comment nous collectons, utilisons et protégeons vos données personnelles
            </p>
            <p className="text-sm text-muted-foreground mt-2">Dernière mise à jour : 1er janvier 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Responsable du traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Assuréo SAS, société par actions simplifiée au capital de 1 000 000 €, immatriculée au RCS de
                  Paris sous le numéro 123 456 789, dont le siège social est situé 123 Rue de la Paix, 75001 Paris, est
                  responsable du traitement de vos données personnelles.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Contact :</strong>
                  <br />
                  Email : dpo@Assuréo.fr
                  <br />
                  Téléphone : 01 23 45 67 89
                  <br />
                  Adresse : 123 Rue de la Paix, 75001 Paris
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Données collectées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Données d'identification</h4>
                  <p className="text-muted-foreground">
                    Nom, prénom, date de naissance, adresse postale, adresse email, numéro de téléphone, numéro de pièce
                    d'identité.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Données de connexion</h4>
                  <p className="text-muted-foreground">
                    Adresse IP, données de navigation, cookies, logs de connexion, type de navigateur, système
                    d'exploitation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Données contractuelles</h4>
                  <p className="text-muted-foreground">
                    Informations sur vos contrats d'assurance, historique des sinistres, données de paiement,
                    correspondances.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Données sensibles</h4>
                  <p className="text-muted-foreground">
                    Uniquement dans le cadre de l'assurance santé et avec votre consentement explicite : données de
                    santé nécessaires à l'évaluation du risque et au traitement des sinistres.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Finalités du traitement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Gestion des contrats d'assurance</h4>
                  <p className="text-muted-foreground">
                    Souscription, modification, résiliation des contrats, calcul des primes, gestion des échéances.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Gestion des sinistres</h4>
                  <p className="text-muted-foreground">
                    Déclaration, instruction, règlement des sinistres, lutte contre la fraude.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Relation client</h4>
                  <p className="text-muted-foreground">
                    Support client, traitement des réclamations, enquêtes de satisfaction, communication commerciale.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Obligations légales</h4>
                  <p className="text-muted-foreground">
                    Respect des obligations réglementaires, lutte contre le blanchiment d'argent, archivage légal.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Base légale du traitement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Exécution du contrat</h4>
                  <p className="text-muted-foreground">
                    Traitement nécessaire à l'exécution du contrat d'assurance ou à l'exécution de mesures
                    précontractuelles.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Obligation légale</h4>
                  <p className="text-muted-foreground">
                    Traitement nécessaire au respect d'une obligation légale (Code des assurances, Code monétaire et
                    financier).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Intérêt légitime</h4>
                  <p className="text-muted-foreground">
                    Amélioration de nos services, sécurisation des systèmes, lutte contre la fraude.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Consentement</h4>
                  <p className="text-muted-foreground">
                    Communication commerciale, cookies non essentiels, traitement de données sensibles.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Destinataires des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Services internes</h4>
                  <p className="text-muted-foreground">
                    Équipes commerciales, techniques, juridiques et comptables d'Assuréo.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Partenaires</h4>
                  <p className="text-muted-foreground">
                    Réassureurs, experts, réparateurs, prestataires de services (dans la limite nécessaire à l'exécution
                    de leurs missions).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Autorités</h4>
                  <p className="text-muted-foreground">
                    Autorités de contrôle (ACPR, CNIL), autorités judiciaires, administrations fiscales (sur demande
                    légale).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Durée de conservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Données contractuelles</h4>
                  <p className="text-muted-foreground">
                    Conservées pendant toute la durée du contrat puis 5 ans après sa résiliation (prescription légale).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Données de sinistres</h4>
                  <p className="text-muted-foreground">
                    Conservées 10 ans à compter du règlement du sinistre (prescription décennale).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Données de prospection</h4>
                  <p className="text-muted-foreground">
                    Conservées 3 ans à compter du dernier contact ou de la fin de la relation commerciale.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Données de connexion</h4>
                  <p className="text-muted-foreground">
                    Logs conservés 1 an conformément à la réglementation sur les communications électroniques.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Vos droits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Droit d'accès</h4>
                  <p className="text-muted-foreground">
                    Vous pouvez demander l'accès aux données personnelles vous concernant.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Droit de rectification</h4>
                  <p className="text-muted-foreground">
                    Vous pouvez demander la correction de données inexactes ou incomplètes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Droit à l'effacement</h4>
                  <p className="text-muted-foreground">
                    Vous pouvez demander la suppression de vos données dans certaines conditions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Droit à la limitation</h4>
                  <p className="text-muted-foreground">
                    Vous pouvez demander la limitation du traitement de vos données.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Droit à la portabilité</h4>
                  <p className="text-muted-foreground">
                    Vous pouvez récupérer vos données dans un format structuré et lisible.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Droit d'opposition</h4>
                  <p className="text-muted-foreground">
                    Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes.
                  </p>
                </div>
                <p className="text-muted-foreground mt-4">
                  <strong>Pour exercer vos droits :</strong>
                  <br />
                  Email : dpo@Assuréo.fr
                  <br />
                  Courrier : Assuréo - DPO, 123 Rue de la Paix, 75001 Paris
                  <br />
                  Une pièce d'identité pourra être demandée pour vérifier votre identité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Sécurité des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos
                  données personnelles contre la destruction, la perte, l'altération, la divulgation ou l'accès non
                  autorisés.
                </p>
                <div>
                  <h4 className="font-semibold">Mesures techniques</h4>
                  <p className="text-muted-foreground">
                    Chiffrement des données, pare-feu, antivirus, sauvegardes sécurisées, contrôle d'accès.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Mesures organisationnelles</h4>
                  <p className="text-muted-foreground">
                    Formation du personnel, politique de sécurité, procédures d'accès, audit régulier.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser l'utilisation
                  du site.
                </p>
                <div>
                  <h4 className="font-semibold">Cookies essentiels</h4>
                  <p className="text-muted-foreground">
                    Nécessaires au fonctionnement du site (authentification, panier, préférences).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Cookies analytiques</h4>
                  <p className="text-muted-foreground">
                    Permettent d'analyser l'utilisation du site pour l'améliorer (Google Analytics).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Cookies publicitaires</h4>
                  <p className="text-muted-foreground">
                    Permettent d'afficher des publicités personnalisées (avec votre consentement).
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Vous pouvez gérer vos préférences de cookies via le bandeau de consentement ou les paramètres de votre
                  navigateur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Transferts internationaux</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vos données peuvent être transférées vers des pays situés en dehors de l'Union européenne, notamment
                  pour l'hébergement de notre site web (États-Unis). Ces transferts sont encadrés par des garanties
                  appropriées (clauses contractuelles types, décisions d'adéquation) pour assurer un niveau de
                  protection équivalent à celui de l'UE.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Modifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cette politique de confidentialité peut être modifiée à tout moment. Les modifications importantes
                  vous seront notifiées par email ou via un avis sur notre site web. La version en vigueur est toujours
                  disponible sur cette page avec sa date de dernière mise à jour.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Contact et réclamations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pour toute question concernant cette politique de confidentialité ou le traitement de vos données
                  personnelles, vous pouvez nous contacter :
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Délégué à la Protection des Données (DPO) :</strong>
                  <br />
                  Email : dpo@Assuréo.fr
                  <br />
                  Téléphone : 01 23 45 67 89
                  <br />
                  Adresse : Assuréo - DPO, 123 Rue de la Paix, 75001 Paris
                </p>
                <p className="text-muted-foreground mt-4">
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de
                  la Commission Nationale de l'Informatique et des Libertés (CNIL) :
                </p>
                <p className="text-muted-foreground">
                  CNIL - 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
                  <br />
                  Téléphone : 01 53 73 22 22
                  <br />
                  Site web :{" "}
                  <a href="https://www.cnil.fr" className="text-primary hover:underline">
                    cnil.fr
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
