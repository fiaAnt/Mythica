import { getCharacters } from '@/services/charactersService'
import { useQuery } from '@tanstack/react-query'

export const useCharacters = (language = 'en') => {
  const {
    data: characters = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['characters', language],
    queryFn: () => getCharacters(language),
  })

  return {
    characters,
    loading,
    error,
  }
}
