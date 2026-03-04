<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { ArrowRight, Loader2, Trash2 } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth.store'

import { useMarketplaceViewModel } from './useMarketplaceViewModel'

import AddTradeDialog from '../components/AddTradeDialog.vue'
import DeleteTradeDialog from '../components/DeleteTradeDialog.vue'
import Button from '@/components/ui/button/Button.vue'

defineOptions({ name: 'MarketplacePage' })

const vm = useMarketplaceViewModel()
const { user } = useAuthStore()

const open = ref(false)
const openDeleteModal = ref(false)
const tradeToDelete = ref<string>('')

function handleOpenDeleteModal(tradeId: string) {
  tradeToDelete.value = tradeId
  openDeleteModal.value = true
}

onMounted(() => {
  vm.fetchInitial()
})
</script>

<template>
  <div class="container mx-auto py-10 px-2 max-w-250">
    <div class="flex justify-between flex-wrap gap-2 mb-8">
      <h1 class="text-2xl font-bold">Marketplace</h1>

      <Button v-if="user?.id" @click="open = true"> Solicitação de Troca </Button>
    </div>

    <div v-if="vm.state.loading" class="grid md:grid-cols-2 gap-6">
      <div v-for="n in 6" :key="n" class="animate-pulse bg-[rgb(var(--color-card))] p-6 rounded-xl">
        <div class="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div class="h-40 bg-gray-300 rounded"></div>
      </div>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-6">
      <div
        v-for="trade in vm.state.trades"
        :key="trade.id"
        class="bg-[rgb(var(--color-card))] p-6 rounded-xl shadow relative"
      >
        <p class="text-sm text-muted-foreground mb-4">by {{ trade.user.name }}</p>

        <div class="flex items-center justify-between gap-4">
          <img
            :src="trade.tradeCards.find((c) => c.type === 'OFFERING')?.card?.imageUrl"
            class="w-32 h-40 object-contain rounded-md"
          />

          <ArrowRight class="w-6 h-6" />

          <img
            :src="trade.tradeCards.find((c) => c.type === 'RECEIVING')?.card?.imageUrl"
            class="w-32 h-40 object-contain rounded-md"
          />
        </div>

        <button
          v-if="trade.userId === user?.id"
          @click="handleOpenDeleteModal(trade.id)"
          class="absolute top-4 right-4 text-red-500 text-sm"
        >
          <Trash2 class="w-6 h-6 cursor-pointer opacity-80" />
        </button>
      </div>
    </div>

    <div v-if="vm.state.more" class="flex justify-center mt-10">
      <button
        @click="vm.loadMore"
        :disabled="vm.state.loadingMore"
        class="px-6 py-2 border rounded-lg flex items-center gap-2"
      >
        <Loader2 v-if="vm.state.loadingMore" class="w-4 h-4 animate-spin" />
        {{ vm.state.loadingMore ? 'Carregando...' : 'Carregar mais' }}
      </button>
    </div>

    <AddTradeDialog v-model:open="open" :vm="vm" />
    <DeleteTradeDialog v-model:open="openDeleteModal" :trade-id="tradeToDelete" :vm="vm" />
  </div>
</template>
