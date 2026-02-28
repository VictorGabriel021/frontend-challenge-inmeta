<script setup lang="ts">
import { useThemeStore } from '@/stores/theme.store'
import { useAuthStore } from '@/stores/auth.store'

import { Toaster } from 'vue-sonner'

import MainNavbar from '@/components/layout/MainNavbar.vue'

import { Sun, Moon } from 'lucide-vue-next'

const themeStore = useThemeStore()
themeStore.applyTheme()
</script>

<template>
  <MainNavbar v-if="useAuthStore().isAuthenticated" />

  <button
    v-else
    @click="themeStore.toggleTheme()"
    class="absolute top-4 right-4 p-2 rounded-md hover:bg-muted transition cursor-pointer hover:opacity-80"
  >
    <Sun v-if="themeStore.theme === 'dark'" class="w-5 h-5" />
    <Moon v-else class="w-5 h-5" />
  </button>

  <router-view />

  <toaster
    position="top-right"
    richColors
    closeButton
    :toastOptions="{
      class: 'font-medium',
    }"
    :theme="themeStore.theme"
  />
</template>
