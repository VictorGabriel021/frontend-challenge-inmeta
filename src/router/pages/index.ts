import { routes as authRoutes } from './auth'
import { routes as cardsRoutes } from './cards'
import { routes as marketplaceRoutes } from './trades'

export const routes = [...authRoutes, ...marketplaceRoutes, ...cardsRoutes]
