export type AchievementType = 'cyclops' | 'pyramid' | 'souls' | 'ragnarok'

export interface AchievementsState {
  achievements: AchievementType[]
  isLoading: boolean
  isInitialized: boolean
  error: string | null
}
