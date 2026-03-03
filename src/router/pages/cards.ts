import { MyCardsPage } from '@/app/cards'

export const routes = [
  {
    path: '/my-cards',
    component: MyCardsPage,
    meta: { requiresAuth: true },
  },
]
