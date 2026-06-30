import { db } from '@/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'

export const fetchFavorites = createAsyncThunk(
  'favorites/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userData = userSnap.data()
        return userData.favorites || []
      }
      return []
    } catch (error) {
      console.error('Error fetching favorites:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch favorites')
    }
  },
)

export const toggleFavorite = createAsyncThunk(
  'favorites/toggle',
  async (
    { userId, characterId }: { userId: string; characterId: string },
    { getState, rejectWithValue },
  ) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        throw new Error('User not found')
      }

      const currentFavorites = userSnap.data().favorites || []
      const isFavorite = currentFavorites.includes(characterId)

      if (isFavorite) {
        await updateDoc(userRef, {
          favorites: arrayRemove(characterId),
        })
        return { characterId, action: 'removed' }
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(characterId),
        })
        return { characterId, action: 'added' }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to toggle favorite')
    }
  },
)

export const clearFavorites = createAsyncThunk(
  'favorites/clear',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId)
      await updateDoc(userRef, {
        favorites: [],
      })
      return []
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to clear favorites')
    }
  },
)
