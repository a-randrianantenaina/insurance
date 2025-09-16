"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Shield,
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  BarChart3,
  Menu,
  LogOut,
  Loader2,
} from "lucide-react"
import { RoleGuard } from "@/components/auth/role-guard"

const sidebarItems = [
  { href: "/admin", icon: BarChart3, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Utilisateurs" },
  { href: "/admin/contracts", icon: FileText, label: "Contrats" },
  { href: "/admin/payments", icon: CreditCard, label: "Paiements" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/offers", icon: Shield, label: "Offres" },
  { href: "/admin/settings", icon: Settings, label: "Paramètres" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    router.push("/login")
    return null
  }

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-col h-full bg-background border-r ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Admin</h2>
            <p className="text-sm text-muted-foreground">Assuréo</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href === "/admin" && pathname === "/admin")
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group relative ${
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                  )}
                  <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 mb-4 p-3 rounded-lg bg-muted/50">
          <Avatar className="h-10 w-10">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials(session?.user?.name || "U")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{session?.user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => signOut()}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Se déconnecter
        </Button>
      </div>
    </div>
  )

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
          <Sidebar />
        </div>
        
        {/* Mobile Menu */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <div className="lg:hidden fixed top-4 left-4 z-50">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <Sidebar />
          </SheetContent>
        </Sheet>
        
        {/* Main Content */}
        <div className="lg:pl-80">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
