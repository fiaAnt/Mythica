import { IconSize, IconSizes } from '@/constants/icons'
import { useTheme } from '@/hooks/common/useTheme'
import { getIcon } from '@/services/cloudinaryService'
import { Image } from 'expo-image'
import React, { useMemo } from 'react'

export interface IconProps {
  name: string
  size: IconSize
}

export const Icon: React.FC<IconProps> = ({ name, size }) => {
  const { theme } = useTheme()

  const normTheme = useMemo(() => String(theme).toLowerCase() as 'dark' | 'light', [theme])

  const iconSource = useMemo(() => getIcon(name, normTheme), [name, normTheme])

  const pixelSize = IconSizes[size]

  return (
    <Image
      source={iconSource}
      style={[
        {
          width: pixelSize,
          height: pixelSize,
        },
      ]}
      contentFit='contain'
      cachePolicy='memory-disk'
    />
  )
}
