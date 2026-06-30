import { AppText } from '@/components/ui/AppText'
import { AnimatedCard } from '@/components/ui/character/AnimatedCard'
import { CharacterDetails } from '@/components/ui/character/CharacterDetails'
import { ThemeContextValue } from '@/context/ThemeContext'
import { Character } from '@/hooks/useCharacters/useCharacters.types'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '../../Icon'

interface CharacterHeaderProps {
  character: Character
  isFavorite: boolean
  onFavoritePress: () => void
}

export const CharacterHeader = React.memo(
  ({ character, isFavorite, onFavoritePress }: CharacterHeaderProps) => {
    const { spacing, theme } = useTheme()
    const styles = useMemo(() => createStyles({ spacing }), [spacing])

    return (
      <>
        <AnimatedCard characterId={character?.id} characterName={character?.name} />
        <View style={styles.addFavorite}>
          <AppText variant='subtitle' align='left'>
            {character?.title}
          </AppText>
          <TouchableOpacity onPress={onFavoritePress}>
            <Icon name={isFavorite ? 'favorite' : 'unfavorite'} size='lg' />
          </TouchableOpacity>
        </View>
        <CharacterDetails
          characterId={character?.id}
          description={character?.description}
          symbols={character?.symbols}
          funFact={character?.funFact}
        />
      </>
    )
  },
)
CharacterHeader.displayName = 'CharacterHeader'

type HeaderStylesProps = Pick<ThemeContextValue, 'spacing'>

const createStyles = ({ spacing }: HeaderStylesProps) =>
  StyleSheet.create({
    addFavorite: {
      flexDirection: 'row',
      gap: spacing['space-xs'],
      marginBottom: spacing['space-xl'],
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing['space-lg'],
    },
  })
