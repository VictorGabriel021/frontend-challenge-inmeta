import { reactive } from 'vue'

import { toast } from 'vue-sonner'

import { tradesService } from '@/services/trade.service'
import { cardsService } from '@/services/cards.service'

import type { CardModel } from '@/app/cards/models/card.model'
import type { TradeModel } from '../../models/trade.model'

export function useMarketplaceViewModel() {
  const state = reactive({
    trades: [] as TradeModel[],
    loading: false,
    loadingMore: false,
    page: 1,
    rpp: 10,
    more: false,

    creating: false,

    myCards: [] as CardModel[],
    loadingMyCards: false,

    systemCards: [] as CardModel[],
    systemPage: 1,
    systemMore: false,
    loadingSystem: false,
    loadingSystemMore: false,
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

  async function fetchMyCards() {
    state.loadingMyCards = true
    state.myCards = await cardsService.getUserCards()
    state.loadingMyCards = false
  }

  async function fetchSystemCards() {
    state.loadingSystem = true
    state.systemPage = 1

    const data = await cardsService.getAll(state.systemPage, 12)

    state.systemCards = data.list
    state.systemMore = data.more

    state.loadingSystem = false
  }

  async function loadMoreSystemCards() {
    if (!state.systemMore || state.loadingSystemMore) return

    state.loadingSystemMore = true
    state.systemPage++

    const data = await cardsService.getAll(state.systemPage, 12)

    state.systemCards.push(...data.list)
    state.systemMore = data.more

    state.loadingSystemMore = false
  }

  async function createTrade(offering: string, receiving: string) {
    if (!offering || !receiving) {
      toast.error('Selecione ambas as cartas')
      return
    }

    try {
      state.creating = true

      await tradesService.create({
        cards: [
          { cardId: offering, type: 'OFFERING' },
          { cardId: receiving, type: 'RECEIVING' },
        ],
      })

      toast.success('Troca criada com sucesso!')

      await fetchInitial()
    } catch (error) {
      toast.error('Erro ao criar troca')
    } finally {
      state.creating = false
    }
  }

  async function deleteTrade(tradeId: string) {
    try {
      await tradesService.delete(tradeId)

      state.trades = state.trades.filter((t) => t.id !== tradeId)

      toast.success('Troca deletada com sucesso!')
    } catch (error) {
      toast.error('Erro ao deletar troca')
    }
  }

  return {
    state,
    fetchInitial,
    loadMore,

    fetchMyCards,
    fetchSystemCards,
    loadMoreSystemCards,
    createTrade,
    deleteTrade,
  }
}
