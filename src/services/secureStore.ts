import * as SecureStore from 'expo-secure-store'

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'

export const saveTokens = async (accessToken: string, refreshToken?: string) => {
  const operations = [SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken)]
  if (refreshToken) {
    operations.push(SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken))
  }
  await Promise.all(operations)
}

export const getTokens = async () => {
  const [accessToken, refreshToken] = await Promise.all([
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
  ])
  return {
    accessToken,
    refreshToken,
  }
}

export const clearTokens = async () => {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
  ])
}
