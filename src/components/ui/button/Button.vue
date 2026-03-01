<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  variant?: 'default' | 'outline' | 'destructive'
  disabled?: boolean
  loading?: boolean
}>()

defineOptions({ name: 'ButtonCustom' })
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'flex items-center justify-center gap-1 px-4 py-2 rounded-md font-medium transition cursor-pointer hover:opacity-80',
      variant === 'outline' && 'border border-[rgb(var(--color-border))]',
      variant === 'destructive' && 'bg-red-500 text-white',
      (!variant || variant === 'default') && 'bg-[rgb(var(--color-primary))] text-white',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <slot />

    <span v-if="loading" class="ml-2"> <Loader2 class="w-4 h-4 animate-spin" /></span>
  </button>
</template>
