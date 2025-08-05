"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="min-h-screen relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Votre protection sur mesure, <span className="text-primary">en quelques clics</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Découvrez nos solutions d'assurance personnalisées. Souscription 100% en ligne.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/offres">
                <Button size="lg" className="text-lg px-8">
                  Découvrir nos offres
                </Button>
              </Link>
              <Link href="/simulation">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Faire une simulation
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating animation elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </section>

      <Footer />
    </div>
  )
}