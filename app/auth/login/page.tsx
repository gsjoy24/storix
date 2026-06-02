"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, selectIsLoggedIn } from "@/store/slices/authSlice"
import { dummyUser } from "@/constants/user"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/account")
    }
  }, [isLoggedIn, router])

  if (isLoggedIn) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login(dummyUser))
    toast.success("Welcome back!")
    router.push("/account")
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your Storix account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="Any password works"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
          >
            Sign In
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-medium text-foreground hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
