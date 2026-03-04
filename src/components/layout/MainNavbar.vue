<script setup lang="ts">
import router from '@/router'

import { useAuthStore } from '@/stores/auth.store'
import { useThemeStore } from '@/stores/theme.store'

import Button from '@/components/ui/button/Button.vue'

import { Moon, Sun } from 'lucide-vue-next'

const auth = useAuthStore()
const theme = useThemeStore()

function handleLogout() {
  auth.logout()
  router.replace('/login')
}
</script>

<template>
  <nav
    class="flex items-center justify-between flex-col md:flex-row gap-4 px-6 py-4 border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))]"
  >
    <span class="font-semibold">Cards Marketplace</span>

    <ul class="flex items-center gap-6">
      <li>
        <router-link to="/">Marketplace</router-link>
      </li>
      <li>
        <router-link to="/my-cards">Minhas Cartas</router-link>
      </li>
    </ul>

    <div class="flex items-center gap-4">
      <button
        @click="theme.toggleTheme()"
        class="p-2 rounded-md hover:bg-muted transition cursor-pointer hover:opacity-80"
      >
        <Sun v-if="theme.theme === 'dark'" class="w-5 h-5" />
        <Moon v-else class="w-5 h-5" />
      </button>

      <Button variant="destructive" class="cursor-pointer hover:opacity-80" @click="handleLogout"
        >Sair</Button
      >
    </div>
  </nav>
</template>
