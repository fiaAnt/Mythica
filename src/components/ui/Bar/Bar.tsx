import { Menu } from '@/components/Menu'
import { AppText } from '@/components/ui/AppText'
import { IconToken } from '@/constants/icons'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { Href, router } from 'expo-router'
import React, { useMemo, useState } from 'react'
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
  const [selectedMythology, setSelectedMythology] = useState<string | undefined>()
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const handleThemePress = () => {
    setThemePreference(theme === 'dark' ? 'light' : 'dark')
  }
  const isDark = theme === 'dark'

  const handleFiltersApply = (mythology: string | undefined, type: string | undefined) => {
    setSelectedMythology(mythology)
    setSelectedType(type)
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
          <Icon name='user' color='icon-primary' size='lg' />
        </TouchableOpacity>

        <AppText variant='title'>{title}</AppText>
      </View>
      <Menu onThemeToggle={handleThemePress} isDark={isDark} onFiltersApply={handleFiltersApply} />
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
