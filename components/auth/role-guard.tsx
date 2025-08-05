"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
  fallbackUrl?: string
}

export function RoleGuard({ children, allowedRoles, fallbackUrl = "/" }: RoleGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/login")
      return
    }

    if (!allowedRoles.includes(session.user.role)) {
      router.push(fallbackUrl)
      return
    }
  }, [session, status, router, allowedRoles, fallbackUrl])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session || !allowedRoles.includes(session.user.role)) {
    return null
  }

  return <>{children}</>
}
