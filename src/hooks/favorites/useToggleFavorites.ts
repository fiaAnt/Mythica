import { db } from '@/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useRef } from 'react'
import { ToggleFavoriteArgs } from './useFavorites.types'

export const useToggleFavorites = () => {
  const queryClient = useQueryClient()
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
      queryClient.removeQueries({ queryKey: ['favorites'] })
    }
  }, [queryClient])

  return useMutation<void, Error, ToggleFavoriteArgs, { previousFavorites: string[] | undefined }>({
    onMutate: async ({ userId, characterId, isFavorite }) => {
      const queryKey = ['favorites', userId]
      await queryClient.cancelQueries({ queryKey })

      const previousFavorites = queryClient.getQueryData<string[]>(queryKey)

      queryClient.setQueryData<string[]>(queryKey, (old = []) => {
        if (isFavorite) {
          return old.filter((id) => id !== characterId)
        } else {
          return [...old, characterId]
        }
      })

      return { previousFavorites }
    },

    mutationFn: async ({ userId, characterId, isFavorite }) => {
      const userRef = doc(db, 'users', userId)
      await updateDoc(userRef, {
        favorites: isFavorite ? arrayRemove(characterId) : arrayUnion(characterId),
      })
    },
    onError: (_err, variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites', variables.userId], context.previousFavorites)
      }
    },
    onSettled: (_, __, variables) => {
      if (isMounted.current) {
        queryClient.invalidateQueries({ queryKey: ['favorites', variables.userId] })
      }
    },
  })
}
