import { CardSkeleton } from '@/components/CardSkeleton'
import { AppText } from '@/components/ui/AppText'
import { Card } from '@/components/ui/Card'
import { CARD_MIN_HEIGHT } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { Character } from '@/hooks/useCharacters/useCharacters.types'
import { useGroq } from '@/hooks/useGroq'
import { useTheme } from '@/hooks/useTheme'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

interface Props {
  character: Character | undefined
  characters: Character[]
  title: string
}

type SimilarCharacter = Pick<Character, 'id' | 'name'>

export const SimilarCharacters = ({ character, characters, title }: Props) => {
  const { spacing } = useTheme()
  const { width } = useWindowDimensions()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const { findSimilarCharacters, loading } = useGroq()
  const [data, setData] = useState<SimilarCharacter[]>([])

  useEffect(() => {
    if (!character || characters.length === 0) return

    let mounted = true

    findSimilarCharacters(character, characters).then((res) => {
      if (mounted) setData(res)
    })

    return () => {
      mounted = false
    }
  }, [character, characters])

  const cardWidth = useMemo(() => {
    const horizontalPadding = spacing['space-lg'] * 2
    const gap = spacing['space-md']
    return (width - horizontalPadding - gap) / 2
  }, [width, spacing])

  if (loading) {
    return (
      <View style={styles.similarCharacters}>
        <AppText variant='title'>{title}</AppText>
        <View style={styles.grid}>
          <CardSkeleton height={CARD_MIN_HEIGHT} />
          <CardSkeleton height={CARD_MIN_HEIGHT} />
        </View>
      </View>
    )
  }

  if (!data.length) return null

  return (
    <View style={styles.similarCharacters}>
      <AppText variant='title'>{title}</AppText>
      <View style={styles.grid}>
        {data.map((item) => (
          <View key={item.id} style={{ width: cardWidth }}>
            <Card characterId={item.id} characterName={item.name} cardWidth={cardWidth}>
              <AppText variant='body' align='center'>
                {item.name}
              </AppText>
            </Card>
          </View>
        ))}
      </View>
    </View>
  )
}

type SimilarCharactersStylesProps = Pick<ThemeContextValue, 'spacing'>

const createStyles = ({ spacing }: SimilarCharactersStylesProps) =>
  StyleSheet.create({
    similarCharacters: {
      gap: spacing['space-md'],
      paddingHorizontal: spacing['space-lg'],
      marginTop: spacing['space-xl'],
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing['space-md'],
      justifyContent: 'flex-start',
    },
  })
