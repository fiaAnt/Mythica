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
} as const

export type Theme = (typeof Themes)[keyof typeof Themes]

type ThemeColorsType = typeof LIGHT_COLORS

const COLORS_BY_THEME: Record<Theme, ThemeColorsType> = {
  [Themes.Dark]: DARK_COLORS,
  [Themes.Light]: LIGHT_COLORS,
} as const

function isValidThemePreference(preference: unknown): preference is Theme {
  return Object.values(Themes).includes(preference as Theme)
}

function resolveTheme(userPreference: Theme, systemScheme: ColorSchemeName): Theme {
  if (userPreference !== Themes.Light) {
    return userPreference
  }

  if (systemScheme === 'dark') {
    return Themes.Dark
  }

  return Themes.Light
}

export interface ThemeContextValue {
  theme: Theme
  colors: ThemeColorsType
  typography: typeof TYPOGRAPHY
  spacing: typeof SPACING
  borderRadius: typeof BORDER_RADIUS
  shadow: typeof SHADOW
  setThemePreference: (themePreference: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themePreference, setThemePreferenceInternal] = useState<Theme>(() => {
    const savedPreference = getThemePreference()
    return isValidThemePreference(savedPreference) ? savedPreference : Themes.Light
  })

  const systemScheme = useColorScheme()
  const theme = resolveTheme(themePreference, systemScheme)

  const updateThemePreference = useCallback((newPreference: Theme) => {
    setThemePreferenceInternal(newPreference)
    setThemePreference(newPreference)
  }, [])

  const contextValue: ThemeContextValue = useMemo(
    () => ({
      theme,
      colors: COLORS_BY_THEME[theme],
      typography: TYPOGRAPHY,
      spacing: SPACING,
      borderRadius: BORDER_RADIUS,
      shadow: SHADOW,
      setThemePreference: updateThemePreference,
    }),
    [theme, updateThemePreference],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
