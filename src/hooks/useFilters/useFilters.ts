import { getFilters } from '@/services/filtersService'
import { useQuery } from '@tanstack/react-query'

export const useFilters = (language = 'ru') => {
  const {
    data: filters = { mythologies: [], types: [] },
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['filters', language],
    queryFn: () => getFilters(language),
  })

  return {
    filters,
    loading,
    error,
  }
}

