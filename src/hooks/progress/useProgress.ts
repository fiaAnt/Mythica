import { calculatePercentage } from '@/utils/percentage'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useCharacterMetadata } from './useCharacterMetadata'
import { useExplored } from './useExplored'

export const useProgress = (userId?: string) => {
  const queryClient = useQueryClient()
  const { data: exploredIds = [], isLoading: isExploredLoading } = useExplored(userId)
  const { data: allCharacters = [], isLoading: isCharsLoading } = useCharacterMetadata()

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['explored'] })
      queryClient.removeQueries({ queryKey: ['characters-metadata'] })
      queryClient.removeQueries({ queryKey: ['characters'] })
      queryClient.removeQueries({ queryKey: ['filters'] })
    }
  }, [userId, queryClient])

  const progressData = useMemo(() => {
    if (isExploredLoading || isCharsLoading) return {}
    if (!allCharacters.length) return {}

    const stats: Record<string, { explored: number; total: number; percentage: number }> = {}

    allCharacters.forEach((char) => {
      const mythology = char.mythology
      if (!mythology) return

      if (!stats[mythology]) {
        stats[mythology] = { explored: 0, total: 0, percentage: 0 }
      }

      stats[mythology].total++
      if (exploredIds.includes(char.id)) {
        stats[mythology].explored++
      }
    })

    Object.keys(stats).forEach((key) => {
      stats[key].percentage = calculatePercentage(stats[key].explored, stats[key].total)
    })

    return stats
  }, [exploredIds, allCharacters, isExploredLoading, isCharsLoading])

  return { data: progressData }
}
