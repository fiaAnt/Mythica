import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { ThemeColor } from '@/theme/colors'
import { useMemo } from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'

interface AppTextProps {
  children: React.ReactNode
  variant?: 'title' | 'subtitle' | 'body' | 'note' | 'small'
  color?: ThemeColor | string
  align?: 'left' | 'center' | 'right' | 'justify'
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
  const content = children instanceof Error ? children.message : children
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
      {content}
    </Text>
  )
}
type TextStylesProps = Pick<ThemeContextValue, 'typography'>
const createStyles = ({ typography }: TextStylesProps) =>
  StyleSheet.create({
    title: {
      fontSize: typography['font-size-lg'],
      fontFamily: 'OpenSana-Bold',
    },
    subtitle: {
      fontSize: typography['font-size-md'],
      fontFamily: 'OpenSana-Regular',
    },
    body: {
      fontSize: typography['font-size-sm'],
      fontFamily: 'OpenSana-Regular',
    },
    note: {
      fontSize: typography['font-size-sm'],
      fontFamily: 'OpenSana-Italic',
    },
    small: {
      fontSize: typography['font-size-xs'],
      fontFamily: 'OpenSana-Regular',
    },
  })
