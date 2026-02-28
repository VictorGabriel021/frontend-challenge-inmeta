import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import { LoginPage, RegisterPage } from '@/app/auth/index'

const routes = [
  {
    path: '/login',
    component: () => LoginPage,
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    component: () => RegisterPage,
    meta: { guestOnly: true },
  },
  {
    path: '/',
    component: () => import('@/app/home/page.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.token

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return '/'
  }
})

export default router
