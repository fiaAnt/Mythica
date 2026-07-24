import { useCallback, useState } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export function useThemeAnimation() {
  const fadeAnim = useSharedValue(1)
  const [isThemeChanging, setIsThemeChanging] = useState(false)

  const handleThemeToggle = useCallback(() => {
    setIsThemeChanging(true)

    fadeAnim.value = withTiming(0, { duration: 200 }, () => {
      fadeAnim.value = withTiming(1, { duration: 200 }, () => {
        setIsThemeChanging(false)
      })
    })
  }, [fadeAnim])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }))

  return {
    animatedStyle,
    isThemeChanging,
    handleThemeToggle,
  }
}
