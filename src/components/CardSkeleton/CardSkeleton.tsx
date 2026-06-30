import { useTheme } from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect } from 'react'
import { ColorValue, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface CardSkeletonProps {
  width?: number
  height?: number
  borderRadius?: number
}

export const CardSkeleton = ({
  width = 400,
  height = 300,
  borderRadius = 12,
}: CardSkeletonProps) => {
  const { colors } = useTheme()
  const translateX = useSharedValue(-width)

  const skeletonColors: [ColorValue, ColorValue, ColorValue] = [
    colors['gradient-start'],
    colors['gradient-middle'],
    colors['gradient-end'],
  ]

  useEffect(() => {
    translateX.value = withRepeat(withTiming(width, { duration: 1200 }), -1, false)
  }, [width])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  return (
    <View style={[styles.skeletonCard, { width, height, borderRadius }]}>
      <View style={[styles.skeletonWrapper, { backgroundColor: colors['gradient-end'] }]}>
        <Animated.View style={[styles.gradientMove, animatedStyle]}>
          <LinearGradient
            colors={skeletonColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  skeletonCard: {
    overflow: 'hidden',
  },
  skeletonWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  gradientMove: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
})
