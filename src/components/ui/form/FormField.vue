<script setup lang="ts">
defineProps<{
  error?: string
}>()
</script>

<template>
  <div class="space-y-2">
    <slot />
    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>
