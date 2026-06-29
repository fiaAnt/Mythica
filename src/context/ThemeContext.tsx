import { DARK_THEME, LIGHT_THEME, Theme } from '@/constants/themes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type ThemeContextType = {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContextValue = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme')
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark')
        }
      } catch (error) {
        console.error('Failed to load theme:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadTheme()
  }, [])

  const theme = useMemo(() => {
    return isDark ? DARK_THEME : LIGHT_THEME
  }, [isDark])

  const toggleTheme = useCallback(async () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    try {
      await AsyncStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }, [isDark])

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
    }),
    [theme, isDark, toggleTheme],
  )

  if (isLoading) {
    return null
  }

  return <ThemeContextValue.Provider value={value}>{children}</ThemeContextValue.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContextValue)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
