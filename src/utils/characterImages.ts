import athena from '@/assets/images/athena.svg'

export const characterImages: Record<string> = {
  афина: athena,
  athena: athena,
}

export const getCharacterImage = (name: string): string => {
  if (!name) return null
  const key = name.toLowerCase()
  return characterImages[key] || null
}
