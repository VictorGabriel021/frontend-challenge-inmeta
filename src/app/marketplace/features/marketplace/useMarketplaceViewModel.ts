import { reactive } from 'vue'

import { tradesService } from '@/services/trade.service'

import type { TradeModel } from '../../models/trade.model'

export function useMarketplaceViewModel() {
  const state = reactive({
    trades: [] as TradeModel[],
    loading: false,
    loadingMore: false,
    page: 1,
    rpp: 10,
    more: false,
  })

  async function fetchInitial() {
    state.loading = true
    state.page = 1

    const data = await tradesService.getAll(state.page, state.rpp)

    state.trades = data.list
    state.more = data.more

    state.loading = false
  }

  async function loadMore() {
    if (!state.more || state.loadingMore) return

    state.loadingMore = true
    state.page++

    const data = await tradesService.getAll(state.page, state.rpp)

    state.trades.push(...data.list)
    state.more = data.more

    state.loadingMore = false
  }

  return {
    state,
    fetchInitial,
    loadMore,
  }
}
