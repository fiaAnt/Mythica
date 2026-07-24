import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { ICON_SIZE } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { AchievementId, getAchievementIcon } from '@/services/cloudinaryService'
import { Image } from 'expo-image'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, View } from 'react-native'

interface AchievementsModalProps {
  visible: boolean
  onApply: () => void
  title?: string
  description?: string
  achievementId: AchievementId | null
}

export const AchievementsModal = ({
  visible,
  onApply,
  title,
  description,
  achievementId,
}: AchievementsModalProps) => {
  const { colors, spacing, borderRadius, activeTheme } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  const { t } = useTranslation()

  if (!achievementId) return null

  return (
    <Modal transparent visible={visible} animationType='fade' onRequestClose={onApply}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <AppText variant='title' align='center'>
            {t('achievements')}
          </AppText>

          <AppText variant='subtitle' align='center'>
            {title}
          </AppText>

          <Image
            source={getAchievementIcon(activeTheme, achievementId)}
            style={styles.image}
            contentFit='contain'
          />

          <AppText variant='body' align='center'>
            {description}
          </AppText>

          <Button title={t('ok')} onPress={onApply}></Button>
        </View>
      </View>
    </Modal>
  )
}

type AchievementsModalStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>

const createStyles = ({ colors, spacing, borderRadius }: AchievementsModalStylesProps) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors['overlay-50'],
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      borderRadius: borderRadius['border-lg'],
      padding: spacing['space-xl'],
      width: '85%',
      alignItems: 'center',
      gap: spacing['space-sm'],
      backgroundColor: colors['background-primary'],
    },
    image: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      marginVertical: spacing['space-sm'],
    },
  })
