import z from 'zod'

import type { RegisterSchema } from './register.types'

import { emailRegex } from '@/utils/regex'

export const schema: RegisterSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().regex(emailRegex, { message: 'Email inválido' }),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})
