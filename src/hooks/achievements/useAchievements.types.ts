export type AchievementType = 'cyclops' | 'pyramid' | 'souls' | 'ragnarok'

export interface AchievementsState {
  achievements: AchievementType[]
  isLoading: boolean
  isInitialized: boolean
  error: string | null
}
export interface AnimationProps {
  achievements: AchievementsState[]
  isLoading: boolean
  isInitialized: boolean
  animated: boolean
}
