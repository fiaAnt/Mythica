import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Icon } from '../../Icon'
import { ProgressBar } from '../ProgressBar'

export const UserInfo = () => {
  const { colors, spacing } = useTheme()
  const styles = useMemo(() => createStyles({ colors, spacing }), [colors, spacing])

  const { t } = useTranslation()

  const MOCK_LOADING_DATA = [
    { label: t('loading_1'), progress: 75 },
    { label: t('loading_2'), progress: 30 },
    { label: t('loading_3'), progress: 100 },
  ]

  return (
    <View style={styles.userInformation}>
      <Icon name='user' size='lg' />
      <View style={styles.loadings}>
        {MOCK_LOADING_DATA.map((item, index) => (
          <View key={index} style={styles.loadingItem}>
            <View style={styles.loadingHeader}>
              <AppText variant='small'>{item.label}</AppText>
              <AppText variant='small'>{item.progress}%</AppText>
            </View>
            <ProgressBar progress={item.progress} />
          </View>
        ))}
      </View>
    </View>
  )
}

type UserInfoStylesProps = Pick<ThemeContextValue, 'spacing'>
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
