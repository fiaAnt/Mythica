import { AppDropdown } from '@/components/ui/AppDropdown'
import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Theme } from '@/theme'
import { useTheme } from '@/theme/ThemeContext'
import React, { useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import AfinaImage from '../../assets/images/afina.svg'

enum Options {
  Greek = 'Greek',
  Norse = 'Norse',
  Egyptian = 'Egyptian',
}

enum Types {
  God = 'God',
  Hero = 'Hero',
  Beast = 'Beast',
}

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState('')
  const [selectedMythology, setSelectedMythology] = useState<string | undefined>()
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const { theme } = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const handleSearch = () => {
    setResults(`Результаты поиска: ${searchText}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Bar title='Main' leftIcon='user' path='/profile' />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Input value={searchText} onChangeText={setSearchText} onSearch={handleSearch} />

        <AppText variant='title' align='center'>
          Welcome to Mythica
        </AppText>

        <AppDropdown
          label='Mythology'
          placeholder='Select mythology'
          options={Options}
          value={selectedMythology}
          onChange={setSelectedMythology}
        />
        <AppDropdown
          label='Types'
          placeholder='Select type'
          options={Types}
          value={selectedType}
          onChange={setSelectedType}
        />

        <Button title='Button' />

        <Card>
          <AppText variant='body' align='center'>
            текст в карточке
          </AppText>
        </Card>

        <Card overlayImage={<AfinaImage width={180} height={240} />}>
          <AppText variant='body' align='center'>
            Афина
          </AppText>
        </Card>

        <Button title='Secondary Button' variant='secondary' />

        {results && (
          <AppText variant='small' align='center'>
            {results}
          </AppText>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors['background-primary'] },
    scrollContent: {
      alignItems: 'center',
      paddingHorizontal: spacing['space-xl'],
      paddingVertical: spacing['space-xl'],
      gap: spacing['space-sm'],
    },
  })
