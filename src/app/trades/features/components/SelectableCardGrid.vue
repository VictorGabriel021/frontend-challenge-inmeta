<script setup lang="ts">
import type { CardModel } from '@/app/cards/models/card.model'

import { Loader2 } from 'lucide-vue-next'

const { cards, selected, title } = defineProps<{
  cards: CardModel[]
  selected: string | number | null
  title: string
  loading: boolean
}>()

defineEmits(['select'])
</script>

<template>
  <h3 class="font-semibold mb-3">{{ title }}</h3>

  <div v-if="loading" class="flex justify-center py-10">
    <Loader2 class="w-6 h-6 animate-spin" />
  </div>

  <div v-else class="grid grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
    <div
      v-for="card in cards"
      :key="card.id"
      @click="$emit('select', card.id)"
      :class="[
        'cursor-pointer border rounded-lg p-2 transition',
        selected === card.id
          ? 'border-[rgb(var(--color-primary))] ring-2 ring-[rgb(var(--color-primary))]'
          : 'border-[rgb(var(--color-border))]',
      ]"
    >
      <img :src="card.imageUrl" class="w-full h-full max-h-70 object-contain rounded-md" />
    </div>
  </div>
</template>
