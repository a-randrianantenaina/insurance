import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create default admin user if not exists
  const adminEmail = "admin@assureo.fr"
  const adminPassword = "admin123" // This password will be hashed
  const hashedPassword = await bcrypt.hash(adminPassword, 12) // Hash the password

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        firstName: "Admin",
        lastName: "System",
        password: hashedPassword,
        role: "ADMIN",
      },
    })
    console.log(`Default admin user created: ${adminEmail}`)
  } else {
    console.log(`Admin user ${adminEmail} already exists.`)
  }
  const clientUsers = [
    {
      email: "marie.dupont@email.com",
      firstName: "Marie",
      lastName: "Dupont",
      password: "client123",
      role: "CLIENT" as const,
    },
    {
      email: "pierre.martin@email.com", 
      firstName: "Pierre",
      lastName: "Martin",
      password: "client123",
      role: "CLIENT" as const,
    },
  ]

  for (const clientData of clientUsers) {
    const existingClient = await prisma.user.findUnique({
      where: { email: clientData.email },
    })

    if (!existingClient) {
      const hashedClientPassword = await bcrypt.hash(clientData.password, 12)
      await prisma.user.create({
        data: {
          ...clientData,
          password: hashedClientPassword,
        },
      })
      console.log(`Default client user created: ${clientData.email}`)
    } else {
      console.log(`Client user ${clientData.email} already exists.`)
    }
  }

  // Insert sample insurance offers if they don't exist
  const offers = [
    {
      id: "auto-essentiel",
      name: "Auto Essentiel",
      description: "Protection de base pour votre véhicule",
      price: 29.99,
      coverage: ["Responsabilité civile", "Défense pénale"],
      features: [
        "Responsabilité civile obligatoire",
        "Défense pénale et recours",
        "Assistance panne 0 km",
        "Protection juridique",
      ],
    },
    {
      id: "auto-confort",
      name: "Auto Confort",
      description: "Protection étendue avec garanties supplémentaires",
      price: 49.99,
      coverage: ["Responsabilité civile", "Vol et incendie", "Bris de glace"],
      features: [
        "Toutes garanties Essentiel",
        "Vol et incendie",
        "Bris de glace",
        "Catastrophes naturelles",
        "Assistance étendue",
      ],
    },
    {
      id: "auto-premium",
      name: "Auto Premium",
      description: "Protection maximale tous risques",
      price: 79.99,
      coverage: ["Tous risques", "Valeur à neuf", "Véhicule de remplacement"],
      features: [
        "Toutes garanties Confort",
        "Tous risques collision",
        "Valeur à neuf 2 ans",
        "Véhicule de remplacement",
        "Équipements personnels",
      ],
    },
    {
      id: "habitation-base",
      name: "Habitation Base",
      description: "Protection essentielle pour votre logement",
      price: 19.99,
      coverage: ["Multirisque habitation", "Responsabilité civile"],
      features: [
        "Multirisque habitation",
        "Responsabilité civile vie privée",
        "Incendie et explosion",
        "Dégâts des eaux",
        "Vol et vandalisme",
      ],
    },
    {
      id: "habitation-plus",
      name: "Habitation Plus",
      description: "Protection complète avec services étendus",
      price: 34.99,
      coverage: ["Multirisque habitation", "Assistance 24h/24"],
      features: [
        "Toutes garanties Base",
        "Bris de glace",
        "Catastrophes naturelles",
        "Assistance habitation 24h/24",
        "Remboursement valeur à neuf",
      ],
    },
    {
      id: "sante-famille",
      name: "Santé Famille",
      description: "Couverture santé complète pour toute la famille",
      price: 89.99,
      coverage: ["Remboursement étendu", "Médecines douces", "Téléconsultation"],
      features: [
        "Remboursement jusqu'à 300%",
        "Médecines douces incluses",
        "Téléconsultation illimitée",
        "Dentaire et optique renforcés",
        "Hospitalisation premium",
      ],
    },
  ]

  for (const offerData of offers) {
    const existingOffer = await prisma.insuranceOffer.findUnique({
      where: { id: offerData.id },
    })
    if (!existingOffer) {
      await prisma.insuranceOffer.create({
        data: {
          ...offerData,
          // Keep coverage and features as arrays, not JSON strings
        },
      })
      console.log(`Insurance offer created: ${offerData.name}`)
    } else {
      console.log(`Insurance offer ${offerData.name} already exists.`)
    }
  }

  // Create sample messages for testing
  const marieUser = await prisma.user.findUnique({
    where: { email: "marie.dupont@email.com" },
  })

  const pierreUser = await prisma.user.findUnique({
    where: { email: "pierre.martin@email.com" },
  })

  if (marieUser) {
    const existingMessage = await prisma.message.findFirst({
      where: { userId: marieUser.id },
    })

    if (!existingMessage) {
      await prisma.message.create({
        data: {
          userId: marieUser.id,
          subject: "Question sur mon contrat auto",
          content: "Bonjour, j'ai une question concernant mon contrat d'assurance auto. Pouvez-vous m'aider ?",
          status: "UNREAD",
          isFromAdmin: false,
        },
      })
      console.log("Sample message created for Marie")
    }
  }

  if (pierreUser) {
    const existingMessage = await prisma.message.findFirst({
      where: { userId: pierreUser.id },
    })

    if (!existingMessage) {
      await prisma.message.create({
        data: {
          userId: pierreUser.id,
          subject: "Problème de paiement urgent",
          content: "Mon prélèvement a été rejeté, que dois-je faire ?",
          status: "UNREAD",
          isFromAdmin: false,
        },
      })
      console.log("Sample message created for Pierre")
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
