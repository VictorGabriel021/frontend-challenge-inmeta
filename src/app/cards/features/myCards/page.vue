<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CardGrid from '../components/CardGrid.vue'
import AddCardDialog from '../components/AddCardDialog.vue'

import Button from '@/components/ui/button/Button.vue'

import { useMyCardsViewModel } from './useMyCardsViewModel'

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

    <div v-if="vm.state.loading" class="text-center py-20">Carregando...</div>

    <div v-else-if="!vm.state.userCards.length" class="text-center py-20 opacity-70">
      Você ainda não possui cartas.
    </div>

    <CardGrid v-else :cards="vm.state.userCards" />

    <AddCardDialog v-model:open="open" :vm="vm" />
  </div>
</template>
