import type { ReactElement } from 'react'

export interface CardItem {
  id: string
  title: string
  name: string
}

export interface CardListProps {
  data: CardItem[]
  numColumns?: number
  header?: ReactElement | null
}
