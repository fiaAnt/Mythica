import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { CardList } from '@/components/ui/CardList'
import { Input } from '@/components/ui/Input'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useHomeLogic } from '@/hooks/useHomeLogic'
import { Href } from 'expo-router'
import React, { useMemo } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  const {
    t,
    colors,
    spacing,
    fadeAnim,
    searchText,
    setSearchText,
    userPath,
    listData,
    showSkeleton,
    charactersError,
    handleThemeToggle,
    handleFiltersApply,
  } = useHomeLogic()

  const styles = useMemo(() => createStyles({ colors, spacing }), [colors, spacing])

  if (charactersError) {
    return (
      <Animated.View
        style={[styles.container, styles.center, { paddingTop: insets.top, opacity: fadeAnim }]}
      >
        <AppText variant='body'>{charactersError}</AppText>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top, opacity: fadeAnim }]}>
      <Bar
        path={userPath as Href}
        title={t('app_name')}
        leftIcon='user'
        onFiltersApply={handleFiltersApply}
        onThemeToggle={handleThemeToggle}
      />

      <CardList
        data={listData}
        isLoading={showSkeleton}
        header={
          <View style={styles.scrollContent}>
            <Input
              value={searchText}
              onChangeText={setSearchText}
              icon='search'
              placeholder={t('search')}
              numberOfLines={1}
            />
          </View>
        }
      />
    </Animated.View>
  )
}
type HomeStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing'>

const createStyles = ({ colors, spacing }: HomeStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors['background-primary'],
    },
    scrollContent: {
      gap: spacing['space-sm'],
      width: '100%',
    },
    center: {
      justifyContent: 'center',

      alignItems: 'center',
    },
  })
