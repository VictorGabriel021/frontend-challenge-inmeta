import { reactive, ref, watch } from 'vue'

import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import { authService } from '@/services/auth.service'

import { toast } from 'vue-sonner'

import { schema } from './register.validations'

export function useRegisterViewModel() {
  const router = useRouter()
  const authStore = useAuthStore()

  const form = reactive({
    name: '',
    email: '',
    password: '',
  })
  const errors = ref<Record<string, string[]>>({})
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

    const result = schema.safeParse(form)

    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors
      return
    }

    try {
      loading.value = true

      const response = await authService.register(result.data)

      authStore.setAuth(response.user, response.token)

      toast.success('Conta criada com sucesso!')
      router.replace('/')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao registrar')
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    register,
    loading,
  }
}
