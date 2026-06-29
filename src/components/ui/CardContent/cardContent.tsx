import React from 'react'
import { StyleSheet, View } from 'react-native'
import CardBackground from '../../../../assets/images/card.svg'

interface CardContentProps {
  overlayImage?: React.ReactNode
  children?: React.ReactNode
}

export const CardContent = ({ overlayImage, children }: CardContentProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <CardBackground />
        {overlayImage && <View style={styles.overlayContainer}>{overlayImage}</View>}

        {children && <View style={styles.content}>{children}</View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 320,
    margin: 10,
    overflow: 'hidden',
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    top: 30,
    alignSelf: 'center',
    zIndex: 10,
  },
  content: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 12,
  },
})
