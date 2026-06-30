import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { AUTH0_CLIENT_ID, discovery, redirectUri } from '@/config/auth0.config'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/useTheme'
import { getIcon } from '@/services/cloudinaryService'
import { useAppDispatch, useAppSelector } from '@/store'
import { clearError } from '@/store/features/auth/auth.slice'
import { login } from '@/store/features/auth/auth.thunk'
import * as AuthSession from 'expo-auth-session'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  const dispatch = useAppDispatch()
  const insets = useSafeAreaInsets()
  const { width: windowWidth } = useWindowDimensions()
  const { t } = useTranslation()
  const { theme, colors, spacing, shadow } = useTheme()
  const styles = useMemo(() => createStyles({ colors, spacing, shadow }), [colors, spacing, shadow])
  const { isLoading, error, isInitialized } = useAppSelector((state) => state.auth)

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: AUTH0_CLIENT_ID,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      usePKCE: true,
      extraParams: {
        prompt: 'login',
      },
    },
    discovery,
  )

  useEffect(() => {
    const handleResponse = async () => {
      if (!response) return

      if (response.type === 'success') {
        const { code } = response.params

        try {
          await dispatch(
            login({
              code,
              codeVerifier: request?.codeVerifier,
            }),
          ).unwrap()
          router.replace('/profile')
        } catch (error) {
          Alert.alert('Error', 'Login failed')
        }

        return
      }

      if (response.type === 'error') {
        if (
          response.error?.code === 'access_denied' ||
          response.error?.message?.includes('User did not authorize')
        ) {
          return
        }

        console.error(response.error)
        Alert.alert('Error', response.error?.message)
      }
    }

    handleResponse()
  }, [response, request?.codeVerifier, dispatch])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleLogin = async () => {
    if (!request) {
      Alert.alert('Error')
      return
    }

    await promptAsync({
      showInRecents: true,
    })
  }

  if (!isInitialized) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size='large' color={colors['text-primary']} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Bar path='/' title={t('login')} icon={getIcon('back', theme)} />
      <View style={styles.content}>
        <Image
          style={[
            styles.image,
            {
              width: windowWidth - spacing['space-xxl'],
              height: windowWidth - spacing['space-xxl'],
            },
          ]}
          source={getIcon('log', theme)}
          resizeMode='contain'
        />
        <AppText variant='title' align='center' style={{ color: colors['text-primary'] }}>
          {t('welcome')}
        </AppText>

        <Button
          title={isLoading ? t('loading') : t('loginText')}
          onPress={handleLogin}
          disabled={!request || isLoading}
        />

        {isLoading && (
          <View>
            <ActivityIndicator size='large' />
          </View>
        )}
      </View>
    </View>
  )
}

type LoginStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'shadow'>
const createStyles = ({ colors, spacing, shadow }: LoginStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors['background-primary'],
      paddingHorizontal: spacing['space-lg'],
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      gap: spacing['space-md'],
    },
    image: {
      alignSelf: 'center',
      marginBottom: spacing['space-lg'],
    },
  })
