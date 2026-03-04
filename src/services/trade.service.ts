import http from '@/core/http/axios'

import type { CreateTradePayload, TradesResponse } from '@/app/trades/features/trades/trades.types'

export const tradesService = {
  async getAll(page = 1, rpp = 10): Promise<TradesResponse> {
    const { data } = await http.get('/trades', {
      params: { page, rpp },
    })

    return data
  },

  async create(payload: CreateTradePayload) {
    const { data } = await http.post('/trades', payload)
    return data
  },

  async delete(id: string) {
    await http.delete(`/trades/${id}`)
  },
}
