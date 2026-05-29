import afina from '@/assets/images/afina.png'
import { AppDropdown } from '@/components/ui/AppDropdown'
import { AppText } from '@/components/ui/AppText'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

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

  const handleSearch = () => {
    setResults(`Результаты поиска: ${searchText}`)
  }

  return (
    <SafeAreaView style={styles.container}>
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

        <Card overlayImage={afina}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
})
