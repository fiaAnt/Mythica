import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, redirectUri } from '@/config/auth0.config'
import { db } from '@/firebase'
import {
  registerForPushNotificationsAsync,
  scheduleWeeklyNotification,
} from '@/services/notifications/notifications'
import { clearTokens, getTokens, saveTokens } from '@/services/secureStore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import {
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore'
import { jwtDecode } from 'jwt-decode'
import { Auth0JwtPayload, CleanFirestoreData, FirestoreData, UserData } from './auth.types'

function cleanFirestore<T>(data: FirestoreData): T | null {
  if (data == null) return null

  if (data instanceof Timestamp) {
    return data.toDate().toISOString() as T
  }

  if (Array.isArray(data)) {
    return data.map((item) => cleanFirestore(item)) as T
  }

  if (typeof data === 'object') {
    const result: Record<string, CleanFirestoreData> = {}

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = cleanFirestore(
          (data as Record<string, FirestoreData>)[key],
        ) as CleanFirestoreData
      }
    }

    return result as T
  }

  return data as T
}

async function getUserId() {
  try {
    const userId = await SecureStore.getItemAsync('userId')
    return userId
  } catch {
    return null
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ code, codeVerifier }: { code: string; codeVerifier?: string }, { rejectWithValue }) => {
    try {
      const tokenResponse = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: AUTH0_CLIENT_ID,
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      })

      const tokens = await tokenResponse.json()

      if (!tokenResponse.ok) {
        return rejectWithValue(tokens.error_description || 'Failed to get access token')
      }

      let auth0User: Auth0JwtPayload | null = null
      let auth0Sub: string | null = null

      if (tokens.id_token) {
        const payload: Auth0JwtPayload = jwtDecode(tokens.id_token)
        auth0User = payload
        auth0Sub = payload.sub
      }

      if (auth0Sub && auth0User?.email) {
        const userRef = collection(db, 'users')
        const q = query(userRef, where('email', '==', auth0User.email))
        const querySnapshot = await getDocs(q)

        let userId: string
        let userDocRef: DocumentReference
        let existingUser = false

        if (!querySnapshot.empty) {
          const existingDoc = querySnapshot.docs[0]
          userId = existingDoc.id
          userDocRef = doc(db, 'users', userId)
          existingUser = true
          await setDoc(
            userDocRef,
            {
              auth0Sub: auth0Sub,
              lastLoginAt: serverTimestamp(),
            },
            { merge: true },
          )
        } else {
          userId = auth0Sub
          userDocRef = doc(db, 'users', userId)

          await setDoc(userDocRef, {
            uid: userId,
            email: auth0User.email,
            name: auth0User.name,
            picture: auth0User.picture || null,
            emailVerified: auth0User.email_verified || false,
            provider: 'auth0',
            auth0Sub: auth0Sub,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            notificationsEnabled: true,
            pushTokens: [],
          })
        }
        try {
          const pushToken = await registerForPushNotificationsAsync(userId)
          if (pushToken) {
            await setDoc(
              userDocRef,
              {
                expoPushToken: pushToken,
                pushTokens: arrayUnion(pushToken),
                lastPushTokenUpdate: serverTimestamp(),
              },
              { merge: true },
            )
            await scheduleWeeklyNotification()
          }
        } catch (pushError) {
          console.warn('Push registration failed, but login continues:', pushError)
        }

        const updatedUserSnap = await getDoc(userDocRef)
        const rawUser = updatedUserSnap.data()

        if (!rawUser || typeof rawUser !== 'object') {
          throw new Error('No user data from Firestore')
        }

        const firestoreUser = cleanFirestore(rawUser) as UserData
        await SecureStore.setItemAsync('userId', userId)
        await saveTokens(tokens.access_token, tokens.refresh_token || '')

        return {
          user: {
            ...firestoreUser,
            id: userId,
          },
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }
      } else {
        throw new Error('No user data from Auth0')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login error:', error.message)
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error occurred')
    }
  },
)

export const restoreSession = createAsyncThunk('auth/restore', async (_, { dispatch }) => {
  try {
    const tokens = await getTokens()

    if (tokens) {
      const userId = await getUserId()

      if (userId) {
        const userRef = doc(db, 'users', userId)
        const userSnap = await getDoc(userRef)

        const firestoreUser = userSnap.exists()
          ? (cleanFirestore(userSnap.data() as FirestoreData) as UserData)
          : null

        if (!firestoreUser) {
          console.warn('User not found in Firestore, clearing session...')
          await clearTokens()
          await SecureStore.deleteItemAsync('userId')
          return null
        }
        if (firestoreUser.notificationsEnabled !== false) {
          try {
            const pushToken = await registerForPushNotificationsAsync(userId)
            if (
              pushToken &&
              (!firestoreUser.expoPushToken || firestoreUser.expoPushToken !== pushToken)
            ) {
              await setDoc(
                userRef,
                {
                  expoPushToken: pushToken,
                  pushTokens: arrayUnion(pushToken),
                  lastPushTokenUpdate: serverTimestamp(),
                },
                { merge: true },
              )
            }
          } catch (pushError) {
            console.warn('Push registration failed during restore:', pushError)
          }
        }

        return {
          tokens,
          user: firestoreUser,
        }
      }
      console.warn('No userId found, clearing tokens...')
      await clearTokens()
      return null
    }

    return null
  } catch (error) {
    console.error('Restore error:', error)
    await clearTokens()
    await SecureStore.deleteItemAsync('userId')
    return null
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const userId = await getUserId()

  if (userId) {
    try {
      const userRef = doc(db, 'users', userId)
      await setDoc(
        userRef,
        {
          notificationsEnabled: false,
          expoPushToken: null,
        },
        { merge: true },
      )
    } catch (error) {
      console.warn('Failed to clear push token on logout:', error)
    }
  }

  await clearTokens()
  await SecureStore.deleteItemAsync('userId')
  return null
})
