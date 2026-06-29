import { CARD_ASPECT_RATIO } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/themeContext'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import CardBackground from '../../../../assets/images/card.svg'

interface CardContentProps {
  overlayImage?: React.ReactNode
  children?: React.ReactNode
  cardWidth?: number
}

export const CardContent = ({ overlayImage, children, cardWidth }: CardContentProps) => {
  const { spacing } = useTheme()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.imageContainer}>
        <CardBackground width='100%' height='100%' />
        {overlayImage && <View style={styles.overlayContainer}>{overlayImage}</View>}

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
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayContainer: {
      position: 'absolute',
      top: spacing['space-xxl'],
      width: '70%',
      height: '80%',
      alignSelf: 'center',
      zIndex: 10,
    },
    content: {
      position: 'absolute',
      bottom: spacing['space-sm'],
      padding: spacing['space-md'],
      width: '100%',
    },
  })
