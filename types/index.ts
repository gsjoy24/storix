export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  images: string[]
  badge?: "New" | "Sale" | "Hot" | "Limited"
  description: string
  specs: Record<string, string>
  inStock: boolean
  featured: boolean
  trending: boolean
}

export type Category = {
  id: string
  slug: string
  name: string
  image: string
  productCount: number
}

export type Review = {
  id: string
  productId: string
  author: string
  avatar: string
  rating: number
  title: string
  body: string
  date: string
}

export type CartItem = {
  product: Product
  quantity: number
  selectedColor?: string
}

export type Order = {
  id: string
  date: string
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled"
  items: CartItem[]
  total: number
}

export type User = {
  name: string
  email: string
  avatar: string
  address: {
    street: string
    city: string
    country: string
    zip: string
  }
}
