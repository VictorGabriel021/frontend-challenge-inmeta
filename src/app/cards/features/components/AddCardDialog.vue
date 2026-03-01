<script setup lang="ts">
import { ref, watch } from 'vue'

import CardItem from './CardItem.vue'

import Button from '@/components/ui/button/Button.vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import { useMyCardsViewModel } from '../myCards/useMyCardsViewModel'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['update:open'])

const { fetchInitial, reset, addToUser, loading, allCards, more, loadMore, loadingMore } =
  useMyCardsViewModel()
const selected = ref<string[]>([])

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      fetchInitial()
    } else {
      reset()
      selected.value = []
    }
  },
)

function toggleCard(id: string) {
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((c) => c !== id)
  } else {
    selected.value.push(id)
  }
}

async function handleAdd() {
  if (!selected.value.length) return

  await addToUser(selected.value)
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent
      class="w-[90vw] h-[85vh] flex flex-col"
      @update:open="emit('update:open', $event)"
    >
      <h2 class="text-xl font-semibold mb-4">Adicionar Cartas</h2>

      <div v-if="loading" class="flex-1 flex items-center justify-center">Carregando cartas...</div>

      <div v-else class="flex-1 overflow-y-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <CardItem
            v-for="card in allCards"
            :key="card.id"
            :card="card"
            selectable
            :selected="selected.includes(card.id)"
            @select="toggleCard"
          />
        </div>

        <div v-if="more" class="flex justify-center mt-8">
          <Button variant="outline" :loading="loadingMore" @click="loadMore">
            Carregar mais
          </Button>
        </div>

        <div v-else class="text-center text-sm opacity-60 mt-8">
          Todas as cartas foram carregadas
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <Button :disabled="!selected.length" @click="handleAdd">
          Adicionar {{ selected.length }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
