<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'outline' | 'destructive'
  disabled?: boolean
}>()

defineOptions({ name: 'ButtonCustom' })
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'px-4 py-2 rounded-md font-medium transition cursor-pointer hover:opacity-80',
      variant === 'outline' && 'border border-[rgb(var(--color-border))]',
      variant === 'destructive' && 'bg-red-500 text-white',
      (!variant || variant === 'default') && 'bg-[rgb(var(--color-primary))] text-white',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <slot />
  </button>
</template>
