"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RoleGuard } from "@/components/auth/role-guard"
import { Loader2 } from "lucide-react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

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

  return (
    <RoleGuard allowedRoles={["CLIENT", "ADMIN"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </div>
    </RoleGuard>
  )
}
