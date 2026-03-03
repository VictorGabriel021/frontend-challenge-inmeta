<script setup lang="ts">
import { onMounted } from 'vue'

import { useMarketplaceViewModel } from './useMarketplaceViewModel'

import { ArrowRight, Loader2 } from 'lucide-vue-next'

defineOptions({ name: 'MarketplacePage' })

const vm = useMarketplaceViewModel()

onMounted(() => {
  vm.fetchInitial()
})
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-8">Marketplace</h1>

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
        class="bg-[rgb(var(--color-card))] p-6 rounded-xl shadow"
      >
        <p class="text-sm text-muted-foreground mb-4">by {{ trade.user.name }}</p>

        <div class="flex items-center justify-between gap-4">
          <img
            :src="trade.tradeCards.find((c) => c.type === 'OFFERING')?.card?.imageUrl"
            class="w-32 h-40 object-cover rounded-lg"
          />

          <ArrowRight class="w-6 h-6" />

          <img
            :src="trade.tradeCards.find((c) => c.type === 'RECEIVING')?.card?.imageUrl"
            class="w-32 h-40 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>

    <div v-if="vm.state.more" class="flex justify-center mt-10">
      <button
        @click="vm.loadMore"
        :disabled="vm.state.loadingMore"
        class="px-6 py-2 border rounded-lg flex items-center gap-2"
      >
        <Loader2 v-if="vm.state.loadingMore" class="w-4 h-4 animate-spin" />
        {{ vm.state.loadingMore ? 'Loading...' : 'Load more' }}
      </button>
    </div>
  </div>
</template>
