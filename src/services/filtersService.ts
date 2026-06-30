import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const getFilters = async (language: string) => {
  const colRef = collection(db, `characters_${language}`)
  const querySnapshot = await getDocs(colRef)

  const mythologiesSet = new Set<string>()
  const typesSet = new Set<string>()

  querySnapshot.forEach((doc) => {
    const data = doc.data()
    if (data?.mythology) mythologiesSet.add(data.mythology)
    if (data?.type) typesSet.add(data.type)
  })

  return {
    mythologies: [...mythologiesSet].map((value) => ({
      label: value.charAt(0).toUpperCase() + value.slice(1),
      value,
    })),
    types: [...typesSet].map((value) => ({
      label: value.charAt(0).toUpperCase() + value.slice(1),
      value,
    })),
  }
}
