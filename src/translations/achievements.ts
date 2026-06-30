import { AchievementId } from '@/services/cloudinaryService'

const ru = {
  achievements: [
    { id: 'cyclops', title: 'Циклоп', description: 'Изучите первого персонажа' },
    { id: 'pyramid', title: 'Пирамида: первый ярус', description: 'Изучите 10 персонажей' },
    { id: 'souls', title: 'Коллекционер душ', description: 'Добавьте 5 персонажей в избранное' },
    { id: 'ragnarok', title: 'Рагнарёк отменяется', description: 'Изучите всех персонажей' },
  ],
}

const en = {
  achievements: [
    { id: 'cyclops', title: 'Cyclops', description: 'Study your first character' },
    { id: 'pyramid', title: 'Pyramid: First Level', description: 'Study 10 characters' },
    { id: 'souls', title: 'Soul Collector', description: 'Add 5 characters to favorites' },
    { id: 'ragnarok', title: 'Ragnarok Cancelled', description: 'Study all characters' },
  ],
}

export const fetchLocalAchievements = (language: string) => {
  return language === 'ru' ? ru : en
}

export const getAchievementDetails = (language: string, id: AchievementId) => {
  const data = fetchLocalAchievements(language)
  return data.achievements.find((item) => item.id === id)
}
