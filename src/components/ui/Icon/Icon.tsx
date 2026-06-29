import { ICONS_BY_TOKEN, IconSize, IconSizes, IconToken } from '@/constants/icons'
import { ThemeColor } from '@/theme/colors'
import { useTheme } from '@/theme/ThemeContext'

export interface IconProps {
  color: ThemeColor | string
  name: IconToken
  size: IconSize
}

export const Icon: React.FC<IconProps> = ({ color, name, size }) => {
  const { theme } = useTheme()
  const IconComponent = ICONS_BY_TOKEN[name]
  const iconColor = color
    ? (theme.colors[color as ThemeColor] ?? color)
    : theme.colors['icon-primary']

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }
  return <IconComponent color={iconColor} width={IconSizes[size]} height={IconSizes[size]} />
}
