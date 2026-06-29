import React, { createContext, useContext, useMemo, useState } from 'react'
import { DARK_THEME, LIGHT_THEME, Theme } from './index'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  themeMode: ThemeMode
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = useMemo(() => {
    return themeMode === 'light' ? LIGHT_THEME : DARK_THEME
  }, [themeMode])

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
