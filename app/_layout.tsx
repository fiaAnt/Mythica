import { ThemeProvider } from '@/theme/ThemeContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'

export default function RootLayout() {
  return (
    <PaperProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </PaperProvider>
  )
}
