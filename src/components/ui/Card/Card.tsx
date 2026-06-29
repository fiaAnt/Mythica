import { CardContent } from '@/components/ui/CardContent'
import { CARD_MIN_HEIGHT } from '@/constants/sizes'
import { getCharacterImage } from '@/services/cloudinaryService'
import { router } from 'expo-router'
import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'

interface CardProps {
  characterId: string
  characterName?: string
  onPress?: () => void
  children?: React.ReactNode
  cardWidth?: number
}

export const Card: React.FC<CardProps> = ({
  characterId,
  characterName,
  onPress,
  children,
  cardWidth = CARD_MIN_HEIGHT,
}) => {
  const overlayImage = useMemo(() => {
    if (!characterId) return null
    const img = getCharacterImage(characterId)

    return img
  }, [characterId])

  const handleCharacterPress = () => {
    if (!characterId) return
    router.push(`/character/${characterId}`)
    onPress?.()
  }

  return (
    <TouchableOpacity onPress={handleCharacterPress} disabled={!characterName} activeOpacity={0.8}>
      <CardContent overlayImage={overlayImage} cardWidth={cardWidth}>
        {children}
      </CardContent>
    </TouchableOpacity>
  )
}
