import { ICON_SIZE } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { Image } from 'expo-image'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from '../../Icon'

interface UserAvatarProps {
  imageUrl?: string | null
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl }) => {
  const { borderRadius } = useTheme()
  const styles = useMemo(() => createStyles({ borderRadius }), [borderRadius])

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={styles.avatar}
        cachePolicy='memory-disk'
        contentFit='cover'
      />
    )
  }

  return <Icon name='user' size='lg' />
}

type AvatarStylesProps = Pick<ThemeContextValue, 'borderRadius'>

const createStyles = ({ borderRadius }: AvatarStylesProps) =>
  StyleSheet.create({
    avatar: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      borderRadius: borderRadius['border-md'],
    },
  })
