export const LIGHT_COLORS = {
  'background-primary': '#ffffff',
  'background-surface-primary': '#DFD4C2',
  'background-surface-secondary': '#eadfcf',
  'background-selected': '#EBE6DE',
  'button-primary': '#eadfcf',
  'button-secondary': '#DFD4C2',
  'gradient-start': '#F8F5EF',
  'gradient-middle': '#EADFCF',
  'gradient-end': '#DCCDB7',
  'gloss-inner': 'rgba(247, 236, 236, 0.44)',
  'text-primary': '#000000',
  'text-secondary': '#343434',
  'border-primary': '#CDBFA8',
  'overlay-50': 'rgba(0,0,0,0.5)',
} as const

export const DARK_COLORS = {
  'background-primary': '#121212',
  'background-surface-primary': '#4D4D4D',
  'background-surface-secondary': '#2A2A2A',
  'background-selected': '#868686',
  'button-primary': '#2A2A2A',
  'button-secondary': '#4D4D4D',
  'gradient-start': '#1A1A1A',
  'gradient-middle': '#2A2A2A',
  'gradient-end': '#4D4D4D',
  'gloss-inner': 'rgba(94, 63, 63, 0.22)',
  'text-primary': '#FFFFFF',
  'text-secondary': '#bcb3a4',
  'border-primary': '#3A3A3A',
  'overlay-50': 'rgba(0,0,0,0.5)',
} as const

export type ThemeColor = keyof typeof LIGHT_COLORS
