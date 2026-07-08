import { useCharacters } from '@/hooks/characters'
import { Character } from '@/hooks/characters/useCharacters.types'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '../common/useDebounce'
import { FilterOptions } from './types'

export function useCharacterFilters({ isAuthenticated, userExplored }: FilterOptions) {
  const { i18n } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [selectedMythology, setSelectedMythology] = useState<string | undefined>()
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const [onlyExplored, setOnlyExplored] = useState(false)
  const debouncedSearchText = useDebounce(searchText, 300)

  const {
    characters,
    loading: charactersLoading,
    error: charactersError,
  } = useCharacters(i18n.language)

  const handleFiltersApply = (
    mythology: string | undefined,
    type: string | undefined,
    explored: boolean,
  ) => {
    setSelectedMythology(mythology)
    setSelectedType(type)
    setOnlyExplored(explored)
  }

  const filteredCharacters = useMemo(() => {
    const rules = [
      (char: Character) =>
        !debouncedSearchText || char.name.toLowerCase().includes(debouncedSearchText.toLowerCase()),
      (char: Character) => !selectedMythology || char.mythology === selectedMythology,
      (char: Character) => !selectedType || char.type === selectedType,
      (char: Character) => {
        if (!onlyExplored) return true
        if (!isAuthenticated) return false
        return !userExplored.some((exploredId) => String(exploredId) === String(char.id))
      },
    ]
    return characters.filter((char) => rules.every((rule) => rule(char)))
  }, [
    characters,
    debouncedSearchText,
    selectedMythology,
    selectedType,
    onlyExplored,
    isAuthenticated,
    userExplored,
  ])

  const listData = useMemo(() => {
    return filteredCharacters.map((char) => ({
      id: char.id,
      title: char.name,
      name: char.name,
    }))
  }, [filteredCharacters])

  return {
    searchText,
    setSearchText,
    listData,
    charactersLoading,
    charactersError,
    onlyExplored,
    handleFiltersApply,
  }
}
