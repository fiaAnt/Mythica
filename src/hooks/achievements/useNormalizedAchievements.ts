import { useMemo } from 'react'
import { AchievementType } from './useAchievements.types'

export function useNormalizedAchievements(rawAchievements: AchievementType) {
  return useMemo(() => {
    if (!rawAchievements) return []

    if (Array.isArray(rawAchievements)) {
      return rawAchievements
        .map((item) => {
          if (typeof item === 'string') return item
          if (typeof item === 'object' && item !== null) {
            return item.type || item.id || String(item)
          }
          return String(item)
        })
        .filter(Boolean)
    }

    if (typeof rawAchievements === 'string') {
      return rawAchievements.split(',').filter(Boolean)
    }

    return []
  }, [rawAchievements])
}
