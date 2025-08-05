"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageThread } from "@/components/messaging/message-thread"
import { Search, MessageSquare, Users } from "lucide-react"

interface MessageThreadInfo {
  id: string
  subject: string
  clientName: string
  clientEmail: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  status: "OPEN" | "CLOSED" | "PENDING"
  priority: "LOW" | "MEDIUM" | "HIGH"
  assignedTo?: string
}

// Mock data
const mockThreads: MessageThreadInfo[] = [
  {
    id: "1",
    subject: "Question sur mon contrat auto",
    clientName: "Marie Dupont",
    clientEmail: "marie.dupont@email.com",
    lastMessage: "Absolument ! Vous pouvez ajouter un conducteur secondaire...",
    lastMessageAt: "2024-02-20T09:45:00Z",
    unreadCount: 0,
    status: "OPEN",
    priority: "MEDIUM",
    assignedTo: "Support Niveau 1",
  },
  {
    id: "2",
    subject: "Problème de paiement urgent",
    clientName: "Pierre Martin",
    clientEmail: "pierre.martin@email.com",
    lastMessage: "Mon prélèvement a été rejeté, que dois-je faire ?",
    lastMessageAt: "2024-02-20T08:30:00Z",
    unreadCount: 2,
    status: "PENDING",
    priority: "HIGH",
    assignedTo: "Service Comptabilité",
  },
  {
    id: "3",
    subject: "Demande de résiliation",
    clientName: "Sophie Bernard",
    clientEmail: "sophie.bernard@email.com",
    lastMessage: "Merci pour votre aide, le problème est résolu.",
    lastMessageAt: "2024-02-19T16:20:00Z",
    unreadCount: 0,
    status: "CLOSED",
    priority: "LOW",
  },
]

export default function AdminMessagesPage() {
  const [threads, setThreads] = useState<MessageThreadInfo[]>(mockThreads)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threads[0]?.id || null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredThreads = threads.filter((thread) => {
    const matchesSearch =
      thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || thread.status === statusFilter
    const matchesPriority = priorityFilter === "all" || thread.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "À l'instant"
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    if (diffInHours < 48) return "Hier"
    return date.toLocaleDateString("fr-FR")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return <Badge className="bg-green-100 text-green-800">Ouvert</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "CLOSED":
        return <Badge variant="secondary">Fermé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <Badge variant="destructive">Haute</Badge>
      case "MEDIUM":
        return <Badge className="bg-orange-100 text-orange-800">Moyenne</Badge>
      case "LOW":
        return <Badge variant="outline">Basse</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const totalUnread = threads.reduce((sum, thread) => sum + thread.unreadCount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messagerie Support</h1>
          <p className="text-muted-foreground">
            Gérez les conversations clients • {totalUnread} message{totalUnread > 1 ? "s" : ""} non lu
            {totalUnread > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threads List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Conversations ({filteredThreads.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Filters */}
              <div className="p-4 border-b space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="OPEN">Ouvert</SelectItem>
                      <SelectItem value="PENDING">En attente</SelectItem>
                      <SelectItem value="CLOSED">Fermé</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="HIGH">Haute</SelectItem>
                      <SelectItem value="MEDIUM">Moyenne</SelectItem>
                      <SelectItem value="LOW">Basse</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{thread.subject}</h4>
                            <p className="text-xs text-muted-foreground">
                              {thread.clientName} • {thread.clientEmail}
                            </p>
                          </div>
                          {thread.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                            >
                              {thread.unreadCount}
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {getStatusBadge(thread.status)}
                            {getPriorityBadge(thread.priority)}
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(thread.lastMessageAt)}</span>
                        </div>

                        {thread.assignedTo && (
                          <p className="text-xs text-muted-foreground">Assigné à: {thread.assignedTo}</p>
                        )}
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
            <MessageThread threadId={selectedThreadId} currentUserId="admin1" currentUserRole="ADMIN" />
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
  )
}
