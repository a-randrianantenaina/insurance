import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PATCH /api/messages/[id] - Marquer un message comme lu
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const messageId = params.id
    const body = await request.json()
    const { status } = body

    // Vérifier que l'utilisateur peut modifier ce message
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    })

    if (!message) {
      return NextResponse.json(
        { error: "Message non trouvé" },
        { status: 404 }
      )
    }

    // Un utilisateur ne peut modifier que ses propres messages ou un admin peut modifier tous les messages
    if (message.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { status },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du message:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// DELETE /api/messages/[id] - Supprimer un message (admin seulement)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const messageId = params.id

    await prisma.message.delete({
      where: { id: messageId },
    })

    return NextResponse.json({ message: "Message supprimé avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
