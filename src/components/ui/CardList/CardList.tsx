import { AppText } from '@/components/ui/AppText'
import { Card } from '@/components/ui/Card'
import { CARD_MIN_HEIGHT } from '@/constants/sizes'
import { ThemeContextValue } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/common/useTheme'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'
import { CardListProps } from './CardList.types'

export const CardList: React.FC<CardListProps> = ({ data, numColumns = 2, header }) => {
  const { width } = useWindowDimensions()
  const { spacing } = useTheme()
  const styles = useMemo(() => createStyles({ spacing }), [spacing])

  const horizontalPadding = spacing['space-xl']
  const gap = spacing['space-md']
  const cardWidth = (width - horizontalPadding * 2 - gap * (numColumns - 1)) / numColumns

  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      getItemLayout={(_, index) => ({
        length: CARD_MIN_HEIGHT,
        offset: CARD_MIN_HEIGHT * index,
        index,
      })}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={header}
      removeClippedSubviews={true}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={[styles.cardWrapper, { width: cardWidth }]}>
          <Card characterId={item.id} characterName={item.name} cardWidth={cardWidth}>
            <AppText variant='body' align='center'>
              {item.title}
            </AppText>
          </Card>
        </View>
      )}
    />
  )
}
type CardListStylesProps = Pick<ThemeContextValue, 'spacing'>
const createStyles = ({ spacing }: CardListStylesProps) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacing['space-xl'],
      paddingBottom: spacing['space-xxl'],
    },
    row: {
      justifyContent: 'space-between',
      gap: spacing['space-md'],
    },
    cardWrapper: {
      marginBottom: spacing['space-lg'],
    },
  })
