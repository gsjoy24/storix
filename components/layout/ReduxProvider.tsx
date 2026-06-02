"use client"

import { Provider } from "react-redux"
import { Toaster } from "sonner"
import { store } from "@/store"
import type { ReactNode } from "react"

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="bottom-right" richColors />
    </Provider>
  )
}
