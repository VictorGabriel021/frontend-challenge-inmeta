<script setup lang="ts">
import { ref } from 'vue'

import { Eye, EyeOff, Lock } from 'lucide-vue-next'

import Input from './Input.vue'

const show = ref(false)

defineProps<{
  modelValue?: string
  placeholder?: string
  error?: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <Input
    :type="show ? 'text' : 'password'"
    :model-value="modelValue"
    :placeholder="placeholder"
    :error="error"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #prefix>
      <Lock class="w-4 h-4 text-[rgb(var(--color-foreground))]" />
    </template>
    <template #suffix>
      <button type="button" class="text-muted-foreground hover:opacity-70" @click="show = !show">
        <Eye v-if="!show" class="w-4 h-4" />
        <EyeOff v-else class="w-4 h-4" />
      </button>
    </template>
  </Input>
</template>
