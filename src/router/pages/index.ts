import { routes as authRoutes } from './auth'
import { routes as cardsRoutes } from './cards'

export const routes = [...authRoutes, ...cardsRoutes]
