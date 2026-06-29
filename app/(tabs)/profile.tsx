import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { Icon } from '@/components/ui/Icon'
import { CARD_MIN_HEIGHT, UNDERLINE_HEIGHT } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { router } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

type TabId = 'unexplored' | 'favorites'

interface Tab {
  id: TabId
  label: string
}

const TABS: Tab[] = [
  { id: 'unexplored', label: 'Unexplored' },
  { id: 'favorites', label: 'Favorites' },
]

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState<TabId>('unexplored')
  const { colors, spacing, borderRadius } = useTheme()
  const { t } = useTranslation()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )

  return (
    <SafeAreaView style={styles.container}>
      <Bar title='Profile' leftIcon='back' onLeftPress={() => router.back()} />

      <View style={styles.userInformation}>
        <Icon name='user' color='icon-primary' size='xl' />
        <View style={styles.loadings}>
          <AppText variant='small'>{t('loading_1')}</AppText>
          <AppText variant='small'>{t('loading_2')}</AppText>
          <AppText variant='small'>{t('loading_3')}</AppText>
        </View>
      </View>

      <View style={styles.name}>
        <AppText variant='body'>Name Lastname</AppText>
      </View>

      <View style={styles.achievements}>
        <AppText variant='body'>Achievements</AppText>
        <AppText variant='small'>{t('no_achievements')}</AppText>
      </View>

      <View style={styles.choose}>
        {TABS.map((tab) => {
          const isSelected = selectedTab === tab.id
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              style={styles.tabButton}
            >
              <AppText
                variant='body'
                style={isSelected ? styles.selectedText : styles.unselectedText}
              >
                {tab.label}
              </AppText>

              {isSelected && <View style={styles.underline} />}
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={styles.card}>
        {selectedTab === 'unexplored' && <AppText>{t('unexplored_content')}</AppText>}

        {selectedTab === 'favorites' && <AppText>{t('favorites_content')}</AppText>}
      </View>
    </SafeAreaView>
  )
}

const createStyles = ({ colors, spacing, borderRadius }: ThemeContextValue) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing['space-xl'],
      backgroundColor: colors['background-primary'],
    },
    userInformation: {
      marginVertical: spacing['space-xl'],
      paddingHorizontal: spacing['space-lg'],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    loadings: {
      flexDirection: 'column',
      gap: spacing['space-xs'],
    },
    name: {
      marginBottom: spacing['space-xl'],
    },
    achievements: {
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginVertical: spacing['space-xl'],
      padding: spacing['space-lg'],
      backgroundColor: colors['background-surface-primary'],
      borderRadius: borderRadius['border-lg'],
    },
    choose: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: spacing['space-xl'],
    },
    tabButton: {
      alignItems: 'center',
      position: 'relative',
    },
    selectedText: {
      fontWeight: 'bold',
      color: colors['text-primary'],
    },
    unselectedText: {
      fontWeight: 'normal',
      color: colors['text-secondary'],
    },
    underline: {
      position: 'absolute',
      bottom: -spacing['space-sm'],
      height: UNDERLINE_HEIGHT,
      backgroundColor: colors['background-selected'],
      borderRadius: borderRadius['border-xs'],
    },
    card: {
      backgroundColor: colors['background-surface-primary'],
      padding: spacing['space-xl'],
      minHeight: CARD_MIN_HEIGHT,
    },
  })
