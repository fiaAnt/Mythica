import { ThemeProvider } from '@/context/themeContext'
import { useAppInitialization } from '@/hooks/useAppInitialization'
import '@/i18n'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  const { isReady } = useAppInitialization()
  const { t } = useTranslation()

  if (!isReady) {
    return null
  }
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='profile' options={{ headerShown: false }} />
          <Stack.Screen
            name='character/[name]'
            options={{
              headerShown: true,
              title: t('character'),
              headerBackTitle: t('common'),
            }}
          />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
