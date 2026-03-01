import type z from 'zod'

export type LoginSchema = z.ZodObject<
  {
    email: z.ZodString
    password: z.ZodString
  },
  z.core.$strip
>

export type LoginForm = z.infer<LoginSchema>
export type LoginFormErrors = Partial<Record<keyof LoginForm, string[]>>

export type ResponseLoginForm = {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}
