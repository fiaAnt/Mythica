import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/useTheme'
import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

interface ProgressBarProps {
  progress: number
  height?: number
  animated?: boolean
  resetOnProgressChange?: boolean
}

export const ProgressBar = ({
  progress,
  height = 8,
  animated = true,
  resetOnProgressChange = true,
}: ProgressBarProps) => {
  const { colors, borderRadius } = useTheme()
  const styles = useMemo(() => createStyles({ borderRadius }), [borderRadius])

  const animatedProgress = useSharedValue(0)
  const DAMPING = 50
  const DURATION = 300
  const STIFFNESS = 100

  useEffect(() => {
    const targetProgress = Math.min(STIFFNESS, Math.max(0, progress))

    if (resetOnProgressChange) {
      animatedProgress.value = 0
    }

    if (animated) {
      animatedProgress.value = withSpring(targetProgress, {
        damping: DAMPING,
        stiffness: STIFFNESS,
      })
    } else {
      animatedProgress.value = withTiming(targetProgress, {
        duration: DURATION,
      })
    }

    return () => {
      cancelAnimation(animatedProgress)
    }
  }, [progress, animated, resetOnProgressChange, animatedProgress])

  const animatedFillStyle = useAnimatedStyle(() => {
    return {
      width: `${Math.min(STIFFNESS, Math.max(0, animatedProgress.value))}%`,
    }
  })

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
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            backgroundColor: colors['background-surface-secondary'],
          },
          animatedFillStyle,
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
      borderRadius: borderRadius['border-md'],
    },
  })
