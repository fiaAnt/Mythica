import { logout } from '@/store/features/auth/auth.thunk'
import { createSlice } from '@reduxjs/toolkit'
import { addExplored, fetchExplored } from './explored.thunk'
import { ExploredState } from './explored.types'

const initialState: ExploredState = {
  explored: [],
  loading: false,
  error: null,
}

const exploredSlice = createSlice({
  name: 'explored',
  initialState,
  reducers: {
    clearExploredState: (state) => {
      state.explored = []
      state.loading = false
      state.error = null
    },
    resetExplored: (state) => {
      state.explored = []
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExplored.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchExplored.fulfilled, (state, action) => {
        state.loading = false
        state.explored = action.payload
      })
      .addCase(fetchExplored.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addExplored.pending, (state) => {
        state.loading = true
      })
      .addCase(addExplored.fulfilled, (state, action) => {
        state.loading = false
        if (!state.explored.includes(action.payload)) {
          state.explored.push(action.payload)
        }
      })
      .addCase(addExplored.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logout.fulfilled, (state) => {
        state.explored = []
        state.loading = false
        state.error = null
      })
  },
})

export const { clearExploredState, resetExplored } = exploredSlice.actions
export default exploredSlice.reducer
