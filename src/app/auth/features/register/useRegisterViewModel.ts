import { reactive, ref, watch } from 'vue'

import { useRouter } from 'vue-router'

import { authService } from '@/services/auth.service'

import { toast } from 'vue-sonner'

import { schema } from './register.validations'

import type { RegisterFormErrors } from './register.types'

export function useRegisterViewModel() {
  const router = useRouter()

  const form = reactive({
    name: '',
    email: '',
    password: '',
  })

  const touched = reactive({
    name: false,
    email: false,
    password: false,
  })

  const errors = ref<RegisterFormErrors>({})
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

  async function register() {
    errors.value = {}

    touched.email = true
    touched.password = true
    touched.name = true

    const result = schema.safeParse(form)

    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors

      return
    }

    try {
      loading.value = true

      await authService.register(result.data)

      toast.success('Conta criada com sucesso!')
      router.replace('/')
    } catch (error) {
      toast.error('Erro ao registrar')
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    touched,
    errors,
    register,
    loading,
  }
}
