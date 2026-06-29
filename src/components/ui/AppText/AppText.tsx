import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { ThemeColor } from '@/theme/colors'
import { useMemo } from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'

interface AppTextProps {
  children: string | string[]
  variant?: 'title' | 'subtitle' | 'body' | 'small'
  color?: ThemeColor | string
  align?: 'left' | 'center' | 'right'
  style?: TextStyle
}

export const AppText = ({
  children,
  variant = 'body',
  color,
  align = 'left',
  style,
}: AppTextProps) => {
  const { colors, typography } = useTheme()
  const styles = useMemo(() => createStyles({ colors, typography }), [colors, typography])

  return (
    <Text
      style={[
        styles[variant],
        {
          textAlign: align,
          color: colors['text-primary'],
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
type TextStylesProps = Pick<ThemeContextValue, 'typography'>
const createStyles = ({ typography }: TextStylesProps) =>
  StyleSheet.create({
    title: {
      fontSize: typography['font-size-lg'],
      fontFamily: 'Georgia',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: typography['font-size-md'],
      fontFamily: 'Georgia',
    },
    body: {
      fontSize: typography['font-size-sm'],
    },
    small: {
      fontSize: typography['font-size-xs'],
    },
  })
