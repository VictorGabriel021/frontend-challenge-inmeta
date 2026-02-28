import type z from 'zod'

export type RegisterSchema = z.ZodObject<
  {
    name: z.ZodString
    email: z.ZodString
    password: z.ZodString
  },
  z.core.$strip
>

export type RegisterForm = z.infer<RegisterSchema>

export type ResponseRegisterForm = {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}
