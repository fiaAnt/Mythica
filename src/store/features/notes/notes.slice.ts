import { createSlice } from '@reduxjs/toolkit'
import { addNote, deleteNote, fetchNotes, updateNote } from './notes.thunk'
import { NotesState } from './notes.types'

const initialState: NotesState = {
  notes: {},
  loading: false,
  error: null,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearNotes: (state) => {
      state.notes = {}
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false
        state.notes[action.payload.characterId] = action.payload.notes
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes[action.payload.characterId] = action.payload.note
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.notes[action.payload.characterId] = action.payload.note
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        delete state.notes[action.payload.characterId]
      })
  },
})

export const { clearNotes } = notesSlice.actions
export default notesSlice.reducer
