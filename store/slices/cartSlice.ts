import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"
import type { Product, CartItem } from "@/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload
      const existing = state.items.find((item) => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }
      state.isOpen = true
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.product.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload
      const item = state.items.find((i) => i.product.id === productId)
      if (item) {
        item.quantity = Math.max(1, quantity)
      }
    },
    clearCart(state) {
      state.items = []
    },
    toggleCartDrawer(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCartDrawer } =
  cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen

export default cartSlice.reducer
