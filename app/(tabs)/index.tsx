import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { CardList } from '@/components/ui/CardList'
import { Input } from '@/components/ui/Input'
import { ThemeContextValue } from '@/context/themeContext'
import { useCharacters } from '@/hooks/useCharacters'
import { Character } from '@/hooks/useCharacters/useCharacters.types'
import { useTheme } from '@/hooks/useTheme'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [searchText, setSearchText] = useState('')
  const [selectedMythology, setSelectedMythology] = useState<string | undefined>()
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const { colors, spacing } = useTheme()
  const styles = useMemo(() => createStyles({ colors, spacing }), [colors, spacing])
  const PATH = '/profile'

  const {
    characters,
    loading: charactersLoading,
    error: charactersError,
  } = useCharacters(currentLanguage)

  const filterRules = [
    (char: Character) => !searchText || char.name.toLowerCase().includes(searchText.toLowerCase()),
    (char: Character) => !selectedMythology || char.mythology === selectedMythology,
    (char: Character) => !selectedType || char.type === selectedType,
  ]

  const filteredCharacters = characters.filter((char) => filterRules.every((rule) => rule(char)))

  const handleFiltersApply = (mythology: string | undefined, type: string | undefined) => {
    setSelectedMythology(mythology)
    setSelectedType(type)
  }

  if (charactersLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors['background-primary'],
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator size='large' color={colors['background-surface-primary']} />
        <AppText style={{ color: colors['text-primary'] }}>...</AppText>
      </View>
    )
  }

  if (charactersError) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors['background-primary'],
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <AppText style={{ color: colors['text-primary'] }}>{charactersError}</AppText>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors['background-primary'] }]}>
      <Bar path={PATH} title={t('app_name')} leftIcon='user' onFiltersApply={handleFiltersApply} />
      <CardList
        data={filteredCharacters.map((char) => ({
          id: char.id,
          title: char.name,
          name: char.name,
        }))}
        header={
          <View style={styles.scrollContent}>
            <Input value={searchText} onChangeText={setSearchText} placeholder={t('search')} />
          </View>
        }
      />
    </SafeAreaView>
  )
}

type HomeStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing'>
const createStyles = ({ colors, spacing }: HomeStylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors['background-primary'],
    },
    scrollContent: {
      alignItems: 'center',
      paddingVertical: spacing['space-xl'],
      gap: spacing['space-sm'],
    },
  })
