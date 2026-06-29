import { ICONS_BY_TOKEN, IconSize, IconSizes, IconToken } from '@/constants/icons'
import { useTheme } from '@/hooks/useTheme'
import { ThemeColor } from '@/theme/colors'

export interface IconProps {
  color: ThemeColor | string
  name: IconToken
  size: IconSize
}

export const Icon: React.FC<IconProps> = ({ color, name, size }) => {
  const { colors } = useTheme()

  const IconComponent = ICONS_BY_TOKEN[name]

  const iconColor = color ? (colors[color as ThemeColor] ?? color) : colors['icon-primary']

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }
  return <IconComponent color={iconColor} width={IconSizes[size]} height={IconSizes[size]} />
}
