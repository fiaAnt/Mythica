import { ThemeContext, ThemeContextValue } from '@/context/themeContext'
import { useContext } from 'react'

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

