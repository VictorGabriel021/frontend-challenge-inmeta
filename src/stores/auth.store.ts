import { defineStore } from 'pinia'

import type { User } from '@/app/auth/models/user.model'

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setAuth(user: User, token: string) {
      this.user = user
      this.token = token

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    logout() {
      this.user = null
      this.token = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
