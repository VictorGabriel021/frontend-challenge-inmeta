import http from '@/core/http/axios'

import type { LoginForm, ResponseLoginForm } from '@/app/auth/domains/login/login.types'
import type { RegisterForm, ResponseRegisterForm } from '@/app/auth/domains/register/register.types'

export const authService = {
  async login(payload: LoginForm): Promise<ResponseLoginForm> {
    const { data } = await http.post('/login', payload)
    return data
  },

  async register(payload: RegisterForm): Promise<ResponseRegisterForm> {
    const { data } = await http.post('/register', payload)
    return data
  },
}
