import { reactive } from 'vue'

import { cardsService } from '@/services/cards.service'

import type { CardModel } from '../../models/card.model'

import { toast } from 'vue-sonner'

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
    try {
      await cardsService.addToUser(cardIds)
      await fetchUserCards()

      toast.success('Cartas adicionadas ao usuário com sucesso')
    } catch (error) {
      toast.error('Erro ao adicionar cartas ao usuário')
    }
  }

  async function fetchUserCards() {
    try {
      state.loading = true
      state.userCards = await cardsService.getUserCards()
    } catch (error) {
      toast.error('Erro ao carregar cartas do usuário')
    } finally {
      state.loading = false
    }
  }

  async function fetchInitial() {
    try {
      state.loading = true
      state.page = 1

      const data = await cardsService.getAll(state.page, state.rpp)

      state.allCards = data.list
      state.more = data.more
    } catch (error) {
      toast.error('Erro ao carregar cartas')
    } finally {
      state.loading = false
    }
  }

  async function loadMore() {
    if (!state.more || state.loadingMore) return

    try {
      state.loadingMore = true
      state.page++

      const data = await cardsService.getAll(state.page, state.rpp)

      state.allCards.push(...data.list)
      state.more = data.more
    } catch (error) {
      state.page--
      toast.error('Erro ao carregar mais cartas')
    } finally {
      state.loadingMore = false
    }
  }

  function reset() {
    state.allCards = []
    state.page = 1
    state.more = false
  }

  return {
    state,
    fetchUserCards,
    loadMore,
    fetchInitial,
    reset,
    addToUser,
  }
}
