import { CARD_ASPECT_RATIO } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import { getIcon } from '@/services/cloudinaryService'
import { Image } from 'expo-image'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { CardContentProps } from './CardContent.types'

export const CardContent = ({ overlayImage, children, cardWidth }: CardContentProps) => {
  const { spacing, activeTheme } = useTheme()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const backgroundImage = useMemo(() => getIcon('card', activeTheme), [activeTheme])

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.imageContainer}>
        {backgroundImage && (
          <Image
            contentFit='cover'
            source={backgroundImage}
            style={styles.backgroundImage}
            cachePolicy='memory-disk'
          />
        )}
        {overlayImage && (
          <View style={styles.overlayContainer}>
            <Image source={overlayImage} style={styles.characterImage} contentFit='contain' />
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
    },
    content: {
      position: 'absolute',
      bottom: spacing['space-sm'],
      padding: spacing['space-md'],
      width: '100%',
      zIndex: 20,
    },
  })
