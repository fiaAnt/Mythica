import { fetchLocalFilters } from '@/translations/filters'
import { useQuery } from '@tanstack/react-query'

export const useFilters = (language = 'ru') => {
  const {
    data: filters = { mythologies: [], types: [] },
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['filters', language],
    queryFn: () => fetchLocalFilters(language),
    initialData: { mythologies: [], types: [] },
  })

  return {
    filters,
    loading,
    error,
  }
}
