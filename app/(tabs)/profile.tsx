import back from '@/assets/images/back.png'
import user from '@/assets/images/user.png'
import { AppText } from '@/components/ui/AppText'
import { Bar } from '@/components/ui/Bar'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TabId = 'unexplored' | 'favorites'

interface Tab {
  id: TabId
  label: string
}

const TABS: Tab[] = [
  { id: 'unexplored', label: 'Unexplored' },
  { id: 'favorites', label: 'Favorites' },
]

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState<TabId>('unexplored')

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Bar path='/' title='Profile' icon={back} />

      <View style={styles.userInformation}>
        <Image source={user} style={styles.avatar} />
        <View style={styles.loadings}>
          <AppText variant='small'>загрузка 1</AppText>
          <AppText variant='small'>загрузка 2</AppText>
          <AppText variant='small'>загрузка 3</AppText>
        </View>
      </View>

      <View style={styles.name}>
        <AppText variant='body'>Name Lastname</AppText>
      </View>

      <View style={styles.achievements}>
        <AppText variant='body'>Achievements</AppText>
        <AppText variant='small'>You do not have any achievements yet</AppText>
      </View>

      <View style={styles.choose}>
        {TABS.map((tab) => {
          const isSelected = selectedTab === tab.id
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              style={styles.tabButton}
            >
              <AppText
                variant='body'
                style={isSelected ? styles.selectedText : styles.unselectedText}
              >
                {tab.label}
              </AppText>
              {isSelected && <View style={styles.underline} />}
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={styles.card}>
        {selectedTab === 'unexplored' && <AppText>Unexplored content goes here</AppText>}
        {selectedTab === 'favorites' && <AppText>Favorites content goes here</AppText>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInformation: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadings: {
    flexDirection: 'column',
    gap: 5,
  },
  name: {
    marginBottom: 20,
  },
  achievements: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#DFD4C2',
    borderRadius: 12,
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  tabButton: {
    alignItems: 'center',
    position: 'relative',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#000',
  },
  unselectedText: {
    fontWeight: 'normal',
    color: '#666',
  },
  underline: {
    position: 'absolute',
    bottom: -8,
    width: '100%',
    height: 2,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  card: {
    backgroundColor: '#DFD4C2',
    width: '100%',
    padding: 20,
    minHeight: 100,
  },
})
