export const IconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const

export type IconSize = keyof typeof IconSizes
