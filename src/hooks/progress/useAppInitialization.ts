import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'

export function useAppInitialization() {
  const [fontsLoaded, fontError] = useFonts({
    'OpenSans-Regular': require('@/assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('@/assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Italic': require('@/assets/fonts/OpenSans-Italic.ttf'),
  })

  const isReady = fontsLoaded || !!fontError

  useEffect(() => {
    let cancelled = false

    if (isReady && !cancelled) {
      SplashScreen.hideAsync()
    }

    return () => {
      cancelled = true
    }
  }, [isReady])
  return {
    isReady,
  }
}
