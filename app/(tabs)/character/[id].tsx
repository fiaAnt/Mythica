import { CardSkeleton } from '@/components/CardSkeleton'
import { InfoModal } from '@/components/InfoModal'
import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { CharacterHeader } from '@/components/ui/character/CharacterHeader'
import { SimilarCharacters } from '@/components/ui/character/SimilarCharacters'
import { CARD_MIN_HEIGHT } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useCharacterAuthAndData } from '@/hooks/auth/useCharacterAuthAndData'
import { useCharacterInteractions } from '@/hooks/auth/useCharacterInteractions'
import { useTheme } from '@/hooks/common/useTheme'
import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function CharacterScreen() {
  const insets = useSafeAreaInsets()
  const { colors, spacing } = useTheme()
  const styles = useMemo(() => createStyles({ spacing, colors }), [spacing, colors])

  const data = useCharacterAuthAndData()
  const { modalType, setModalType, handleFavorite, handleScrollEnd, isFavorite } =
    useCharacterInteractions({
      user: data.user,
      character: data.character,
      isExplored: data.isExplored,
    })

  if (data.loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <CardSkeleton height={CARD_MIN_HEIGHT} />
      </View>
    )
  }

  if (data.error || !data.character) {
    return (
      <View style={[styles.container, styles.center]}>
        <AppText variant='body'>{data.error || data.t('characterError')}</AppText>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Bar title={data.character.name} leftIcon='back' path='/' />

      <ScrollView
        onScroll={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CharacterHeader
          character={data.character}
          isFavorite={isFavorite}
          onFavoritePress={handleFavorite}
        />

        <SimilarCharacters
          character={data.character}
          characters={data.characters}
          title={data.t('similar_characters')}
          themePrimary={colors['text-primary']}
        />
      </ScrollView>

      <InfoModal
        visible={modalType !== null}
        iconType={modalType === 'info' ? 'info' : 'favorite_guard'}
        message={modalType === 'info' ? data.t('favorites_info') : data.t('favorite_guard')}
        onClose={() => setModalType(null)}
      />
    </View>
  )
}

type CharacterStylesProps = Pick<ThemeContextValue, 'spacing' | 'colors'>

const createStyles = ({ spacing, colors }: CharacterStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors['background-primary'],
    },
    scrollContent: {
      paddingBottom: spacing['space-xl'],
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
