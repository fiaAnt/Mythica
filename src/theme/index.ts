import { TYPOGRAPHY } from '../typography'
import { BORDER_RADIUS } from './borderRadius'
import { DARK_COLORS, LIGHT_COLORS } from './colors'
import { SHADOW } from './shadow'
import { SPACING } from './spacing'

export const LIGHT_THEME = {
  colors: LIGHT_COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  typography: TYPOGRAPHY,
  shadow: SHADOW,
} as const

export type Theme = typeof LIGHT_THEME

export const DARK_THEME = {
  colors: DARK_COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  typography: TYPOGRAPHY,
  shadow: SHADOW,
} as const
