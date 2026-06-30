import { db } from '@/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { MythologyProgress } from './progress.types'
import { calculatePercentage } from './progress.utils'

export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (userId: string) => {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      return userData.progress || {}
    }

    return {}
  },
)

export const calculateProgress = createAsyncThunk(
  'progress/calculateProgress',
  async ({
    userId,
    exploredCharacters,
    allCharacters,
  }: {
    userId: string
    exploredCharacters: string[]
    allCharacters: { id: string; mythology: string }[]
  }) => {
    const mythologyStats: Record<
      string,
      {
        explored: number
        total: number
      }
    > = {}

    allCharacters.forEach((char) => {
      const mythology = char.mythology

      if (!mythologyStats[mythology]) {
        mythologyStats[mythology] = {
          explored: 0,
          total: 0,
        }
      }

      mythologyStats[mythology].total++

      if (exploredCharacters.includes(char.id)) {
        mythologyStats[mythology].explored++
      }
    })

    const mythologies: MythologyProgress = {}

    Object.entries(mythologyStats).forEach(([mythologyId, stats]) => {
      mythologies[mythologyId] = {
        explored: stats.explored,
        total: stats.total,
        percentage: calculatePercentage(stats.explored, stats.total),
      }
    })

    const userRef = doc(db, 'users', userId)

    await updateDoc(userRef, {
      progress: mythologies,
    })

    return mythologies
  },
)

export const updateSingleMythologyProgress = createAsyncThunk(
  'progress/updateSingleMythologyProgress',
  async ({
    userId,
    mythologyId,
    exploredCount,
    totalCount,
  }: {
    userId: string
    mythologyId: string
    exploredCount: number
    totalCount: number
  }) => {
    const userRef = doc(db, 'users', userId)

    const updatedMythology = {
      explored: exploredCount,
      total: totalCount,
      percentage: calculatePercentage(exploredCount, totalCount),
    }

    await updateDoc(userRef, {
      [`progress.${mythologyId}`]: updatedMythology,
    })

    return {
      [mythologyId]: updatedMythology,
    }
  },
)
