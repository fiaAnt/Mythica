const CLOUD_NAME = 'dswcjgpfx'
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

const CHARACTERS = 'q_auto/f_auto/v1777037143'
const ICONS = 'v1777446841'

export const getCharacterImage = (characterId: string) => {
  if (!characterId) return null
  const fileName = characterId.toLowerCase().replace(/\s+/g, '')
  const url = `${BASE_URL}/${CHARACTERS}/${fileName}.png`
  return { uri: url }
}

export const getIcon = (iconName: string, theme: 'dark' | 'light' = 'light') => {
  const url = `${BASE_URL}/${ICONS}/${iconName}-${theme}.png`
  return { uri: url }
}

const achievementIcons = {
  cyclops: 'ach_cyclops',
  pyramid: 'ach_pyramid',
  souls: 'ach_souls',
  ragnarok: 'ach_ragnarok',
} as const

export type AchievementId = keyof typeof achievementIcons

export const getAchievementIcon = (theme: 'light' | 'dark', id: AchievementId) => {
  const baseName = achievementIcons[id]
  const suffix = theme
  const url = `${BASE_URL}/${baseName}-${suffix}.png`
  return { uri: url }
}
