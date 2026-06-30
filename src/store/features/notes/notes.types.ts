interface Note {
  id: string
  text: string
  createdAt: string
  updatedAt: string
}

export interface NotesState {
  notes: Record<string, Note>
  loading: boolean
  error: string | null
}
