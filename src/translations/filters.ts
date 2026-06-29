const ru = {
  mythology: [
    { label: 'Греческая', value: 'greek' },
    { label: 'Скандинавская', value: 'norse' },
    { label: 'Египетская', value: 'egyptian' },
  ],
  type: [
    { label: 'Бог', value: 'god' },
    { label: 'Герой', value: 'hero' },
    { label: 'Существо', value: 'beast' },
  ],
}

const en = {
  mythology: [
    { label: 'Greek', value: 'greek' },
    { label: 'Norse', value: 'norse' },
    { label: 'Egyptian', value: 'egyptian' },
  ],
  type: [
    { label: 'God', value: 'god' },
    { label: 'Hero', value: 'hero' },
    { label: 'Beast', value: 'beast' },
  ],
}

export const getFilters = (language: string) => {
  return language === 'ru' ? ru : en
}
