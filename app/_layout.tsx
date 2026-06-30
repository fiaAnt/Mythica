import { ThemeProvider } from '@/context/ThemeContext'
import { useAppInitialization } from '@/hooks/useAppInitialization'
import '@/i18n'
import { setupWeeklyNotificationChannel } from '@/services/notifications/notifications'
import { store, useAppDispatch } from '@/store'
import { restoreSession } from '@/store/features/auth/auth.thunk'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()

function SessionRestorer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  return null
}

export default function RootLayout() {
  const { isReady } = useAppInitialization()
  const { t } = useTranslation()

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowList: true,
      }),
    })

    setupWeeklyNotificationChannel()
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <Provider store={store}>
      <SessionRestorer />

      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider>
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

              <Stack.Screen name='profile' options={{ headerShown: false }} />

              <Stack.Screen name='login' options={{ headerShown: false }} />

              <Stack.Screen
                name='character/[id]'
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
      </QueryClientProvider>
    </Provider>
  )
}
