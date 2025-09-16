"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, Check, X, MessageSquare, CreditCard, FileText, AlertTriangle } from "lucide-react"

interface Notification {
  id: string
  type: "MESSAGE" | "PAYMENT" | "CONTRACT" | "SYSTEM"
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

// Mock data - in real app, this would come from API
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "MESSAGE",
    title: "Nouveau message",
    message: "Vous avez reçu un nouveau message de l'équipe support",
    isRead: false,
    createdAt: "2024-02-20T10:30:00Z",
    actionUrl: "/client/messages",
  },
  {
    id: "2",
    type: "PAYMENT",
    title: "Paiement confirmé",
    message: "Votre paiement de 49.99€ a été traité avec succès",
    isRead: false,
    createdAt: "2024-02-19T14:15:00Z",
    actionUrl: "/client/payments",
  },
  {
    id: "3",
    type: "CONTRACT",
    title: "Contrat renouvelé",
    message: "Votre contrat AUTO-2024-001 a été renouvelé automatiquement",
    isRead: true,
    createdAt: "2024-02-18T09:00:00Z",
    actionUrl: "/client/contracts",
  },
  {
    id: "4",
    type: "SYSTEM",
    title: "Maintenance programmée",
    message: "Une maintenance est prévue le 25 février de 2h à 4h",
    isRead: true,
    createdAt: "2024-02-17T16:45:00Z",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "MESSAGE":
        return <MessageSquare className="h-4 w-4 text-primary" />
      case "PAYMENT":
        return <CreditCard className="h-4 w-4 text-green-500" />
      case "CONTRACT":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "SYSTEM":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <Check className="h-4 w-4 mr-1" />
                  Tout marquer lu
                </Button>
              )}
            </div>
            <CardDescription>
              {unreadCount > 0 ? `${unreadCount} non lue(s)` : "Toutes les notifications sont lues"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">Aucune notification</div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0 ${
                        !notification.isRead ? "bg-primary/10" : ""
                      }`}
                      onClick={() => {
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl
                        }
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.createdAt)}</p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
