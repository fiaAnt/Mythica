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
  const { activeTheme } = useTheme()

  const iconSource = useMemo(() => getIcon(name, activeTheme), [name, activeTheme])

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
