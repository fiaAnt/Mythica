import { useExplored } from '@/hooks/progress/useExplored'
import { useAppSelector } from '@/store'

export function useHomeAuth() {
  const { isAuthenticated, user, isInitialized } = useAppSelector((state) => state.auth)

  const { data: userExplored = [], isLoading: exploredLoading, isFetched } = useExplored(user?.uid)

  const userPath = isAuthenticated ? '/profile' : '/login'

  return {
    isAuthenticated,
    isInitialized,
    userExplored,
    exploredLoading,
    userPath,
    hasLoadedExplored: isAuthenticated ? isFetched : false,
  }
}
