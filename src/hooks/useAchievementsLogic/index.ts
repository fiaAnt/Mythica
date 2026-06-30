import { useAchievements } from '@/hooks/useAchievementsLogic/useAchievements'
import { useTranslation } from 'react-i18next'
import { useAchievementsAnimation } from './useAchievementsAnimation'
import { useAchievementsModal } from './useAchievementsModal'
import { useNormalizedAchievements } from './useNormalizedAchievements'

export function useAchievementsLogic(animated: boolean) {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const { achievements: rawAchievements, isLoading, isInitialized } = useAchievements()

  const achievements = useNormalizedAchievements(rawAchievements)

  const { isReady, animatedStyle } = useAchievementsAnimation({
    achievements,
    isLoading,
    isInitialized,
    animated,
  })

  const modalProps = useAchievementsModal(currentLanguage)

  return {
    t,
    currentLanguage,
    achievements,
    isLoading,
    isReady,
    animatedStyle,
    ...modalProps,
  }
}
