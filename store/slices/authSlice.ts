import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../index"
import type { User } from "@/types"

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true
      state.user = action.payload
    },
    logout(state) {
      state.isLoggedIn = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
