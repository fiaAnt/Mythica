import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { useProgress } from '@/hooks/progress/useProgress'
import { getFilters } from '@/services/filtersService'
import { useAppSelector } from '@/store'
import { useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { ProgressBar } from '../ProgressBar'
import { UserAvatar } from '../UserAvatar'

export const UserInfo = () => {
  const { colors, spacing } = useTheme()
  const styles = useMemo(() => createStyles({ colors, spacing }), [colors, spacing])

  const { i18n } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)
  const { data: progressData } = useProgress(user?.uid)

  const { data: filters, isLoading } = useQuery({
    queryKey: ['filters', i18n.language],
    queryFn: () => getFilters(i18n.language),
  })

  return (
    <View style={styles.userInformation}>
      <UserAvatar imageUrl={user?.picture} />

      <View style={styles.loadings}>
        {!isLoading &&
          filters?.mythologies.map((filter) => {
            const progress = progressData?.[filter.value] || { percentage: 0 }

            return (
              <View key={filter.value} style={styles.loadingItem}>
                <View style={styles.loadingHeader}>
                  <AppText variant='small'>{filter.label}</AppText>
                  <AppText variant='small'>{progress.percentage}%</AppText>
                </View>

                <ProgressBar progress={progress.percentage} />
              </View>
            )
          })}
      </View>
    </View>
  )
}

type UserInfoStylesProps = Pick<ThemeContextValue, 'spacing' | 'colors'>

const createStyles = ({ spacing }: UserInfoStylesProps) =>
  StyleSheet.create({
    userInformation: {
      marginVertical: spacing['space-xl'],
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing['space-lg'],
      alignItems: 'center',
      gap: spacing['space-lg'],
    },
    loadings: {
      flex: 1,
      flexDirection: 'column',
      gap: spacing['space-sm'],
    },
    loadingItem: {
      gap: spacing['space-xs'],
    },
    loadingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
