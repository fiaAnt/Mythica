import { db } from '@/firebase'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'

export const useExplored = (userId?: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['explored', userId],
    queryFn: async () => {
      if (!userId) return []

      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)
      const data = userSnap.exists() ? userSnap.data()?.explored || [] : []

      return data
    },
    enabled: !!userId,
    gcTime: 0,
  })
  useEffect(() => {
    return () => {
      if (userId) {
        queryClient.removeQueries({ queryKey: ['explored', userId] })
      }
    }
  }, [userId, queryClient])

  return query
}
