<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import { Loader2, X } from 'lucide-vue-next'

import type { useMarketplaceViewModel } from '../marketplace/useMarketplaceViewModel'

const props = defineProps<{
  open: boolean
  vm: ReturnType<typeof useMarketplaceViewModel>
}>()

const emit = defineEmits(['update:open'])

const selectedOffering = ref<string | null>(null)
const selectedReceiving = ref<string | null>(null)

const canCreate = computed(() => {
  return selectedOffering.value && selectedReceiving.value && !props.vm.state.creating
})

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      selectedOffering.value = null
      selectedReceiving.value = null

      await props.vm.fetchMyCards()
      await props.vm.fetchSystemCards()
    }
  },
)

function close() {
  emit('update:open', false)
}

async function handleCreate() {
  if (!selectedOffering.value || !selectedReceiving.value) return

  await props.vm.createTrade(selectedOffering.value, selectedReceiving.value)

  close()
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center m-2 z-50">
    <div
      class="bg-[rgb(var(--color-card))] w-250 max-h-[90vh] overflow-auto rounded-xl p-6 relative"
    >
      <button @click="close" class="absolute top-4 right-4 hover:opacity-70">
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-xl font-bold mb-6">Criar Solicitação de Troca</h2>

      <h3 class="font-semibold mb-3">Selecione sua carta</h3>

      <div v-if="vm.state.loadingMyCards" class="flex justify-center py-10">
        <Loader2 class="w-6 h-6 animate-spin" />
      </div>

      <div v-else class="grid grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <div
          v-for="card in vm.state.myCards"
          :key="card.id"
          @click="selectedOffering = card.id"
          :class="[
            'cursor-pointer border rounded-lg p-2 transition',
            selectedOffering === card.id
              ? 'border-[rgb(var(--color-primary))] ring-2 ring-[rgb(var(--color-primary))]'
              : 'border-[rgb(var(--color-border))]',
          ]"
        >
          <img :src="card.imageUrl" class="w-full h-full max-h-70 object-contain rounded-md" />
        </div>
      </div>

      <h3 class="font-semibold mb-3">Selecione carta desejada</h3>

      <div v-if="vm.state.loadingSystem" class="flex justify-center py-10">
        <Loader2 class="w-6 h-6 animate-spin" />
      </div>

      <div v-else class="grid grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <div
          v-for="card in vm.state.systemCards"
          :key="card.id"
          @click="selectedReceiving = card.id"
          :class="[
            'cursor-pointer border rounded-lg p-2 transition',
            selectedReceiving === card.id
              ? 'border-[rgb(var(--color-primary))] ring-2 ring-[rgb(var(--color-primary))]'
              : 'border-[rgb(var(--color-border))]',
          ]"
        >
          <img :src="card.imageUrl" class="w-full h-full max-h-70 object-contain rounded-md" />
        </div>
      </div>

      <div v-if="vm.state.systemMore" class="flex justify-center mb-8">
        <button
          @click="vm.loadMoreSystemCards"
          :disabled="vm.state.loadingSystemMore"
          class="px-6 py-2 border rounded-lg flex items-center gap-2"
        >
          <Loader2 v-if="vm.state.loadingSystemMore" class="w-4 h-4 animate-spin" />
          {{ vm.state.loadingSystemMore ? 'Carregando...' : 'Carregar mais' }}
        </button>
      </div>

      <button
        @click="handleCreate"
        :disabled="!canCreate"
        class="w-full py-3 rounded-lg bg-[rgb(var(--color-primary))] text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Loader2 v-if="vm.state.creating" class="w-4 h-4 animate-spin" />
        {{ vm.state.creating ? 'Criando...' : 'Criar Troca' }}
      </button>
    </div>
  </div>
</template>
