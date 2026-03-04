import type { CardModel } from '@/app/cards/models/card.model'

export interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: 'OFFERING' | 'RECEIVING'
  card: CardModel
}

export interface TradeModel {
  id: string
  userId: string
  createdAt: string
  user: {
    name: string
  }
  tradeCards: TradeCard[]
}
