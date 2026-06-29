import { AppText } from '@/components/ui/AppText'
import { IconToken } from '@/constants/icons'
import { Theme } from '@/theme'
import { useTheme } from '@/theme/ThemeContext'
import { router } from 'expo-router'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '../Icon'

interface BarProps {
  title: string
  leftIcon: IconToken
  path?: string
  onLeftPress?: () => void
}

export const Bar = ({ path, title, leftIcon, onLeftPress }: BarProps) => {
  const { theme, toggleTheme } = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress()
    } else if (path) {
      router.push(path as any)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={handleLeftPress}>
          <Icon name={leftIcon} color='icon-secondary' size='md' />
        </TouchableOpacity>

        <AppText variant='title'>{title}</AppText>
      </View>
      <TouchableOpacity onPress={toggleTheme}>
        <Icon name='theme' color='icon-secondary' size='md' />
      </TouchableOpacity>
    </View>
  )
}
const createStyles = ({ spacing }: Theme) =>
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
