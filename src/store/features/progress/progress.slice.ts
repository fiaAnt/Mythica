import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  calculateProgress,
  fetchUserProgress,
  updateSingleMythologyProgress,
} from './progress.thunk'
import { ProgressState } from './progress.types'
import { calculatePercentage } from './progress.utils'

const initialState: ProgressState = {
  mythologies: {},
  loading: false,
  error: null,
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearProgress: (state) => {
      state.mythologies = {}
      state.loading = false
      state.error = null
    },

    updateLocalProgress: (
      state,
      action: PayloadAction<{
        mythologyId: string
        exploredCount: number
        totalCount: number
      }>,
    ) => {
      const { mythologyId, exploredCount, totalCount } = action.payload

      state.mythologies[mythologyId] = {
        explored: exploredCount,
        total: totalCount,
        percentage: calculatePercentage(exploredCount, totalCount),
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.loading = false
        state.mythologies = action.payload
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'failed to fetch progress'
      })

      .addCase(calculateProgress.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(calculateProgress.fulfilled, (state, action) => {
        state.loading = false
        state.mythologies = action.payload
      })
      .addCase(calculateProgress.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'failed to calculate progress'
      })

      .addCase(updateSingleMythologyProgress.fulfilled, (state, action) => {
        state.mythologies = {
          ...state.mythologies,
          ...action.payload,
        }
      })
  },
})

export const { clearProgress, updateLocalProgress } = progressSlice.actions

export default progressSlice.reducer
