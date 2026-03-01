import { LoginPage, RegisterPage } from '@/app/auth'

import HomePage from '@/app/home/page.vue'

export const routes = [
  {
    path: '/login',
    component: LoginPage,
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    component: RegisterPage,
    meta: { guestOnly: true },
  },
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true },
  },
]
