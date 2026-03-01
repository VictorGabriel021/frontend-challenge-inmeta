import type { CardModel } from '../../models/card.model'

export interface PaginatedCards {
  list: CardModel[]
  rpp: number
  page: number
  more: boolean
}
