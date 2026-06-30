import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import achievementsReducer from './features/achievements/achievements.slice'
import authReducer from './features/auth/auth.slice'
import exploredReducer from './features/explored/explored.slice'
import favoritesReducer from './features/favorites/favorites.slice'
import notesReducer from './features/notes/notes.slice'
import progressReducer from './features/progress/progress.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    explored: exploredReducer,
    notes: notesReducer,
    progress: progressReducer,
    achievements: achievementsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
