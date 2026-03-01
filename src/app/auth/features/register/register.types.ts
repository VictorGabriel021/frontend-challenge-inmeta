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
export type RegisterFormErrors = Partial<Record<keyof RegisterForm, string[]>>

export type ResponseRegisterForm = {
  userId: string
}
