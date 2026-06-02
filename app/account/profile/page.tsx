"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { selectIsLoggedIn, selectUser } from "@/store/slices/authSlice"
import { toast } from "sonner"

export default function ProfilePage() {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)

  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [street, setStreet] = useState(user?.address.street ?? "")
  const [city, setCity] = useState(user?.address.city ?? "")
  const [country, setCountry] = useState(user?.address.country ?? "")
  const [zip, setZip] = useState(user?.address.zip ?? "")

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile updated!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/account">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Account
        </Link>
      </Button>
      <h1 className="font-heading text-3xl font-bold tracking-tight mb-8">Edit Profile</h1>

      <form onSubmit={handleSave} className="max-w-xl space-y-8">
        <div>
          <h2 className="font-heading text-lg font-bold mb-4">Personal Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="font-heading text-lg font-bold mb-4">Address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="street">Street</Label>
              <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="rounded-full">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </form>
    </div>
  )
}
