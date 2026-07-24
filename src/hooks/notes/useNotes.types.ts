interface ExistingNote {
  id: number
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface Note {
  userId: string
  characterId: string
  text?: string
  existingNote?: ExistingNote
}
