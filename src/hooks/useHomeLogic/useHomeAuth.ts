import { useAppDispatch, useAppSelector } from '@/store'
import { fetchExplored } from '@/store/features/explored/explored.thunk'
import { useEffect, useState } from 'react'

export function useHomeAuth() {
  const dispatch = useAppDispatch()
  const [hasLoadedExplored, setHasLoadedExplored] = useState(false)

  const { isAuthenticated, user, isInitialized } = useAppSelector((state) => state.auth)
  const userExplored = useAppSelector((state) => state.explored.explored)
  const exploredLoading = useAppSelector((state) => state.explored.loading)

  useEffect(() => {
    if (isAuthenticated && user?.uid && !hasLoadedExplored && !exploredLoading) {
      dispatch(fetchExplored(user.uid)).then(() => {
        setHasLoadedExplored(true)
      })
    }
  }, [isAuthenticated, user?.uid, dispatch, hasLoadedExplored, exploredLoading])

  useEffect(() => {
    if (!isAuthenticated) {
      setHasLoadedExplored(false)
    }
  }, [isAuthenticated])

  const userPath = isAuthenticated ? '/profile' : '/login'

  return {
    isAuthenticated,
    isInitialized,
    userExplored,
    exploredLoading,
    userPath,
    hasLoadedExplored,
  }
}
