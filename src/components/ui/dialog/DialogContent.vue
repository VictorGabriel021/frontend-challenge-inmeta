<script setup lang="ts">
import { useAttrs } from 'vue'

import { X } from 'lucide-vue-next'

const emit = defineEmits(['update:open'])
const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="attrs"
    :class="[
      'relative m-4 rounded-xl bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] shadow-lg p-6',
      attrs.class,
    ]"
  >
    <button
      @click="emit('update:open', false)"
      class="absolute top-0 right-0 hover:opacity-70 cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <x class="w-5 h-5" />
    </button>
    <slot />
  </div>
</template>
