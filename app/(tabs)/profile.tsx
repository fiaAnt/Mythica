import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { Achievements } from '@/components/ui/profile/Achievements'
import { ContentList } from '@/components/ui/profile/ContentList'
import { UserInfo } from '@/components/ui/profile/UserInfo'
import { Toggle } from '@/components/ui/Toggle'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { changeLanguage } from '@/i18n'
import {
  cancelAllScheduledNotifications,
  scheduleWeeklyNotification,
} from '@/services/notifications/notifications'
import { useAppSelector } from '@/store'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const { t, i18n } = useTranslation()
  const isRussian = i18n.language.startsWith('ru')

  const { colors, spacing, borderRadius } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )
  const { user } = useAppSelector((state) => state.auth)
  const userName = user?.name
  const userId = user?.uid

  const handleLanguageToggle = async (value: boolean) => {
    const newLang = value ? 'ru' : 'en'
    await changeLanguage(newLang)
    if (userId) {
      await cancelAllScheduledNotifications()
      await scheduleWeeklyNotification()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Bar path='/' title={t('profile')} leftIcon='back' />

      <UserInfo />

      <View style={styles.name}>
        <AppText variant='body'>{userName || t('guest')}</AppText>
        <Toggle label={t('language')} value={isRussian} onToggle={handleLanguageToggle} />
      </View>

      <Achievements animated={true} />
      <ContentList />
    </SafeAreaView>
  )
}

type ProfileStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>

const createStyles = ({ colors, spacing }: ProfileStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors['background-primary'],
    },
    name: {
      marginBottom: spacing['space-xl'],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing['space-lg'],
    },
  })
