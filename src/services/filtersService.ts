import { db } from '@/firebase'

export const getFilters = async (language: string) => {
  const querySnapshot = await db.collection(`characters_${language}`).get()

  const mythologiesSet = new Set<string>()
  const typesSet = new Set<string>()

  querySnapshot.docs.map((doc) => {
    const data = doc.data()

    if (data.mythology) {
      mythologiesSet.add(data.mythology)
    }

    if (data.type) {
      typesSet.add(data.type)
    }
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
