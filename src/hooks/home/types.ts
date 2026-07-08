export interface ExploredState {
  explored: string[]
  loading: boolean
  error: string | null
}

export interface FilterOptions {
  isAuthenticated: boolean
  userExplored: ExploredState[]
}
