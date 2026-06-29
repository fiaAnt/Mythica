import { CardContent } from '@/components/ui/CardContent'
import { getCharacterImage } from '@/utils/characterImages'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface CardProps {
  characterName?: string
  onPress?: () => void
  children?: React.ReactNode
  cardWidth?: number
}

export const Card: React.FC<CardProps> = ({ characterName, onPress, children, cardWidth }) => {
  const overlayImage = characterName ? getCharacterImage(characterName) : null

  const handleCharacterPress = () => {
    if (!characterName) return
    router.push(`/character/${characterName}`)
    onPress?.()
  }

  return (
    <TouchableOpacity
      onPress={handleCharacterPress}
      style={styles.touchable}
      disabled={!characterName}
      activeOpacity={0.8}
    >
      <CardContent overlayImage={overlayImage} cardWidth={cardWidth}>
        {children}
      </CardContent>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
})
