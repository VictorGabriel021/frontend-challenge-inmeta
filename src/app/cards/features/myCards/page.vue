<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CardGrid from '../components/CardGrid.vue'
import AddCardDialog from '../components/AddCardDialog.vue'

import Button from '@/components/ui/button/Button.vue'

import { useMyCardsViewModel } from './useMyCardsViewModel'

import { Loader2 } from 'lucide-vue-next'

defineOptions({ name: 'MyCardsPage' })

const vm = useMyCardsViewModel()
const open = ref(false)

onMounted(() => {
  vm.fetchUserCards()
})
</script>

<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Minhas Cartas</h1>

      <Button @click="open = true"> Adicionar Carta </Button>
    </div>

    <div v-if="vm.state.loading" class="flex-1 flex justify-center items-center">
      <Loader2 class="w-30 h-30 animate-spin" />
    </div>
    <div v-else-if="!vm.state.userCards.length" class="text-center py-20 opacity-70">
      Você ainda não possui cartas.
    </div>

    <CardGrid v-else :cards="vm.state.userCards" />

    <AddCardDialog v-model:open="open" :vm="vm" />
  </div>
</template>
