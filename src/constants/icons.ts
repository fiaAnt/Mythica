import { ThemeToggleIcon } from '@/components/ui/ThemeToggleIcon'
import { SVGProps } from 'react'
import BackIcon from '../../assets/images/back.svg'
import CardIcon from '../../assets/images/card.svg'
import FiltersIcon from '../../assets/images/filters.svg'
import MenuIcon from '../../assets/images/menu.svg'
import PenIcon from '../../assets/images/pen.svg'
import SearchIcon from '../../assets/images/search.svg'
import UserIcon from '../../assets/images/user.svg'

export const IconTokens = {
  Search: 'search',
  Theme: 'theme',
  Back: 'back',
  User: 'user',
  Filters: 'filters',
  Card: 'card',
  Menu: 'menu',
  Pen: 'pen',
} as const

export type IconToken = (typeof IconTokens)[keyof typeof IconTokens]

export const IconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const

export type IconSize = keyof typeof IconSizes

export const ICONS_BY_TOKEN: Record<IconToken, React.ComponentType<SVGProps<SVGSVGElement>>> = {
  [IconTokens.Search]: SearchIcon,
  [IconTokens.Back]: BackIcon,
  [IconTokens.Card]: CardIcon,
  [IconTokens.User]: UserIcon,
  [IconTokens.Filters]: FiltersIcon,
  [IconTokens.Menu]: MenuIcon,
  [IconTokens.Pen]: PenIcon,
  [IconTokens.Theme]: ThemeToggleIcon,
}
