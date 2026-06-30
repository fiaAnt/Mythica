import { db } from '@/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'

export const fetchExplored = createAsyncThunk(
  'explored/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userData = userSnap.data()
        return userData.explored || []
      }
      return []
    } catch (error) {
      console.error('Error fetching explored:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch explored')
    }
  },
)

export const addExplored = createAsyncThunk(
  'explored/add',
  async ({ userId, characterId }: { userId: string; characterId: string }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        throw new Error('User not found')
      }

      const currentExplored = userSnap.data().explored || []

      if (!currentExplored.includes(characterId)) {
        await updateDoc(userRef, {
          explored: arrayUnion(characterId),
        })
      }

      return characterId
    } catch (error) {
      console.error('Error adding explored:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add explored')
    }
  },
)
