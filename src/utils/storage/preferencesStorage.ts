import { createMMKV } from 'react-native-mmkv'

const THEME_PREFERENCE_STORAGE_KEY = 'theme-preference'

const preferencesStorage = createMMKV({ id: 'preferences-storage' })

export const getThemePreference = (): string | null => {
  return preferencesStorage.getString(THEME_PREFERENCE_STORAGE_KEY) ?? null
}

export const setThemePreference = (themePreference: string) => {
  preferencesStorage.set(THEME_PREFERENCE_STORAGE_KEY, themePreference)
}

export const clearPreferences = () => {
  preferencesStorage.clearAll()
}
