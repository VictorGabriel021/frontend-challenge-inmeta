import type z from 'zod'

export type LoginSchema = z.ZodObject<
  {
    email: z.ZodString
    password: z.ZodString
  },
  z.core.$strip
>

export type LoginForm = z.infer<LoginSchema>

export type ResponseLoginForm = {
  userId: string
}
