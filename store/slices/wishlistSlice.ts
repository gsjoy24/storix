import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"
import type { Product } from "@/types"

interface WishlistState {
  items: Product[]
}

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    toggleWishlist(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
    },
  },
})

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions

export const selectWishlistItems = (state: RootState) => state.wishlist.items
export const selectIsWishlisted = (productId: string) => (state: RootState) =>
  state.wishlist.items.some((item) => item.id === productId)

export default wishlistSlice.reducer
