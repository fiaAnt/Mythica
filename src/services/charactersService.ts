import { db } from '@/firebase'
import { Character } from '@/hooks/characters/useCharacters.types'
import { collection, getDocs } from 'firebase/firestore'

export const getCharacters = async (language: string): Promise<Character[]> => {
  const querySnapshot = await getDocs(collection(db, `characters_${language}`))

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Character[]
}
