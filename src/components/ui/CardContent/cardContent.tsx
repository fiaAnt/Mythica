import { CARD_ASPECT_RATIO } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import { getIcon } from '@/services/cloudinaryService'
import React, { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface CardContentProps {
  overlayImage?: { uri: string } | null
  children?: React.ReactNode
  cardWidth?: number
}

export const CardContent = ({ overlayImage, children, cardWidth }: CardContentProps) => {
  const { spacing, theme } = useTheme()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const backgroundImage = useMemo(() => getIcon('card', theme), [theme])

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.imageContainer}>
        {backgroundImage && <Image source={backgroundImage} style={styles.backgroundImage} />}
        {overlayImage && (
          <View style={styles.overlayContainer}>
            <Image source={overlayImage} style={styles.characterImage} />
          </View>
        )}
        {children && <View style={styles.content}>{children}</View>}
      </View>
    </View>
  )
}

type CardContentStylesProps = Pick<ThemeContextValue, 'spacing'>
const createStyles = ({ spacing }: CardContentStylesProps) =>
  StyleSheet.create({
    card: {
      overflow: 'hidden',
      aspectRatio: CARD_ASPECT_RATIO,
    },
    imageContainer: {
      position: 'relative',
      flex: 1,
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      zIndex: 1,
    },
    overlayContainer: {
      position: 'absolute',
      top: spacing['space-xxl'],
      width: '70%',
      height: '80%',
      alignSelf: 'center',
      zIndex: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    characterImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    content: {
      position: 'absolute',
      bottom: spacing['space-sm'],
      padding: spacing['space-md'],
      width: '100%',
      zIndex: 20,
    },
  })
