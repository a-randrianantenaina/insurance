import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
            <p className="text-muted-foreground">Conditions d'utilisation du site Assuréo</p>
            <p className="text-sm text-muted-foreground mt-2">Dernière mise à jour : 1er janvier 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Objet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités et
                  conditions d'utilisation du site internet www.Assuréo.fr (ci-après "le Site") édité par
                  Assuréo SAS.
                </p>
                <p className="text-muted-foreground mt-4">
                  L'utilisation du Site implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez
                  pas ces conditions, vous ne devez pas utiliser le Site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Accès au site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les coûts
                  afférents à l'accès au Site, que ce soient les frais matériels, logiciels ou d'accès à Internet, sont
                  exclusivement à la charge de l'utilisateur.
                </p>
                <p className="text-muted-foreground">
                  Assuréo se réserve le droit de modifier, suspendre ou interrompre l'accès au Site à tout moment,
                  sans préavis, pour des raisons de maintenance, de mise à jour ou pour toute autre raison jugée
                  nécessaire.
                </p>
                <p className="text-muted-foreground">
                  L'utilisateur est seul responsable de la protection de son matériel et de ses données contre les virus
                  ou autres programmes malveillants.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Création de compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Pour accéder à certains services du Site, l'utilisateur doit créer un compte en fournissant des
                  informations exactes, complètes et à jour.
                </p>
                <p className="text-muted-foreground">L'utilisateur s'engage à :</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Fournir des informations véridiques et exactes</li>
                  <li>Maintenir ses informations à jour</li>
                  <li>Préserver la confidentialité de ses identifiants de connexion</li>
                  <li>Informer immédiatement Assuréo de toute utilisation non autorisée de son compte</li>
                </ul>
                <p className="text-muted-foreground">
                  Assuréos se réserve le droit de suspendre ou supprimer tout compte en cas de violation des
                  présentes CGU.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Services proposés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Le Site permet aux utilisateurs de :</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Obtenir des devis d'assurance personnalisés</li>
                  <li>Souscrire des contrats d'assurance en ligne</li>
                  <li>Gérer leurs contrats depuis leur espace client</li>
                  <li>Déclarer des sinistres</li>
                  <li>Contacter le service client</li>
                  <li>Accéder à des informations sur les produits d'assurance</li>
                </ul>
                <p className="text-muted-foreground">
                  Les services sont fournis sous réserve de leur disponibilité. Assuréo ne garantit pas que les
                  services seront disponibles en permanence et sans interruption.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Obligations de l'utilisateur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  L'utilisateur s'engage à utiliser le Site conformément aux présentes CGU et à la réglementation en
                  vigueur. Il s'interdit notamment de :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Utiliser le Site à des fins illégales ou non autorisées</li>
                  <li>Transmettre des contenus illicites, diffamatoires ou portant atteinte aux droits de tiers</li>
                  <li>Tenter d'accéder de manière non autorisée aux systèmes informatiques</li>
                  <li>Perturber le fonctionnement du Site</li>
                  <li>Collecter des données personnelles d'autres utilisateurs</li>
                  <li>Utiliser des robots, scripts ou autres moyens automatisés</li>
                </ul>
                <p className="text-muted-foreground">
                  L'utilisateur garantit l'exactitude des informations qu'il communique et s'engage à les maintenir à
                  jour.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Le Site et l'ensemble de son contenu (textes, images, vidéos, logos, marques, etc.) sont protégés par
                  les droits de propriété intellectuelle et appartiennent à Assuréo ou à ses partenaires.
                </p>
                <p className="text-muted-foreground">
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
                  éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation
                  écrite préalable d'Assuréo.
                </p>
                <p className="text-muted-foreground">
                  L'utilisateur peut consulter et imprimer les pages du Site pour son usage personnel et privé, à
                  l'exclusion de toute utilisation commerciale.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Protection des données personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les données personnelles collectées sur le Site sont traitées conformément à notre Politique de
                  Confidentialité, accessible à l'adresse suivante :{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    www.Assuréo.fr/privacy
                  </a>
                </p>
                <p className="text-muted-foreground mt-4">
                  L'utilisateur dispose d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition
                  et de portabilité sur ses données personnelles, qu'il peut exercer en contactant notre Délégué à la
                  Protection des Données à l'adresse dpo@Assuréo.fr.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Assuréo s'efforce de fournir des informations exactes et à jour sur le Site, mais ne peut
                  garantir l'exactitude, la complétude ou l'actualité de ces informations.
                </p>
                <p className="text-muted-foreground">Assuréo ne saurait être tenue responsable :</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Des dommages directs ou indirects résultant de l'utilisation du Site</li>
                  <li>Des interruptions, dysfonctionnements ou indisponibilités du Site</li>
                  <li>Des dommages résultant d'une utilisation non conforme du Site</li>
                  <li>Des dommages causés par des tiers ou des éléments extérieurs</li>
                </ul>
                <p className="text-muted-foreground">L'utilisateur utilise le Site sous sa seule responsabilité.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Liens hypertextes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Le Site peut contenir des liens vers d'autres sites internet. Assuréo n'exerce aucun contrôle sur
                  ces sites et décline toute responsabilité quant à leur contenu ou leur utilisation.
                </p>
                <p className="text-muted-foreground mt-4">
                  La création de liens vers le Site est autorisée sous réserve qu'ils ne portent pas atteinte à l'image
                  d'Assuréo et qu'ils respectent la réglementation en vigueur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Le Site utilise des cookies pour améliorer l'expérience utilisateur et analyser l'utilisation du Site.
                  L'utilisateur peut configurer son navigateur pour refuser les cookies, mais cela peut affecter le
                  fonctionnement du Site.
                </p>
                <p className="text-muted-foreground mt-4">
                  Pour plus d'informations sur l'utilisation des cookies, consultez notre Politique de Confidentialité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Modification des CGU</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Assuréo se réserve le droit de modifier les présentes CGU à tout moment. Les modifications
                  entrent en vigueur dès leur publication sur le Site.
                </p>
                <p className="text-muted-foreground mt-4">
                  Il appartient à l'utilisateur de consulter régulièrement les CGU pour prendre connaissance des
                  éventuelles modifications. L'utilisation continue du Site après modification des CGU vaut acceptation
                  des nouvelles conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Résiliation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  L'utilisateur peut cesser d'utiliser le Site à tout moment et supprimer son compte depuis son espace
                  client ou en contactant le service client.
                </p>
                <p className="text-muted-foreground mt-4">
                  Assuréo peut suspendre ou résilier l'accès au Site de tout utilisateur en cas de violation des
                  présentes CGU, sans préavis et sans indemnité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>13. Droit applicable et juridiction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les présentes CGU sont régies par le droit français. Tout litige relatif à l'interprétation ou à
                  l'exécution des présentes CGU sera soumis aux tribunaux compétents de Paris.
                </p>
                <p className="text-muted-foreground mt-4">
                  Avant toute action judiciaire, les parties s'efforceront de résoudre le litige à l'amiable. En cas
                  d'échec, l'utilisateur peut saisir le médiateur de l'assurance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>14. Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Assuréo SAS</strong>
                  <br />
                  123 Rue de la Paix, 75001 Paris
                  <br />
                  Téléphone : 01 23 45 67 89
                  <br />
                  Email : contact@Assuréo.fr
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
