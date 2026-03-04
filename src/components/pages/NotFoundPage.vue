<script setup lang="ts">
import { useRouter } from 'vue-router'

import { AlertTriangle } from 'lucide-vue-next'

import Button from '../ui/button/Button.vue'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[rgb(var(--color-background))] px-6">
    <div class="flex flex-col text-center max-w-lg">
      <div class="flex justify-center mb-6">
        <div class="bg-[rgb(var(--color-card))] p-6 rounded-full shadow-lg">
          <AlertTriangle class="w-16 h-16 text-[rgb(var(--color-primary))]" />
        </div>
      </div>

      <h1 class="text-5xl font-bold mb-4">404</h1>

      <h2 class="text-xl font-semibold mb-4">Página não encontrada!</h2>

      <p class="text-muted-foreground mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>

      <Button @click="goHome"> Voltar ao Marketplace </Button>
    </div>
  </div>
</template>
