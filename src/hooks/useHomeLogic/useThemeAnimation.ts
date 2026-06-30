import { useRef, useState } from 'react'
import { Animated } from 'react-native'

export function useThemeAnimation() {
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [isThemeChanging, setIsThemeChanging] = useState(false)

  const handleThemeToggle = async () => {
    setIsThemeChanging(true)
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start()

    setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start(() => {
        setIsThemeChanging(false)
      })
    }, 50)
  }

  return {
    fadeAnim,
    isThemeChanging,
    handleThemeToggle,
  }
}
