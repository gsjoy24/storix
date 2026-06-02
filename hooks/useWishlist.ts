"use client"

import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  selectWishlistItems,
  selectIsWishlisted,
} from "@/store/slices/wishlistSlice"
import type { Product } from "@/types"

export function useWishlist() {
  const dispatch = useDispatch()
  const items = useSelector(selectWishlistItems)

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

  const isWishlisted = useCallback(
    (productId: string) => {
      return useSelector(selectIsWishlisted(productId))
    },
    [],
  )

  return { items, addItem, removeItem, toggle, isWishlisted }
}
