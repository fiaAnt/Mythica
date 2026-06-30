import { AchievementId } from '@/services/cloudinaryService'
import { getAchievementDetails } from '@/translations/achievements'
import { useState } from 'react'

export function useAchievementsModal(currentLanguage: string) {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementId | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleAchievementPress = (achievementId: AchievementId) => {
    setSelectedAchievement(achievementId)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedAchievement(null)
  }

  const selectedAchievementData = selectedAchievement
    ? getAchievementDetails(currentLanguage, selectedAchievement)
    : null

  return {
    showModal,
    selectedAchievement,
    selectedAchievementData,
    handleAchievementPress,
    handleCloseModal,
  }
}
