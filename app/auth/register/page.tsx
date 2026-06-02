"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, selectIsLoggedIn } from "@/store/slices/authSlice"
import { dummyUser } from "@/constants/user"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/account")
    }
  }, [isLoggedIn, router])

  if (isLoggedIn) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login(dummyUser))
    toast.success("Account created! Welcome to Storix.")
    router.push("/")
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="mt-2 text-muted-foreground">Join Storix and start shopping</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" required placeholder="Alex Morgan" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="alex@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required placeholder="Create a password" />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" required placeholder="Confirm your password" />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
          >
            Create Account
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
