import { routes as authRoutes } from './auth'
import { routes as cardsRoutes } from './cards'
import { routes as marketplaceRoutes } from './marketplace'

export const routes = [...authRoutes, ...marketplaceRoutes, ...cardsRoutes]
