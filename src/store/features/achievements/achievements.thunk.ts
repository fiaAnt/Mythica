import { db } from '@/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { AchievementType } from './achievements.types'

export const fetchAchievements = createAsyncThunk(
  'achievement/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userData = userSnap.data()
        let achievements = userData.achievements || []

        if (Array.isArray(achievements)) {
          if (achievements.length > 0 && typeof achievements[0] === 'object') {
            achievements = achievements.map((item: AchievementType) => item).filter(Boolean)
          }
        } else if (typeof achievements === 'string') {
          achievements = achievements.split(',').filter(Boolean)
        }
        return achievements
      }
      return []
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch achievements',
      )
    }
  },
)

export const unlockAchievement = createAsyncThunk(
  'achievement/unlock',
  async ({ userId, type }: { userId: string; type: AchievementType }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)
      const userData = userSnap.data()

      let currentAchievements: string[] = []
      const rawAchievements = userData?.achievements || []

      if (Array.isArray(rawAchievements)) {
        if (rawAchievements.length > 0 && typeof rawAchievements[0] === 'object') {
          currentAchievements = rawAchievements.map((item: AchievementType) => item).filter(Boolean)
        } else {
          currentAchievements = rawAchievements
        }
      } else if (typeof rawAchievements === 'string') {
        currentAchievements = rawAchievements.split(',').filter(Boolean)
      }

      if (!currentAchievements.includes(type)) {
        currentAchievements.push(type)

        await updateDoc(userRef, {
          achievements: currentAchievements,
        })
      }

      return type
    } catch (error) {
      console.error('Failed to unlock achievement:', error)
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to unlock achievement',
      )
    }
  },
)
