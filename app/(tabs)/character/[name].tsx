import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { ThemeContextValue } from '@/context/themeContext'
import { useCharacters } from '@/hooks/useCharacters'
import { useTheme } from '@/hooks/useTheme'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function CharacterScreen() {
  const { name } = useLocalSearchParams<{ name: string }>()
  const { t, i18n } = useTranslation()
  const { spacing, colors } = useTheme()
  const styles = useMemo(() => createStyles({ spacing, colors }, [spacing, colors]))
  const insets = useSafeAreaInsets()
  const { characters, loading, error } = useCharacters(i18n.language)

  const decodedName = name ? decodeURIComponent(name) : ''

  const character = characters.find((char) => char.name.toLowerCase() === decodedName.toLowerCase())

  if (loading) {
    return (
      <View
        style={[styles.container, styles.center, { backgroundColor: colors['background-primary'] }]}
      >
        <ActivityIndicator size='large' color={colors['background-surface-primary']} />
      </View>
    )
  }

  if (error) {
    return (
      <View
        style={[styles.container, styles.center, { backgroundColor: colors['background-primary'] }]}
      >
        <AppText variant='title'>{error}</AppText>
      </View>
    )
  }

  if (!character) {
    return (
      <View
        style={[styles.container, styles.center, { backgroundColor: colors['background-primary'] }]}
      >
        <AppText variant='body'>{t('characterError')}</AppText>
      </View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: colors['background-primary'] },
      ]}
    >
      <Bar path='/' title={character.name} leftIcon='back' />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: colors['background-primary'] },
        ]}
      >
        <Stack.Screen
          options={{
            title: character.name,
          }}
        />

        <View style={[styles.card, { shadowColor: colors['overlay-50'] }]}>
          <Card characterId={character.id} characterName={character.name}></Card>
        </View>

        <AppText variant='subtitle' align='center'>
          {character.title}
        </AppText>

        <Input icon={'pen'} placeholder={t('addNote')} />

        <AppText variant='body'>{character.description}</AppText>

        <AppText variant='title'>{t('symbols')}</AppText>
        <AppText variant='body'>{character.symbols}</AppText>

        <AppText variant='title'>{t('funFact')}</AppText>
        <AppText variant='body'>{character.funFact}</AppText>
      </ScrollView>
    </View>
  )
}
type CharacterStylesProps = Pick<ThemeContextValue, 'spacing'>
const createStyles = ({ spacing }: CharacterStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      gap: spacing['space-md'],
      padding: spacing['space-xxl'],
    },
    card: {
      paddingVertical: spacing['space-md'],
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
