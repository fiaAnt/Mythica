import { UserData } from '@/store/features/auth/auth.types'
import { Character } from '../characters/useCharacters.types'

export interface InteractionOptions {
  user: UserData
  character: Character | undefined
  isExplored: boolean
}
