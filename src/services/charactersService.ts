import { db } from '@/firebase'
import { Character } from '@/hooks/useCharacters/useCharacters.types'

export const getCharacters = async (language: string): Promise<Character[]> => {
  const querySnapshot = await db.collection(`characters_${language}`).get()

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Character[]
}

