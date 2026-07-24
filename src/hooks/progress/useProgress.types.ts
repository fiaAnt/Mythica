export interface MythologyProgress {
  [mythology: string]: {
    explored: number
    total: number
    percentage: number
  }
}
