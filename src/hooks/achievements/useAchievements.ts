import { db } from '@/firebase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'

import { useFavorites } from '@/hooks/favorites/useFavorites'
import { useAppSelector } from '@/store'
import { useExplored } from '../progress/useExplored'
import { useProgress } from '../progress/useProgress'

export const useAchievements = () => {
  const queryClient = useQueryClient()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const { data: favorites = [] } = useFavorites(user?.uid)
  const { data: progressData = {} } = useProgress(user?.uid)
  const { data: exploredData = [] } = useExplored(user?.uid)

  const {
    data: achievements = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['achievements', user?.uid],
    queryFn: async () => {
      if (!user?.uid) return []
      const snap = await getDoc(doc(db, 'users', user.uid))
      const data = snap.exists() ? snap.data().achievements || [] : []
      return data
    },
    enabled: !!user?.uid,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    return () => {
      if (user?.uid) {
        queryClient.removeQueries({ queryKey: ['achievements', user.uid] })
      }
    }
  }, [user?.uid])

  const unlockMutation = useMutation({
    mutationFn: async (type: string) => {
      if (!user?.uid) return
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        achievements: arrayUnion(type),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['achievements', user?.uid],
      })
    },
    onError: (error) => {
      console.error('useAchievements error:', error)
    },
  })
  useEffect(() => {
    return () => {
      unlockMutation.reset()
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    if (isAuthenticated && user?.uid) {
      const mythologies = Object.values(progressData) as {
        explored: number
        total: number
        percentage: number
      }[]
      const totalExplored = exploredData.length
      const allCompleted = mythologies.length > 0 && mythologies.every((m) => m.percentage === 100)
      const favoritesCount = favorites.length

      const checkAndUnlock = (condition: boolean, type: string) => {
        if (condition && !achievements.includes(type) && !cancelled) {
          unlockMutation.mutate(type)
        }
      }

      checkAndUnlock(allCompleted, 'ragnarok')
      checkAndUnlock(totalExplored >= 1, 'cyclops')
      checkAndUnlock(favoritesCount >= 5, 'souls')
      checkAndUnlock(totalExplored >= 4, 'pyramid')
    }

    return () => {
      cancelled = true
    }
  }, [progressData, favorites.length, isAuthenticated, user?.uid, achievements])

  return {
    achievements,
    isLoading,
    isInitialized: true,
    isCyclopsUnlocked: achievements.includes('cyclops'),
    isPyramidUnlocked: achievements.includes('pyramid'),
    isSoulsUnlocked: achievements.includes('souls'),
    isRagnarokUnlocked: achievements.includes('ragnarok'),
  }
}
