import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, MapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div>
              <Link href="/" className="inline-block">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Assuréo
                </span>
              </Link>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Votre partenaire de confiance pour une protection sur mesure depuis 2010.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs font-medium">
                Agrément ACPR
              </Badge>
              <Badge variant="outline" className="text-xs font-medium">
                Membre FFA
              </Badge>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Nos Assurances</h3>
            <div className="space-y-4">
              <Link href="/offres" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Assurance Auto
              </Link>
              <Link href="/offres" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Assurance Habitation
              </Link>
              <Link href="/offres" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Assurance Santé
              </Link>
              <Link href="/offres" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Assurance Vie
              </Link>
              <Link href="/simulation" className="block text-blue-600 font-medium hover:text-blue-700 transition-colors">
                Simulation gratuite →
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Support</h3>
            <div className="space-y-4">
              <Link href="/contact" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Nous contacter
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Questions fréquentes
              </Link>
              <Link href="/support" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Centre d'aide
              </Link>
              <Link href="/client" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                Espace Client
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                À propos
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Contact</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div
                  className="flex items-center space-x-2"
                >
                  <Phone className="h-5 w-5 text-muted-foreground mb-1" />
                  <p className="text-muted-foreground">01 23 45 67 89</p>
                </div>
                
                <div
                  className="flex items-center space-x-2"
                >
                  <Mail className="h-5 w-5 text-muted-foreground mb-1" />
                  <p className="text-muted-foreground">contact@assureo.fr</p>
                </div>
                
                <div
                  className="flex items-center space-x-2"
                >
                  <MapIcon className="h-5 w-5 text-muted-foreground mb-1" />
                  <p className="text-muted-foreground">
                    123 Rue de la Paix<br />
                    75001 Paris
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-16" />
        
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="text-center lg:text-left">
            <p className="text-muted-foreground mb-2">
              &copy; 2024 Assuréo. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground">
              Assuréo SAS - RCS Paris 123 456 789 - Capital social: 5 000 000€
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/legal" className="text-muted-foreground hover:text-blue-600 transition-colors">
              Mentions légales
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-blue-600 transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-blue-600 transition-colors">
              CGU
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-blue-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
