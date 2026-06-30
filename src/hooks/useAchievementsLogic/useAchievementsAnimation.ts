import { AchievementsState } from '@/store/features/achievements/achievements.types'
import { useEffect, useRef, useState } from 'react'
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface AnimationProps {
  achievements: AchievementsState[]
  isLoading: boolean
  isInitialized: boolean
  animated: boolean
}

export function useAchievementsAnimation({
  achievements,
  isLoading,
  isInitialized,
  animated,
}: AnimationProps) {
  const prevAchievementsRef = useRef<string[]>([])
  const isFirstLoadRef = useRef(true)
  const animatedAchievements = useSharedValue(0)
  const [isReady, setIsReady] = useState(false)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedAchievements.value,
  }))

  useEffect(() => {
    if (!isLoading && isInitialized && !isReady) {
      setIsReady(true)
      if (animated && achievements.length > 0) {
        animatedAchievements.value = withTiming(1, {
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      }
    }
  }, [isLoading, isInitialized, achievements.length, animated, isReady, animatedAchievements])

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false
      prevAchievementsRef.current = achievements
      return
    }

    if (isLoading || !isReady) return

    const hasNewAchievements = achievements.length > prevAchievementsRef.current.length

    if (hasNewAchievements && achievements.length > 0) {
      const newAchievement = achievements.find(
        (a: string) => !prevAchievementsRef.current.includes(a),
      )

      if (newAchievement) {
        cancelAnimation(animatedAchievements)
        animatedAchievements.value = 0

        animatedAchievements.value = withDelay(
          300,
          withTiming(1, {
            duration: 800,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        )
      }
    }
    prevAchievementsRef.current = [...achievements]
  }, [achievements, isLoading, isReady, animatedAchievements])

  return { isReady, animatedStyle }
}
