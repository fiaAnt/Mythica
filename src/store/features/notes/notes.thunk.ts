import { db } from '@/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const fetchNotes = createAsyncThunk(
  'notes/fetch',
  async ({ userId, characterId }: { userId: string; characterId: string }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userData = userSnap.data()
        const characterNotes = userData.notes?.[characterId] || null
        return { characterId, notes: characterNotes }
      }
      return { characterId, notes: null }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch notes')
    }
  },
)

export const addNote = createAsyncThunk(
  'notes/add',
  async (
    { userId, characterId, text }: { userId: string; characterId: string; text: string },
    { rejectWithValue },
  ) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      const newNote = {
        id: Date.now().toString(),
        text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const currentNotes = userSnap.data()?.notes || {}

      await setDoc(
        userRef,
        {
          notes: {
            ...currentNotes,
            [characterId]: newNote,
          },
        },
        { merge: true },
      )

      return { characterId, note: newNote }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add note')
    }
  },
)

export const updateNote = createAsyncThunk(
  'notes/update',
  async (
    {
      userId,
      characterId,
      noteId,
      text,
    }: { userId: string; characterId: string; noteId: string; text: string },
    { rejectWithValue },
  ) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)
      const currentNote = userSnap.data()?.notes?.[characterId]

      if (!currentNote) {
        throw new Error('Note not found')
      }

      const updatedNote = {
        ...currentNote,
        text,
        updatedAt: new Date().toISOString(),
      }

      const currentNotes = userSnap.data()?.notes || {}

      await setDoc(
        userRef,
        {
          notes: {
            ...currentNotes,
            [characterId]: updatedNote,
          },
        },
        { merge: true },
      )

      return { characterId, note: updatedNote }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update note')
    }
  },
)
export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (
    { userId, characterId, noteId }: { userId: string; characterId: string; noteId: string },
    { rejectWithValue },
  ) => {
    try {
      const userRef = doc(db, 'users', userId)
      const currentNotes = (await getDoc(userRef)).data()?.notes || {}

      const { [characterId]: deleted, ...remainingNotes } = currentNotes

      await setDoc(
        userRef,
        {
          notes: remainingNotes,
        },
        { merge: true },
      )

      return { characterId }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete note')
    }
  },
)
