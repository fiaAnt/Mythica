import type { ReactElement } from 'react'

interface CardItem {
  id: string
  title: string
  name: string
}

export interface CardListProps {
  data: CardItem[]
  numColumns?: number
  header?: ReactElement | null
}
