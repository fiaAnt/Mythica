import { Timestamp } from 'firebase/firestore'

export interface UserData {
  uid: string
  email: string
  name: string
  picture?: string | null
  emailVerified: boolean
  achievements: string[]
  explored: string[]
  favorite: string[]
  notes: Record<string, string>
  progress: Record<string, unknown>
  provider: string
  lastLoginAt?: string
  expoPushToken?: string | null
  pushTokens?: string[]
  notificationsEnabled?: boolean
  lastPushTokenUpdate?: string
}

export interface AuthState {
  user: UserData | null
  tokens: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  isInitialized: boolean
}
export interface Auth0JwtPayload {
  sub: string
  email?: string
  name?: string
  picture?: string
  email_verified?: boolean
}
export type FirestoreData =
  | string
  | number
  | boolean
  | null
  | undefined
  | Timestamp
  | FirestoreData[]
  | { [key: string]: FirestoreData }

export type CleanFirestoreData =
  | string
  | number
  | boolean
  | null
  | undefined
  | CleanFirestoreData[]
  | { [key: string]: CleanFirestoreData }
