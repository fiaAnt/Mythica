import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

interface ProgressBarProps {
  progress: number
  height?: number
  backgroundColor?: string
  fillColor?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height = 8 }) => {
  const { colors, borderRadius } = useTheme()
  const styles = useMemo(() => createStyles({ colors, borderRadius }, [colors, borderRadius]))

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: colors['background-surface-primary'],
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(100, Math.max(0, progress))}%`,
            height,
            backgroundColor: colors['background-surface-secondary'],
          },
        ]}
      />
    </View>
  )
}
type ProgressBarStylesProps = Pick<ThemeContextValue, 'borderRadius'>
const createStyles = ({ borderRadius }: ProgressBarStylesProps) =>
  StyleSheet.create({
    container: {
      borderRadius: borderRadius['border-md'],
      overflow: 'hidden',
    },
    fill: {
      borderRadius: borderRadius['border-lg'],
    },
  })
