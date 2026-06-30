import { useAppDispatch, useAppSelector } from '@/store'
import { calculateProgress, fetchUserProgress } from '@/store/features/progress/progress.thunk'
import { useEffect } from 'react'
import { useCharacters } from './useCharacters'

export const useProgress = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const userExplored = useAppSelector((state) => state.explored.explored)
  const mythologies = useAppSelector((state) => state.progress.mythologies)
  const { characters, loading: charactersLoading } = useCharacters()

  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      dispatch(fetchUserProgress(user.uid))
    }
  }, [isAuthenticated, user?.uid])

  useEffect(() => {
    if (isAuthenticated && user?.uid && characters.length > 0 && !charactersLoading) {
      dispatch(
        calculateProgress({
          userId: user.uid,
          exploredCharacters: userExplored,
          allCharacters: characters,
        }),
      )
    }
  }, [userExplored, characters, charactersLoading])

  const getAllMythologies = () => {
    return Object.entries(mythologies).map(([id, data]) => ({
      id,
      ...data,
    }))
  }

  const getProgress = (mythologyId: string) => {
    return mythologies[mythologyId] || { explored: 0, total: 0, percentage: 0 }
  }

  const getTotalExploredCount = () => {
    return getAllMythologies().reduce((total, m) => total + m.explored, 0)
  }

  const getTotalCharactersCount = () => {
    return getAllMythologies().reduce((total, m) => total + m.total, 0)
  }

  return {
    mythologies,
    getAllMythologies,
    getProgress,
    getTotalExploredCount,
    getTotalCharactersCount,
    isLoading: charactersLoading || (isAuthenticated && Object.keys(mythologies).length === 0),
  }
}
