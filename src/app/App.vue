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

  <div class="absolute top-4 right-4 flex items-center gap-4" v-else>
    <p class="text-center text-sm text-muted-foreground hover:underline">
      <router-link to="/login">Login</router-link>
    </p>

    <button
      @click="themeStore.toggleTheme()"
      class="p-2 rounded-md hover:bg-muted transition cursor-pointer hover:opacity-80"
    >
      <Sun v-if="themeStore.theme === 'dark'" class="w-5 h-5" />
      <Moon v-else class="w-5 h-5" />
    </button>
  </div>

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
