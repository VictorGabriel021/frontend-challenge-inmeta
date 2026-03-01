<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  class?: string
}>()

defineOptions({
  inheritAttrs: false,
  name: 'InputCustom',
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative w-full">
    <span
      v-if="$slots.prefix"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    >
      <slot name="prefix" />
    </span>

    <input
      v-bind="$attrs"
      :type="type || 'text'"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :class="
        cn(
          'flex w-full rounded-md border bg-[rgb(var(--color-card))] px-3 py-2 text-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus-visible:ring-red-500' : 'border-[rgb(var(--color-border))]',
          $slots.prefix && 'pl-10',
          $slots.suffix && 'pr-10',
        )
      "
    />

    <!-- Suffix -->
    <span v-if="$slots.suffix" class="absolute right-3 top-1/2 -translate-y-1/2">
      <slot name="suffix" />
    </span>
  </div>
</template>
