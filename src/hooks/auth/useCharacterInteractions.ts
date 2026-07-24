import { useAppDispatch } from '@/store'
import { useCallback, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useFavorites, useToggleFavorites } from '../favorites'
import { useExplored } from '../progress/useExplored'
import { InteractionOptions } from './types'

export function useCharacterInteractions({ user, character, isExplored }: InteractionOptions) {
  const dispatch = useAppDispatch()
  const [hasMarkedExplored, setHasMarkedExplored] = useState(false)
  const [modalType, setModalType] = useState<'info' | 'favorite_guard' | null>(null)
  const { data: favoritesList = [], isLoading } = useFavorites(user.uid)
  const toggleMutation = useToggleFavorites()

  const isFavorite = character ? favoritesList.includes(character.id) : false
  const addExploredMutation = useExplored()
  const SCROLL_THRESHOLD = 150

  const handleFavorite = useCallback(() => {
    if (!character) return
    if (!user) {
      setModalType('favorite_guard')
      return
    }

    if (favoritesList.length === 0 && !isFavorite) {
      setModalType('info')
    }
    toggleMutation.mutate({
      userId: user.uid,
      characterId: character.id,
      isFavorite: isFavorite,
    })
  }, [character, user, favoritesList.length, isFavorite, toggleMutation])

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent

      const isEnd =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - SCROLL_THRESHOLD

      if (isEnd && !hasMarkedExplored && !isExplored && user?.uid && character) {
        setHasMarkedExplored(true)
        addExploredMutation.mutate({
          userId: user.uid,
          characterId: character.id,
        })
      }
    },
    [hasMarkedExplored, isExplored, user?.uid, character, dispatch],
  )

  return {
    modalType,
    setModalType,
    handleFavorite,
    handleScrollEnd,
    isFavorite,
    isLoadingFavorites: isLoading,
  }
}
