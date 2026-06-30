import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAchievements, unlockAchievement } from './achievements.thunk'
import { AchievementsState, AchievementType } from './achievements.types'

const initialState: AchievementsState = {
  achievements: [],
  isLoading: false,
  isInitialized: false,
  error: null,
}

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    unlockLocal: (state, action: PayloadAction<AchievementType>) => {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAchievements.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchAchievements.fulfilled, (state, action) => {
      state.isLoading = false
      state.achievements = Array.isArray(action.payload) ? action.payload : []
      state.isInitialized = true
    })
    builder.addCase(fetchAchievements.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })

    builder.addCase(unlockAchievement.fulfilled, (state, action) => {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload)
      }
    })
    builder.addCase(unlockAchievement.rejected, (state, action) => {
      state.error = action.payload as string
    })
  },
})

export const { clearError, unlockLocal } = achievementsSlice.actions
export default achievementsSlice.reducer
