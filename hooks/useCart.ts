"use client"

import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCartDrawer,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectIsCartOpen,
} from "@/store/slices/cartSlice"
import type { Product } from "@/types"

export function useCart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const count = useSelector(selectCartCount)
  const isOpen = useSelector(selectIsCartOpen)

  const addItem = useCallback(
    (product: Product, quantity?: number) => {
      dispatch(addToCart({ product, quantity }))
    },
    [dispatch],
  )

  const removeItem = useCallback(
    (productId: string) => {
      dispatch(removeFromCart(productId))
    },
    [dispatch],
  )

  const updateItemQuantity = useCallback(
    (productId: string, quantity: number) => {
      dispatch(updateQuantity({ productId, quantity }))
    },
    [dispatch],
  )

  const emptyCart = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  const toggleDrawer = useCallback(() => {
    dispatch(toggleCartDrawer())
  }, [dispatch])

  return {
    items,
    total,
    count,
    isOpen,
    addItem,
    removeItem,
    updateItemQuantity,
    emptyCart,
    toggleDrawer,
  }
}
