import { createSlice } from '@reduxjs/toolkit'
import { login, logout, restoreSession } from './auth.thunk'
import { AuthState } from './auth.types'

const initialState: AuthState = {
  user: null,
  tokens: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isInitialized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.isInitialized = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload as string
        state.isInitialized = true
      })
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.isInitialized = true

        if (action.payload) {
          state.isAuthenticated = true
          state.user = action.payload.user
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isLoading = false
        state.isInitialized = true
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, {
          ...initialState,
          isInitialized: true,
        })
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
