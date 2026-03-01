import z from 'zod'

import type { LoginSchema } from './login.types'

export const schema: LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})
