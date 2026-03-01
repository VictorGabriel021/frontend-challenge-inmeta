import { MyCardsPage } from '@/app/cards/index'

export const routes = [
  {
    path: '/my-cards',
    component: MyCardsPage,
    meta: { requiresAuth: true },
  },
]
