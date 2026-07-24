import { getThemePreference, setThemePreference } from '@/utils/storage/preferencesStorage'
import { createContext, useCallback, useMemo, useState } from 'react'
import { ColorSchemeName, useColorScheme } from 'react-native'
import { BORDER_RADIUS } from '../theme/borderRadius'
import { DARK_COLORS, LIGHT_COLORS } from '../theme/colors'
import { SHADOW } from '../theme/shadow'
import { SPACING } from '../theme/spacing'
import { TYPOGRAPHY } from '../typography'

export const Themes = {
  Dark: 'dark',
  Light: 'light',
  System: 'system',
} as const

export type ThemePreference = (typeof Themes)[keyof typeof Themes]

export type ActiveTheme = 'light' | 'dark'

type ThemeColorsType = typeof LIGHT_COLORS

const COLORS_BY_THEME: Record<ActiveTheme, ThemeColorsType> = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
} as const

function isValidThemePreference(preference: unknown): preference is ThemePreference {
  return Object.values(Themes).includes(preference as ThemePreference)
}

function resolveTheme(userPreference: ThemePreference, systemScheme: ColorSchemeName): ActiveTheme {
  if (userPreference === Themes.System) {
    return systemScheme === 'dark' ? 'dark' : 'light'
  }

  return userPreference as ActiveTheme
}

export interface ThemeContextValue {
  activeTheme: ActiveTheme
  themePreference: ThemePreference
  colors: ThemeColorsType
  typography: typeof TYPOGRAPHY
  spacing: typeof SPACING
  borderRadius: typeof BORDER_RADIUS
  shadow: typeof SHADOW
  setThemePreference: (themePreference: ThemePreference) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themePreference, setThemePreferenceInternal] = useState<ThemePreference>(() => {
    const savedPreference = getThemePreference()
    return isValidThemePreference(savedPreference) ? savedPreference : Themes.System // Логичнее по умолчанию ставить System
  })

  const systemScheme = useColorScheme()
  const activeTheme = resolveTheme(themePreference, systemScheme)

  const updateThemePreference = useCallback((newPreference: ThemePreference) => {
    setThemePreferenceInternal(newPreference)
    setThemePreference(newPreference)
  }, [])

  const contextValue: ThemeContextValue = useMemo(
    () => ({
      activeTheme,
      themePreference,
      colors: COLORS_BY_THEME[activeTheme],
      typography: TYPOGRAPHY,
      spacing: SPACING,
      borderRadius: BORDER_RADIUS,
      shadow: SHADOW,
      setThemePreference: updateThemePreference,
    }),
    [activeTheme, themePreference, updateThemePreference],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
