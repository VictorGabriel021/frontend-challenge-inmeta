export interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: 'OFFERING' | 'RECEIVING'
  card: {
    id: string
    name: string
    description: string
    imageUrl: string
    createdAt: string
  }
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
