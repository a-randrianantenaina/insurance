"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Paperclip } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  senderRole: "CLIENT" | "ADMIN"
  createdAt: string
  attachments?: Array<{
    id: string
    name: string
    url: string
    type: string
  }>
}

interface MessageThreadProps {
  threadId: string
  currentUserId: string
  currentUserRole: "CLIENT" | "ADMIN"
}

// Mock data
const mockMessages: Message[] = [
  {
    id: "1",
    content: "Bonjour, j'ai une question concernant mon contrat d'assurance auto. Pouvez-vous m'aider ?",
    senderId: "user1",
    senderName: "Marie Dupont",
    senderRole: "CLIENT",
    createdAt: "2024-02-20T09:00:00Z",
  },
  {
    id: "2",
    content: "Bonjour Marie, bien sûr ! Je serais ravi de vous aider. Quelle est votre question exactement ?",
    senderId: "admin1",
    senderName: "Support Assuréo",
    senderRole: "ADMIN",
    createdAt: "2024-02-20T09:15:00Z",
  },
  {
    id: "3",
    content:
      "Je voudrais savoir si je peux ajouter un conducteur secondaire à mon contrat. Mon fils vient d'avoir son permis.",
    senderId: "user1",
    senderName: "Marie Dupont",
    senderRole: "CLIENT",
    createdAt: "2024-02-20T09:30:00Z",
  },
  {
    id: "4",
    content:
      "Absolument ! Vous pouvez ajouter un conducteur secondaire. Cela nécessitera un ajustement de votre prime. Pouvez-vous me communiquer l'âge de votre fils et depuis quand il a son permis ?",
    senderId: "admin1",
    senderName: "Support Assuréo",
    senderRole: "ADMIN",
    createdAt: "2024-02-20T09:45:00Z",
  },
]

export function MessageThread({ threadId, currentUserId, currentUserRole }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    setIsLoading(true)

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: currentUserId,
      senderName: currentUserRole === "ADMIN" ? "Support Assuréo" : "Vous",
      senderRole: currentUserRole,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setIsLoading(false)

    // TODO: Send message to API
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Conversation</CardTitle>
            <CardDescription>
              {currentUserRole === "ADMIN" ? "Support client" : "Assistance Assuréo"}
            </CardDescription>
          </div>
          <Badge variant="outline">
            {messages.length} message{messages.length > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUserId
              const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId

              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} ${showAvatar ? "mt-4" : "mt-1"}`}
                >
                  <div className={`flex max-w-[80%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                    {showAvatar && (
                      <Avatar className={`w-8 h-8 ${isCurrentUser ? "ml-2" : "mr-2"}`}>
                        <AvatarFallback
                          className={message.senderRole === "ADMIN" ? "bg-primary text-primary-foreground" : "bg-muted"}
                        >
                          {getInitials(message.senderName)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`${!showAvatar ? (isCurrentUser ? "mr-10" : "ml-10") : ""}`}>
                      {showAvatar && (
                        <div
                          className={`text-xs text-muted-foreground mb-1 ${isCurrentUser ? "text-right" : "text-left"}`}
                        >
                          {message.senderName}
                        </div>
                      )}

                      <div
                        className={`rounded-lg px-3 py-2 ${
                          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className="flex items-center space-x-2 p-2 bg-background/10 rounded"
                              >
                                <Paperclip className="h-3 w-3" />
                                <span className="text-xs">{attachment.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        className={`text-xs text-muted-foreground mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}
                      >
                        {formatTime(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Textarea
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                className="min-h-[60px] resize-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button onClick={sendMessage} disabled={!newMessage.trim() || isLoading} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
