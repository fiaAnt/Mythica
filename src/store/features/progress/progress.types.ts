export interface MythologyProgress {
  [mythology: string]: {
    explored: number
    total: number
    percentage: number
  }
}

export interface ProgressState {
  mythologies: MythologyProgress
  loading: boolean
  error: string | null
}
