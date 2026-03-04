import type { TradeModel } from '../../models/trade.model'

export interface TradesResponse {
  list: TradeModel[]
  rpp: number
  page: number
  more: boolean
}

export interface CreateTradePayload {
  cards: {
    cardId: string
    type: 'OFFERING' | 'RECEIVING'
  }[]
}
