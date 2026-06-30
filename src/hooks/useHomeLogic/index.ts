import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { useCharacterFilters } from './useCharacterFilters'
import { useHomeAuth } from './useHomeAuth'
import { useThemeAnimation } from './useThemeAnimation'

export function useHomeLogic() {
  const { t } = useTranslation()
  const { colors, spacing } = useTheme()

  const authProps = useHomeAuth()

  const themeProps = useThemeAnimation()

  const filterProps = useCharacterFilters({
    isAuthenticated: authProps.isAuthenticated,
    userExplored: authProps.userExplored,
  })

  const showSkeleton =
    !authProps.isInitialized ||
    filterProps.charactersLoading ||
    themeProps.isThemeChanging ||
    (filterProps.onlyExplored && authProps.isAuthenticated && authProps.exploredLoading) ||
    (authProps.isAuthenticated && !authProps.hasLoadedExplored && authProps.exploredLoading)

  return {
    t,
    colors,
    spacing,
    userPath: authProps.userPath,
    charactersError: filterProps.charactersError,
    listData: filterProps.listData,
    searchText: filterProps.searchText,
    setSearchText: filterProps.setSearchText,
    fadeAnim: themeProps.fadeAnim,
    handleThemeToggle: themeProps.handleThemeToggle,
    handleFiltersApply: filterProps.handleFiltersApply,
    showSkeleton,
  }
}
