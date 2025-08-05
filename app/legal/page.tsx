import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Mentions légales</h1>
            <p className="text-muted-foreground">Informations légales concernant Assuréo</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Éditeur du site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Assuréo SAS</h4>
                  <p className="text-muted-foreground">
                    Société par Actions Simplifiée au capital de 1 000 000 €<br />
                    Siège social : 123 Rue de la Paix, 75001 Paris
                    <br />
                    RCS Paris 123 456 789
                    <br />
                    SIRET : 123 456 789 00012
                    <br />
                    Code APE : 6512Z
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Directeur de la publication</h4>
                  <p className="text-muted-foreground">Jean Dupont, Directeur Général</p>
                </div>
                <div>
                  <h4 className="font-semibold">Contact</h4>
                  <p className="text-muted-foreground">
                    Téléphone : 01 23 45 67 89
                    <br />
                    Email : contact@assureo.fr
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agrément et contrôle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Autorité de Contrôle Prudentiel et de Résolution (ACPR)</h4>
                  <p className="text-muted-foreground">
                    Assuréo est agréée par l'ACPR sous le numéro 12345678
                    <br />4 Place de Budapest, CS 92459, 75436 Paris Cedex 09
                    <br />
                    Site web :{" "}
                    <a href="https://acpr.banque-france.fr" className="text-primary hover:underline">
                      acpr.banque-france.fr
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Garantie Financière</h4>
                  <p className="text-muted-foreground">
                    Garantie financière accordée par la Caisse Centrale de Réassurance
                    <br />
                    157 Boulevard Haussmann, 75008 Paris
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Responsabilité Civile Professionnelle</h4>
                  <p className="text-muted-foreground">
                    Assurance Responsabilité Civile Professionnelle souscrite auprès d'AXA France
                    <br />
                    Contrat n° 123456789
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hébergement</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold">Vercel Inc.</h4>
                  <p className="text-muted-foreground">
                    340 S Lemon Ave #4133
                    <br />
                    Walnut, CA 91789
                    <br />
                    États-Unis
                    <br />
                    Site web :{" "}
                    <a href="https://vercel.com" className="text-primary hover:underline">
                      vercel.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la
                  propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                  téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-muted-foreground">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
                  formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
                <p className="text-muted-foreground">
                  Les marques et logos reproduits sur ce site sont déposés par les sociétés qui en sont propriétaires.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation de responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à
                  différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
                </p>
                <p className="text-muted-foreground">
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir
                  le signaler par email, à l'adresse contact@Assuréo.fr, en décrivant le problème de la manière la
                  plus précise possible.
                </p>
                <p className="text-muted-foreground">
                  Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule
                  responsabilité. En conséquence, Assuréo ne saurait être tenu responsable d'un quelconque dommage
                  subi par l'ordinateur de l'utilisateur ou d'une quelconque perte de données consécutives au
                  téléchargement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Droit applicable et attribution de juridiction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Tout litige en relation avec l'utilisation du site www.assureo.fr est soumis au droit français.
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                </p>
                <p className="text-muted-foreground">
                  En cas de litige, les parties s'efforceront de trouver une solution amiable avant toute action
                  judiciaire. En cas d'échec de ces tentatives, tous les litiges auxquels les présentes conditions
                  générales d'utilisation pourraient donner lieu, concernant tant leur validité, leur interprétation ou
                  leur exécution, seront soumis aux tribunaux français compétents.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Médiation</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold">Médiateur de l'Assurance</h4>
                  <p className="text-muted-foreground">
                    En cas de litige, vous pouvez saisir le Médiateur de l'Assurance :<br />
                    TSA 50110
                    <br />
                    75441 Paris Cedex 09
                    <br />
                    Site web :{" "}
                    <a href="https://www.mediation-assurance.org" className="text-primary hover:underline">
                      mediation-assurance.org
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
