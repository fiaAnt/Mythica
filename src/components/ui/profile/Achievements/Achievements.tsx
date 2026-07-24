import { AchievementsModal } from '@/components/AchievementsModal'
import { AppText } from '@/components/ui/AppText'
import { ICON_SIZE } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useAchievementsLogic } from '@/hooks/achievements'
import { useTheme } from '@/hooks/common/useTheme'
import { AchievementId, getAchievementIcon } from '@/services/cloudinaryService'
import { getAchievementDetails } from '@/translations/achievements'
import { Image } from 'expo-image'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'

interface AchievementsProps {
  animated?: boolean
}

export const Achievements = ({ animated = true }: AchievementsProps) => {
  const { spacing, activeTheme } = useTheme()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const {
    t,
    currentLanguage,
    achievements,
    isLoading,
    isReady,
    animatedStyle,
    showModal,
    selectedAchievement,
    selectedAchievementData,
    handleAchievementPress,
    handleCloseModal,
  } = useAchievementsLogic(animated)

  if (achievements.length === 0 && !isLoading && isReady) {
    return (
      <View style={styles.emptyContainer}>
        <AppText variant='small'>{t('no_achievements')}</AppText>
      </View>
    )
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <AppText variant='subtitle' style={styles.titleSpacing}>
        {t('achievements')}
      </AppText>

      <FlatList
        data={achievements}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `achievement_${index}_${item}`}
        renderItem={({ item: id }) => {
          const ach = getAchievementDetails(currentLanguage, id as AchievementId)
          if (!ach) {
            console.warn(`Unknown achievement id: ${id}`)
            return null
          }

          return (
            <TouchableOpacity
              style={styles.achievementItem}
              onPress={() => handleAchievementPress(id as AchievementId)}
              activeOpacity={0.7}
            >
              <Image
                source={getAchievementIcon(activeTheme, id as AchievementId)}
                style={styles.achievementIcon}
                cachePolicy='memory-disk'
              />
              <AppText variant='small' style={styles.achievementTitle}>
                {ach.title}
              </AppText>
            </TouchableOpacity>
          )
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !isLoading && isReady && achievements.length === 0 ? (
            <AppText variant='small'>{t('no_achievements')}</AppText>
          ) : null
        }
      />

      <AchievementsModal
        visible={showModal}
        onApply={handleCloseModal}
        title={selectedAchievementData?.title}
        description={selectedAchievementData?.description}
        achievementId={selectedAchievement}
      />
    </Animated.View>
  )
}

type AchievementsStylesProps = Pick<ThemeContextValue, 'spacing'>

const createStyles = ({ spacing }: AchievementsStylesProps) =>
  StyleSheet.create({
    container: {
      marginVertical: spacing['space-lg'],
      paddingHorizontal: spacing['space-lg'],
    },
    titleSpacing: {
      marginBottom: spacing['space-md'],
    },
    listContent: {
      gap: spacing['space-md'],
    },
    achievementItem: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    achievementIcon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      borderRadius: spacing['space-sm'],
      marginBottom: spacing['space-xs'],
    },
    achievementTitle: {
      textAlign: 'center',
      width: '100%',
    },
    emptyContainer: {
      paddingVertical: spacing['space-xl'],
      alignItems: 'center',
    },
  })
