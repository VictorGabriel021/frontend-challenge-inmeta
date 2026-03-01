<script setup lang="ts">
import { cn } from '@/lib/utils'

import type { CardModel } from '../../models/card.model'

const { card, selectable, selected } = defineProps<{
  card: CardModel
  selectable?: boolean
  selected?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()
</script>

<template>
  <div
    :class="
      cn(
        'h-fit rounded-lg border bg-[rgb(var(--color-card))] p-4 shadow-sm transition',
        selectable ? 'cursor-pointer hover:shadow-md' : '',
        selected ? 'border-[rgb(var(--color-primary))]' : 'border-[rgb(var(--color-border))]',
      )
    "
    @click="selectable && emit('select', card.id)"
  >
    <img
      :src="card.imageUrl"
      :alt="card.name"
      class="w-full h-full object-contain rounded-md mb-3"
    />

    <h3 class="font-semibold text-sm truncate">
      {{ card.name }}
    </h3>

    <p class="text-xs opacity-70 line-clamp-2 mt-1">
      {{ card.description }}
    </p>
  </div>
</template>
