const ru = {
  mythologies: [
    { label: 'Греческая', value: 'greek' },
    { label: 'Скандинавская', value: 'norse' },
    { label: 'Египетская', value: 'egyptian' },
  ],
  types: [
    { label: 'Бог', value: 'god' },
    { label: 'Герой', value: 'hero' },
    { label: 'Существо', value: 'beast' },
  ],
}

const en = {
  mythologies: [
    { label: 'Greek', value: 'greek' },
    { label: 'Norse', value: 'norse' },
    { label: 'Egyptian', value: 'egyptian' },
  ],
  types: [
    { label: 'God', value: 'god' },
    { label: 'Hero', value: 'hero' },
    { label: 'Beast', value: 'beast' },
  ],
}

export const fetchLocalFilters = (language: string) => {
  return language === 'ru' ? ru : en
}
