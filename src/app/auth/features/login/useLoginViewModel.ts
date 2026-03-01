import { reactive, ref, watch } from 'vue'

import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import { authService } from '@/services/auth.service'

import { toast } from 'vue-sonner'

import { schema } from './login.validations'

import type { LoginFormErrors } from './login.types'

export function useLoginViewModel() {
  const router = useRouter()
  const authStore = useAuthStore()

  const form = reactive({
    email: '',
    password: '',
  })

  const errors = ref<LoginFormErrors>({})
  const loading = ref(false)

  watch(
    form,
    () => {
      const result = schema.safeParse(form)

      if (!result.success) {
        errors.value = result.error.flatten().fieldErrors
      } else {
        errors.value = {}
      }
    },
    { deep: true },
  )

  async function login() {
    errors.value = {}

    const result = schema.safeParse(form)

    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors

      return
    }

    try {
      loading.value = true

      const response = await authService.login(result.data)

      authStore.setAuth(response.user, response.token)

      router.replace('/')
    } catch (error) {
      toast.error('Email ou senha inválidos')
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    login,
    loading,
  }
}
