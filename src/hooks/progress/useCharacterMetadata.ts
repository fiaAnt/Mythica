import { db } from '@/firebase'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useCharacterMetadata = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'ru'
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['characters-metadata', currentLang],
    queryFn: async () => {
      try {
        const collectionName = `characters_${currentLang}`
        const snap = await getDocs(collection(db, collectionName))

        const chars = snap.docs.map((doc) => ({
          id: doc.id,
          mythology: doc.data().mythology,
        }))
        return chars
      } catch (error) {
        console.error('Loading characters error:', error)
        return []
      }
    },
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  })
  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['characters-metadata', currentLang],
        exact: true,
      })

      queryClient.removeQueries({
        queryKey: ['characters-metadata'],
        exact: false,
      })
    }
  }, [currentLang, queryClient])

  return query
}
