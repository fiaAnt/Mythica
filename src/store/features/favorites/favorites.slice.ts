import { createSlice } from '@reduxjs/toolkit'
import { clearFavorites, fetchFavorites, toggleFavorite } from './favorites.thunk'
import { FavoritesState } from './favorites.types'

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoritesState: (state) => {
      state.favorites = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.favorites = action.payload
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.action === 'added') {
          if (!state.favorites.includes(action.payload.characterId)) {
            state.favorites.push(action.payload.characterId)
          }
        } else {
          state.favorites = state.favorites.filter((id) => id !== action.payload.characterId)
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(clearFavorites.pending, (state) => {
        state.loading = true
      })
      .addCase(clearFavorites.fulfilled, (state) => {
        state.loading = false
        state.favorites = []
      })
      .addCase(clearFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearFavoritesState } = favoritesSlice.actions
export default favoritesSlice.reducer
