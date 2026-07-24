import { db } from '@/firebase'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'

export const useFavorites = (userId: string) => {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      if (!userId) return []
      const userSnap = await getDoc(doc(db, 'users', userId))
      return userSnap.exists() ? userSnap.data()?.favorites || [] : []
    },
    enabled: !!userId,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    return () => {
      if (userId) {
        queryClient.removeQueries({
          queryKey: ['favorites', userId],
          exact: true,
        })
        queryClient.removeQueries({
          queryKey: ['favorites'],
          exact: false,
        })
      }
    }
  }, [userId, queryClient])
  return query
}
