import { IconSize, IconSizes } from '@/constants/icons'
import { useTheme } from '@/hooks/useTheme'
import { getIcon } from '@/services/cloudinaryService'
import React, { useMemo } from 'react'
import { Image, StyleSheet } from 'react-native'

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
        styles.icon,
        {
          width: pixelSize,
          height: pixelSize,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
})
