import { Card } from '@/components/ui/Card'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import React, { useEffect, useMemo } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated'

interface AnimatedCardProps {
  characterId: string
  characterName: string
}

const GLOSS_WIDTH = 50
const GLOSS_OFFSET = -100

export const AnimatedCard = ({ characterId, characterName }: AnimatedCardProps) => {
  const { width } = useWindowDimensions()
  const CARD_WIDTH = width - 32
  const EXTRA_OFFSET = 90

  const { spacing, borderRadius, colors } = useTheme()
  const styles = useMemo(
    () => createStyles({ spacing, borderRadius, colors }),
    [spacing, borderRadius, colors],
  )

  const translateX = useSharedValue(-CARD_WIDTH)

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withDelay(5000, withTiming(CARD_WIDTH + EXTRA_OFFSET, { duration: 2500 })),
        withTiming(-CARD_WIDTH, { duration: 0 }),
      ),
      -1,
    )

    return () => cancelAnimation(translateX)
  }, [CARD_WIDTH, translateX])

  const glossStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { rotate: '20deg' }],
  }))

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Card
          characterId={characterId}
          characterName={characterName}
          cardWidth={CARD_WIDTH}
          isClickable={false}
        />

        <Animated.View style={[styles.gloss, glossStyle]}>
          <View style={[styles.glossInner, { width: GLOSS_WIDTH }]} />
        </Animated.View>
      </View>
    </View>
  )
}

type CardStylesProps = Pick<ThemeContextValue, 'spacing' | 'borderRadius' | 'colors'>

const createStyles = ({ spacing, borderRadius, colors }: CardStylesProps) =>
  StyleSheet.create({
    cardContainer: {
      marginBottom: spacing['space-xl'],
      paddingHorizontal: spacing['space-lg'],
    },
    cardWrapper: {
      position: 'relative',
      borderRadius: borderRadius['border-xl'],
      overflow: 'hidden',
    },
    gloss: {
      position: 'absolute',
      top: GLOSS_OFFSET,
      bottom: GLOSS_OFFSET,
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
    },
    glossInner: {
      height: '100%',
      backgroundColor: colors['gloss-inner'],
      borderRadius: borderRadius['border-xl'],
    },
  })
