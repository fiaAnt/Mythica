import { Menu } from '@/components/Menu'
import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { Href, router } from 'expo-router'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '../Icon'

interface BarProps {
  path: string
  title: string
  leftIcon: string
  onLeftPress?: () => void
  onFiltersApply: (mythology: string | undefined, type: string | undefined) => void
}

export const Bar = ({ path, title, leftIcon, onLeftPress, onFiltersApply }: BarProps) => {
  const { spacing } = useTheme()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress()
    } else if (path) {
      router.push(path as Href)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={handleLeftPress}>
          <Icon name={leftIcon} size='lg' />
        </TouchableOpacity>
        <AppText variant='title'>{title}</AppText>
      </View>

      <Menu onFiltersApply={onFiltersApply} />
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
      paddingHorizontal: spacing['space-lg'],
      paddingVertical: spacing['space-sm'],
    },
    containerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing['space-sm'],
    },
  })
