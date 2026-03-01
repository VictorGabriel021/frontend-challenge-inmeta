import http from '@/core/http/axios'

import type { PaginatedCards } from '@/app/cards/features/myCards/card.types'

import type { CardModel } from '@/app/cards/models/card.model'

export const cardsService = {
  async getAll(page = 1, rpp = 10): Promise<PaginatedCards> {
    const { data } = await http.get('/cards', {
      params: { page, rpp },
    })
    return data
  },

  async getUserCards(): Promise<CardModel[]> {
    const { data } = await http.get('/me/cards')
    return data
  },

  async addToUser(cardIds: string[]) {
    await http.post('/me/cards', { cardIds })
  },
}
