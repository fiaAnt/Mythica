import { useCharacters } from '@/hooks/characters'
import { useAppSelector } from '@/store'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useExplored } from '../progress/useExplored'

export function useCharacterAuthAndData() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { t, i18n } = useTranslation()

  const { characters, loading, error } = useCharacters(i18n.language)

  const user = useAppSelector((state) => state.auth.user)

  const { data: explored = [] } = useExplored(user?.uid)

  const character = useMemo(() => {
    return characters.find((char) => String(char.id) === String(id))
  }, [id, characters])

  const isExplored = useMemo(
    () => (character && user?.uid ? explored.includes(character.id) : false),
    [character, user?.uid, explored],
  )

  return {
    t,
    user,
    character,
    characters,
    loading,
    error,
    isExplored,
  }
}
