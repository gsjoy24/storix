"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "@/store/slices/authSlice"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return <>{children}</>
}
