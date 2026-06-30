import { Character } from '@/hooks/useCharacters/useCharacters.types'
import { useAppDispatch } from '@/store'
import { fetchAchievements } from '@/store/features/achievements/achievements.thunk'
import { UserData } from '@/store/features/auth/auth.types'
import { addExplored } from '@/store/features/explored/explored.thunk'
import { toggleFavorite } from '@/store/features/favorites/favorites.thunk'
import { useCallback, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

interface InteractionOptions {
  user: UserData | null
  character: Character | undefined
  favorites: string[]
  isFavorite: boolean
  isExplored: boolean
}

export function useCharacterInteractions({
  user,
  character,
  favorites,
  isFavorite,
  isExplored,
}: InteractionOptions) {
  const dispatch = useAppDispatch()
  const [hasMarkedExplored, setHasMarkedExplored] = useState(false)
  const [modalType, setModalType] = useState<'info' | 'favorite_guard' | null>(null)

  const SCROLL_THRESHOLD = 150

  const handleFavorite = useCallback(async () => {
    if (!character) return
    if (!user) {
      setModalType('favorite_guard')
      return
    }

    if (favorites.length === 0 && !isFavorite) {
      setModalType('info')
    }

    await dispatch(
      toggleFavorite({
        userId: user.uid,
        characterId: character.id,
      }),
    )

    dispatch(fetchAchievements(user.uid))
  }, [character, user, favorites.length, isFavorite, dispatch])

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent

      const isEnd =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - SCROLL_THRESHOLD

      if (isEnd && !hasMarkedExplored && !isExplored && user?.uid && character) {
        setHasMarkedExplored(true)

        dispatch(
          addExplored({
            userId: user.uid,
            characterId: character.id,
          }),
        ).then(() => {
          dispatch(fetchAchievements(user.uid))
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
  }
}
