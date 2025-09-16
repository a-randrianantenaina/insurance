"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FileText, MessageSquare, Settings, Download, Eye, Euro, CheckCircle } from "lucide-react"

// Mock data - in real app, this would come from API
const mockContracts = [
  {
    id: "1",
    contractNumber: "AUTO-2024-001",
    type: "Auto Confort",
    status: "ACTIVE",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    monthlyPremium: 49.99,
    nextPayment: "2024-02-15",
  },
  {
    id: "2",
    contractNumber: "HAB-2024-002",
    type: "Habitation Plus",
    status: "ACTIVE",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    monthlyPremium: 34.99,
    nextPayment: "2024-03-01",
  },
]

const mockPayments = [
  {
    id: "1",
    contractId: "1",
    amount: 49.99,
    status: "PAID",
    dueDate: "2024-01-15",
    paidAt: "2024-01-15",
  },
  {
    id: "2",
    contractId: "2",
    amount: 34.99,
    status: "PAID",
    dueDate: "2024-02-01",
    paidAt: "2024-02-01",
  },
  {
    id: "3",
    contractId: "1",
    amount: 49.99,
    status: "PENDING",
    dueDate: "2024-02-15",
    paidAt: null,
  },
]

const mockMessages = [
  {
    id: "1",
    subject: "Bienvenue chez Assuréo",
    content: "Merci d'avoir souscrit à nos services. Votre contrat est maintenant actif.",
    status: "READ",
    isFromAdmin: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    subject: "Rappel de paiement",
    content: "Votre prochaine échéance est prévue le 15 février 2024.",
    status: "UNREAD",
    isFromAdmin: true,
    createdAt: "2024-02-10",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
}

const statsVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function ClientPage() {
  const [activeTab, setActiveTab] = useState("contracts")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "PAID":
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div className="mb-8" variants={itemVariants}>
            <h1 className="text-3xl font-bold mb-2">Espace Client</h1>
            <p className="text-muted-foreground">Gérez vos contrats et suivez vos paiements en toute simplicité</p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            variants={containerVariants}
          >
            <motion.div variants={statsVariants}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FileText className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contrats actifs</p>
                      <motion.p 
                        className="text-2xl font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      >
                        2
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={statsVariants}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Euro className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prime mensuelle</p>
                      <motion.p 
                        className="text-2xl font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      >
                        84,98€
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={statsVariants}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">Paiements à jour</p>
                      <motion.p 
                        className="text-2xl font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                      >
                        ✓
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={statsVariants}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 0.5 },
                        scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                      }}
                    >
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">Messages non lus</p>
                      <motion.p 
                        className="text-2xl font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                      >
                        1
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="contracts">Mes Contrats</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="profile">Mon Profil</TabsTrigger>
              </TabsList>

              {/* Contracts Tab */}
              <TabsContent value="contracts" className="space-y-4">
                <motion.div 
                  className="grid gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {mockContracts.map((contract, index) => (
                    <motion.div
                      key={contract.id}
                      variants={cardVariants}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="flex items-center space-x-2">
                                <span>{contract.type}</span>
                                {getStatusBadge(contract.status)}
                              </CardTitle>
                              <CardDescription>Contrat n° {contract.contractNumber}</CardDescription>
                            </div>
                            <div className="text-right">
                              <motion.p 
                                className="text-2xl font-bold"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                              >
                                {contract.monthlyPremium}€
                              </motion.p>
                              <p className="text-sm text-muted-foreground">par mois</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Date de début</p>
                              <p className="font-medium">{new Date(contract.startDate).toLocaleDateString("fr-FR")}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Date de fin</p>
                              <p className="font-medium">{new Date(contract.endDate).toLocaleDateString("fr-FR")}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Prochain paiement</p>
                              <p className="font-medium">{new Date(contract.nextPayment).toLocaleDateString("fr-FR")}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                Voir le contrat
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments" className="space-y-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des paiements</CardTitle>
                      <CardDescription>Suivez tous vos paiements et échéances</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="space-y-4"
                        variants={containerVariants}
                      >
                        {mockPayments.map((payment, index) => (
                          <motion.div 
                            key={payment.id} 
                            className="flex items-center justify-between p-4 border rounded-lg"
                            variants={itemVariants}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center space-x-4">
                              <motion.div
                                className={`w-3 h-3 rounded-full ${
                                  payment.status === "PAID" ? "bg-green-500" : "bg-yellow-500"
                                }`}
                                animate={{
                                  scale: payment.status === "PENDING" ? [1, 1.2, 1] : 1,
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: payment.status === "PENDING" ? Infinity : 0,
                                }}
                              />
                              <div>
                                <p className="font-medium">{payment.amount}€</p>
                                <p className="text-sm text-muted-foreground">
                                  Échéance: {new Date(payment.dueDate).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(payment.status)}
                              {payment.paidAt && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Payé le {new Date(payment.paidAt).toLocaleDateString("fr-FR")}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Messagerie</CardTitle>
                      <CardDescription>Échangez avec notre équipe support</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="space-y-4"
                        variants={containerVariants}
                      >
                        {mockMessages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            className={`p-4 border rounded-lg ${
                              message.status === "UNREAD" ? "bg-primary/10 border-primary/20" : ""
                            }`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{message.subject}</h4>
                              <div className="flex items-center space-x-2">
                                {message.status === "UNREAD" && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                  >
                                    <Badge variant="secondary">Nouveau</Badge>
                                  </motion.div>
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {new Date(message.createdAt).toLocaleDateString("fr-FR")}
                                </span>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{message.content}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                      <div className="mt-6">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Nouveau message
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>Gérez vos informations de compte</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        variants={containerVariants}
                      >
                        <motion.div variants={itemVariants}>
                          <label className="text-sm font-medium">Prénom</label>
                          <p className="text-muted-foreground">Jean</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <label className="text-sm font-medium">Nom</label>
                          <p className="text-muted-foreground">Dupont</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <label className="text-sm font-medium">Email</label>
                          <p className="text-muted-foreground">jean.dupont@email.com</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <label className="text-sm font-medium">Téléphone</label>
                          <p className="text-muted-foreground">01 23 45 67 89</p>
                        </motion.div>
                        <motion.div className="md:col-span-2" variants={itemVariants}>
                          <label className="text-sm font-medium">Adresse</label>
                          <p className="text-muted-foreground">123 Rue de la Paix, 75001 Paris</p>
                        </motion.div>
                      </motion.div>
                      <motion.div 
                        className="mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button>
                            <Settings className="mr-2 h-4 w-4" />
                            Modifier mes informations
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
