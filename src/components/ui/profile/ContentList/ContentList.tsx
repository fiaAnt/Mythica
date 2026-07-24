import { AppText } from '@/components/ui/AppText'
import { CardList } from '@/components/ui/CardList'
import { CardItem } from '@/components/ui/CardList/CardList.types'
import { UNDERLINE_HEIGHT } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useCharacters } from '@/hooks/characters'
import { useTheme } from '@/hooks/common/useTheme'
import { useFavorites } from '@/hooks/favorites/useFavorites'
import { useExplored } from '@/hooks/progress/useExplored'
import { useAppSelector } from '@/store'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const ContentList = () => {
  const { t, i18n } = useTranslation()
  const [selectedTab, setSelectedTab] = useState<'explored' | 'favorites'>('explored')

  const { colors, spacing, borderRadius } = useTheme()
  const styles = useMemo(
    () => createStyles({ colors, spacing, borderRadius }),
    [colors, spacing, borderRadius],
  )

  const { characters, loading: charactersLoading } = useCharacters(i18n.language)
  const { isInitialized, user } = useAppSelector((state) => state.auth)

  const { data: userFavorites = [], isLoading: isFavoritesLoading } = useFavorites(user?.uid)
  const { data: userExplored = [], isLoading: isExploredLoading } = useExplored(user?.uid)

  const isLoading = !isInitialized || charactersLoading || isFavoritesLoading || isExploredLoading

  const exploredData = useMemo(() => {
    if (!characters.length) return []

    return userExplored
      .map((charId: string) => {
        const character = characters.find((c) => c.id === charId)
        return character
          ? {
              id: character.id,
              title: character.name,
              name: character.name,
            }
          : null
      })
      .filter((item): item is CardItem => item !== null)
  }, [userExplored, characters])

  const favoritesData = useMemo(() => {
    if (!characters.length) return []

    return userFavorites
      .map((charId: string) => {
        const character = characters.find((c) => c.id === charId)
        return character
          ? {
              id: character.id,
              title: character.name,
              name: character.name,
            }
          : null
      })
      .filter((item): item is CardItem => item !== null)
  }, [userFavorites, characters])

  const renderTabContent = () => {
    const isExplored = selectedTab === 'explored'
    const currentData = isExplored ? exploredData : favoritesData
    const emptyKey = isExplored ? 'explored_content' : 'favorites_content'

    if (isLoading) {
      return <CardList data={[]} isLoading={true} />
    }

    if (currentData.length === 0) {
      return (
        <View style={styles.card}>
          <AppText variant='body' align='center'>
            {t(emptyKey)}
          </AppText>
        </View>
      )
    }

    return <CardList data={currentData} isLoading={false} />
  }

  return (
    <View style={styles.content}>
      <View style={styles.choose}>
        <TouchableOpacity onPress={() => setSelectedTab('explored')} style={styles.tabButton}>
          <AppText
            variant='body'
            style={selectedTab === 'explored' ? styles.selectedText : styles.unselectedText}
          >
            {t('explored')}
          </AppText>
          {selectedTab === 'explored' && <View style={styles.underline} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedTab('favorites')} style={styles.tabButton}>
          <AppText
            variant='body'
            style={selectedTab === 'favorites' ? styles.selectedText : styles.unselectedText}
          >
            {t('favorites')}
          </AppText>
          {selectedTab === 'favorites' && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  )
}

type ContentListStylesProps = Pick<ThemeContextValue, 'colors' | 'spacing' | 'borderRadius'>

const createStyles = ({ colors, spacing, borderRadius }: ContentListStylesProps) =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    choose: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: spacing['space-xl'],
    },
    selectedText: {
      fontWeight: 'bold',
      color: colors['text-primary'],
    },
    unselectedText: {
      fontWeight: 'normal',
      color: colors['text-secondary'],
    },
    underline: {
      position: 'absolute',
      bottom: -spacing['space-xs'],
      width: '100%',
      height: UNDERLINE_HEIGHT,
      backgroundColor: colors['background-surface-secondary'],
      borderRadius: borderRadius['border-xs'],
    },
    card: {
      width: '100%',
      padding: spacing['space-xl'],
      borderRadius: borderRadius['border-md'],
      backgroundColor: colors['background-surface-primary'],
    },
    tabButton: {
      alignItems: 'center',
      position: 'relative',
    },
  })
