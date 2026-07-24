import { AppText } from '@/components/ui/AppText'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface ButtonProps {
  title?: string
  onPress?: () => void
  variant?: 'primary' | 'secondary'
}

export const Button = ({ title, onPress = () => {}, variant = 'primary' }: ButtonProps) => {
  const { colors, borderRadius, spacing } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, borderRadius, spacing }),
    [colors, borderRadius, spacing],
  )
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'primary' ? styles.primary : styles.secondary]}
      onPress={onPress}
    >
      <AppText variant='body' align='center'>
        {title}
      </AppText>
    </TouchableOpacity>
  )
}
type ButtonStylesProps = Pick<ThemeContextValue, 'colors' | 'borderRadius' | 'spacing'>
const createStyles = ({ colors, borderRadius, spacing }: ButtonStylesProps) =>
  StyleSheet.create({
    button: {
      paddingVertical: spacing['space-md'],
      paddingHorizontal: spacing['space-md'],
      width: '100%',
      borderRadius: borderRadius['border-xl'],
      alignItems: 'center',
    },
    primary: {
      backgroundColor: colors['button-primary'],
    },
    secondary: {
      backgroundColor: colors['button-secondary'],
    },
  })
