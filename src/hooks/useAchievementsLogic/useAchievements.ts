import { useAppDispatch, useAppSelector } from '@/store'
import {
  fetchAchievements,
  unlockAchievement,
} from '@/store/features/achievements/achievements.thunk'
import { useEffect } from 'react'
import { useProgress } from '../useProgress'

export const useAchievements = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const userExplored = useAppSelector((state) => state.explored.explored)
  const userFavoritesCount = useAppSelector((state) => state.favorites.favorites.length)
  const { achievements, isLoading, isInitialized } = useAppSelector((state) => state.achievements)

  const { getTotalExploredCount, getAllMythologies } = useProgress()

  useEffect(() => {
    if (isAuthenticated && user?.uid && !isInitialized) {
      dispatch(fetchAchievements(user.uid))
    }
  }, [isAuthenticated, user?.uid, isInitialized, dispatch])

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) return

    const totalExplored = getTotalExploredCount()
    const allMythologies = getAllMythologies()
    const favoritesCount = userFavoritesCount
    const MAX_PERCENTAGE = 100

    const allCompleted =
      allMythologies.length > 0 && allMythologies.every((m) => m.percentage === MAX_PERCENTAGE)

    if (allCompleted && !achievements.includes('ragnarok')) {
      dispatch(unlockAchievement({ userId: user.uid, type: 'ragnarok' }))
    }

    if (totalExplored >= 1 && !achievements.includes('cyclops')) {
      dispatch(unlockAchievement({ userId: user.uid, type: 'cyclops' }))
    }

    if (favoritesCount >= 5 && !achievements.includes('souls')) {
      dispatch(unlockAchievement({ userId: user.uid, type: 'souls' }))
    }

    if (totalExplored >= 4 && !achievements.includes('pyramid')) {
      dispatch(unlockAchievement({ userId: user.uid, type: 'pyramid' }))
    }
  }, [
    userExplored,
    userFavoritesCount,
    isAuthenticated,
    user?.uid,
    achievements,
    dispatch,
    getTotalExploredCount,
    getAllMythologies,
  ])

  return {
    achievements,
    isLoading,
    isInitialized,
    isCyclopsUnlocked: achievements.includes('cyclops'),
    isPyramidUnlocked: achievements.includes('pyramid'),
    isSoulsUnlocked: achievements.includes('souls'),
    isRagnarokUnlocked: achievements.includes('ragnarok'),
  }
}
