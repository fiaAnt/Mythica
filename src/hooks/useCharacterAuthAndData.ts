import { useCharacters } from '@/hooks/useCharacters'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchExplored } from '@/store/features/explored/explored.thunk'
import { fetchFavorites } from '@/store/features/favorites/favorites.thunk'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function useCharacterAuthAndData() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()

  const { characters, loading, error } = useCharacters(i18n.language)

  const user = useAppSelector((state) => state.auth.user)
  const favorites = useAppSelector((state) => state.favorites.favorites)
  const explored = useAppSelector((state) => state.explored?.explored || [])

  const character = useMemo(() => {
    return characters.find((char) => String(char.id) === String(id))
  }, [id, characters])

  const isFavorite = useMemo(
    () => (character && user?.uid ? favorites.includes(character.id) : false),
    [character, user?.uid, favorites],
  )

  const isExplored = useMemo(
    () => (character && user?.uid ? explored.includes(character.id) : false),
    [character, user?.uid, explored],
  )

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchFavorites(user.uid))
      dispatch(fetchExplored(user.uid))
    }
  }, [dispatch, user?.uid])

  return {
    t,
    user,
    character,
    characters,
    loading,
    error,
    isFavorite,
    isExplored,
    favorites,
  }
}
