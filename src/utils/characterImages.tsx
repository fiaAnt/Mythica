import athena from '../../assets/images/athena.svg'

export const characterImages: Record<string, React.ElementType> = {
  афина: athena,
  athena: athena,
}

export const getCharacterImage = (name: string): React.ReactNode => {
  if (!name) return null
  const key = name.toLowerCase()
  const CharacterComponent = characterImages[key]
  return CharacterComponent ? <CharacterComponent width='100%' height='100%' /> : null
}
