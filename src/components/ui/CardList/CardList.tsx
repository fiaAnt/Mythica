import { AppText } from '@/components/ui/AppText'
import { Card } from '@/components/ui/Card'
import type { ReactElement } from 'react'
import React from 'react'
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'

interface CardItem {
  id: string
  title: string
  image?: any
}

interface CardListProps {
  data: CardItem[]
  numColumns?: number
  header?: ReactElement | null
}

export const CardList: React.FC<CardListProps> = ({ data, numColumns = 2, header }) => {
  const { width } = useWindowDimensions()
  const horizontalPadding = 16
  const columnGap = 12
  const cardWidth = (width - horizontalPadding * 2 - columnGap) / numColumns

  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <View style={[styles.cardWrapper, { width: cardWidth }]}>
          <Card overlayImage={item.image} cardWidth={cardWidth}>
            <AppText variant='body' align='center'>
              {item.title}
            </AppText>
          </Card>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  cardWrapper: {
    marginBottom: 12,
  },
})
