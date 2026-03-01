import { LoginPage, RegisterPage } from '@/app/auth'

export const routes = [
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
