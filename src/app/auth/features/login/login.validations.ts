import z from 'zod'

import type { LoginSchema } from './login.types'

import { emailRegex } from '@/utils/regex'

export const schema: LoginSchema = z.object({
  email: z.string().regex(emailRegex, { message: 'Email inválido' }),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})
