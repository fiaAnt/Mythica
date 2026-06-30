import * as AuthSession from 'expo-auth-session'

export const AUTH0_DOMAIN = process.env.EXPO_PUBLIC_AUTH0_DOMAIN!
export const AUTH0_CLIENT_ID = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!

export const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'mythica',
  path: 'login',
})
console.log('Your redirect URI is:', redirectUri)
export const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
  tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
  revocationEndpoint: `https://${AUTH0_DOMAIN}/oauth/revoke`,
}
