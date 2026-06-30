import { AppText } from '@/components/ui/AppText'
import { Note } from '@/components/ui/character/Note'
import { Input } from '@/components/ui/Input'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useNotes } from '@/hooks/useNotes'
import { useTheme } from '@/hooks/useTheme'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

interface CharacterDetailsProps {
  characterId: string
  description: string
  symbols: undefined | string[]
  funFact: string | string[]
}

const DURATION = 400
const DELAY = 100

export const CharacterDetails = ({
  characterId,
  description,
  symbols,
  funFact,
}: CharacterDetailsProps) => {
  const { t } = useTranslation()
  const { spacing } = useTheme()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const opacity = useSharedValue<number>(0)
  const [shouldRender, setShouldRender] = useState<boolean>(false)

  const { inputText, setInputText, noteText, handleSubmitNote, handleEditNote, handleDeleteNote } =
    useNotes(characterId)

  useEffect(() => {
    if (noteText) {
      setShouldRender(true)
      opacity.value = 0
      opacity.value = withDelay(DELAY, withTiming(1, { duration: DURATION }))
    } else if (!noteText) {
      opacity.value = withTiming(0, { duration: DURATION })
      setTimeout(() => {
        setShouldRender(false)
      }, DURATION)
    }
  }, [noteText, opacity])

  const handleSubmitAndShow = () => {
    handleSubmitNote()
    opacity.value = withDelay(DELAY, withTiming(1, { duration: DURATION }))
  }

  const handleDeleteAnimation = () => {
    opacity.value = withTiming(0, { duration: DURATION })
    setTimeout(() => {
      handleDeleteNote()
    }, DURATION)
  }

  return (
    <View style={styles.container}>
      <Input
        value={inputText}
        icon='pen'
        placeholder={t('addNote')}
        onChangeText={setInputText}
        showCheckmark={true}
        onSubmit={handleSubmitAndShow}
        multiline={true}
        numberOfLines={4}
      />
      {shouldRender && noteText ? (
        <Animated.View style={{ opacity }}>
          <Note text={noteText} onEdit={handleEditNote} onDelete={handleDeleteAnimation} />
        </Animated.View>
      ) : null}

      <AppText variant='body' align='justify'>
        {description}
      </AppText>

      <View style={styles.addition}>
        <AppText variant='title'>{t('symbols')}</AppText>
        {Array.isArray(symbols) ? (
          symbols.map((item, index) => (
            <AppText key={index} variant='body'>
              • {item.trim()}
            </AppText>
          ))
        ) : (
          <AppText variant='body'>{symbols}</AppText>
        )}

        <AppText variant='title'>{t('funFact')}</AppText>
        {Array.isArray(funFact) ? (
          funFact.map((item, index) => (
            <AppText align='left' key={index} variant='body'>
              {item.trim()}
            </AppText>
          ))
        ) : (
          <AppText align='left' variant='body'>
            {funFact}
          </AppText>
        )}
      </View>
    </View>
  )
}

type DetailsStylesProps = Pick<ThemeContextValue, 'spacing'>

const createStyles = ({ spacing }: DetailsStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing['space-lg'],
      paddingBottom: spacing['space-xl'],
    },
    addition: {
      gap: spacing['space-sm'],
      marginTop: spacing['space-xl'],
    },
  })
