import axios from 'axios'

import router from '@/router'

import { useAuthStore } from '@/stores/auth.store'

const http = axios.create({
  baseURL: 'https://cards-marketplace-api.onrender.com',
})

http.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default http
