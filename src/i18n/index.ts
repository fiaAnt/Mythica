import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { createMMKV } from 'react-native-mmkv'
import en from './locales/en.json'
import ru from './locales/ru.json'

const storage = createMMKV()
const LANGUAGE_KEY = '@app_language'

const resources = {
  en: { translation: en },
  ru: { translation: ru },
}

const getInitialLanguage = (): string => {
  try {
    const savedLanguage = storage.getString(LANGUAGE_KEY)
    return savedLanguage || 'en'
  } catch (e) {
    console.error('Failed to load saved language from MMKV', e)
    return 'en'
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
  react: {
    useSuspense: false,
  },
})

export const changeLanguage = (language: string) => {
  try {
    i18n.changeLanguage(language)
    storage.set(LANGUAGE_KEY, language)
  } catch (e) {
    console.error('Error changing language', e)
  }
}

export default i18n
