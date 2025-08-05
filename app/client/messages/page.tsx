"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MessageThread } from "@/components/messaging/message-thread"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Plus, Search, MessageSquare } from "lucide-react"

interface MessageThreadInfo {
  id: string
  subject: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  status: "OPEN" | "CLOSED"
  participants: Array<{
    id: string
    name: string
    role: "CLIENT" | "ADMIN"
  }>
}

// Mock data
const mockThreads: MessageThreadInfo[] = [
  {
    id: "1",
    subject: "Question sur mon contrat auto",
    lastMessage: "Absolument ! Vous pouvez ajouter un conducteur secondaire...",
    lastMessageAt: "2024-02-20T09:45:00Z",
    unreadCount: 0,
    status: "OPEN",
    participants: [
      { id: "user1", name: "Marie Dupont", role: "CLIENT" },
      { id: "admin1", name: "Support Assuréo", role: "ADMIN" },
    ],
  },
  {
    id: "2",
    subject: "Problème de paiement",
    lastMessage: "Nous avons bien reçu votre paiement. Merci !",
    lastMessageAt: "2024-02-19T14:30:00Z",
    unreadCount: 1,
    status: "OPEN",
    participants: [
      { id: "user1", name: "Marie Dupont", role: "CLIENT" },
      { id: "admin2", name: "Service Comptabilité", role: "ADMIN" },
    ],
  },
]

export default function ClientMessagesPage() {
  const [threads, setThreads] = useState<MessageThreadInfo[]>(mockThreads)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threads[0]?.id || null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredThreads = threads.filter(
    (thread) =>
      thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "À l'instant"
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    if (diffInHours < 48) return "Hier"
    return date.toLocaleDateString("fr-FR")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Messagerie</h1>
            <p className="text-muted-foreground">Échangez avec notre équipe support</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Threads List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Conversations</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Nouveau
                    </Button>
                  </div>
                  <CardDescription>
                    {threads.length} conversation{threads.length > 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {filteredThreads.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Aucune conversation</p>
                      </div>
                    ) : (
                      filteredThreads.map((thread) => (
                        <div
                          key={thread.id}
                          className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                            selectedThreadId === thread.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedThreadId(thread.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm truncate flex-1">{thread.subject}</h4>
                            {thread.unreadCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                              >
                                {thread.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-2">{thread.lastMessage}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant={thread.status === "OPEN" ? "default" : "secondary"} className="text-xs">
                              {thread.status === "OPEN" ? "Ouvert" : "Fermé"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{formatDate(thread.lastMessageAt)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Thread */}
            <div className="lg:col-span-2">
              {selectedThreadId ? (
                <MessageThread threadId={selectedThreadId} currentUserId="user1" currentUserRole="CLIENT" />
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Sélectionnez une conversation pour commencer</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
