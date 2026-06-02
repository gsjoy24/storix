"use client"

import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "./useRedux"
import {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  selectWishlistItems,
} from "@/store/slices/wishlistSlice"
import type { Product } from "@/types"

export function useWishlist() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectWishlistItems)

  const addItem = useCallback(
    (product: Product) => {
      dispatch(addToWishlist(product))
    },
    [dispatch],
  )

  const removeItem = useCallback(
    (productId: string) => {
      dispatch(removeFromWishlist(productId))
    },
    [dispatch],
  )

  const toggle = useCallback(
    (product: Product) => {
      dispatch(toggleWishlist(product))
    },
    [dispatch],
  )

  const isWishlisted = (productId: string) =>
    items.some((item) => item.id === productId)

  return { items, addItem, removeItem, toggle, isWishlisted }
}
