import { reactive, toRefs } from 'vue'

import { cardsService } from '@/services/cards.service'

import type { CardModel } from '../../models/card.model'

export function useMyCardsViewModel() {
  const state = reactive({
    selected: [] as string[],
    userCards: [] as CardModel[],
    allCards: [] as CardModel[],
    loading: false,
    loadingMore: false,
    page: 1,
    rpp: 10,
    more: false,
  })

  async function addToUser(cardIds: string[]) {
    await cardsService.addToUser(cardIds)
    await fetchUserCards()
  }

  async function fetchUserCards() {
    try {
      state.loading = true
      state.userCards = await cardsService.getUserCards()
    } finally {
      state.loading = false
    }
  }

  async function fetchInitial() {
    state.loading = true
    state.page = 1

    const data = await cardsService.getAll(state.page, state.rpp)

    state.allCards = data.list
    state.more = data.more

    state.loading = false
  }

  async function loadMore() {
    if (!state.more || state.loadingMore) return

    state.loadingMore = true
    state.page++

    const data = await cardsService.getAll(state.page, state.rpp)

    state.allCards.push(...data.list)
    state.more = data.more

    state.loadingMore = false
  }

  function reset() {
    state.allCards = []
    state.page = 1
    state.more = false
  }

  return {
    ...toRefs(state),
    fetchUserCards,
    loadMore,
    fetchInitial,
    reset,
    addToUser,
  }
}
