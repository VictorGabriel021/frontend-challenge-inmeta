<script setup lang="ts">
import type { CardModel } from '../../models/card.model'

import CardItem from './CardItem.vue'

defineProps<{
  cards: CardModel[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    <CardItem v-for="card in cards" :key="card.id" :card="card" />
  </div>
</template>
