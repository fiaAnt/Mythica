import { AppText } from '@/components/ui/AppText'
import { IconToken } from '@/constants/icons'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { Href, router } from 'expo-router'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '../Icon'

interface BarProps {
  title: string
  leftIcon: IconToken
  path?: Href
  onLeftPress?: () => void
}

export const Bar = ({ path, title, leftIcon, onLeftPress }: BarProps) => {
  const { colors, spacing, theme, setThemePreference } = useTheme()

  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const handleThemePress = () => {
    setThemePreference(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress()
    } else if (path) {
      router.push(path)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={handleLeftPress}>
          <Icon name={leftIcon} color={colors['icon-secondary']} size='md' />
        </TouchableOpacity>

        <AppText variant='title'>{title}</AppText>
      </View>
      <TouchableOpacity onPress={handleThemePress}>
        <Icon name='theme' color={colors['icon-secondary']} size='md' />
      </TouchableOpacity>
    </View>
  )
}
type BarStylesProps = Pick<ThemeContextValue, 'spacing'>

const createStyles = ({ spacing }: BarStylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing['space-sm'],
      paddingHorizontal: spacing['space-lg'],
    },
    containerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['space-sm'],
    },
  })
