<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border bg-[rgb(var(--color-card))] border-[rgb(var(--color-border))] shadow-sm',
        'text-[rgb(var(--color-foreground))]',
        $attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
