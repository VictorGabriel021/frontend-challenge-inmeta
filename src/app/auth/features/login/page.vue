<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useLoginViewModel } from './useLoginViewModel'

import FormField from '@/components/ui/form/FormField.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import Input from '@/components/ui/input/Input.vue'
import PasswordInput from '@/components/ui/input/PasswordInput.vue'
import Button from '@/components/ui/button/Button.vue'

import { Mail } from 'lucide-vue-next'

const router = useRouter()
const { form, errors, login, loading } = useLoginViewModel()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div
      class="w-full max-w-md p-8 rounded-xl shadow-md border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))]"
    >
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

      <form @submit.prevent="login" class="space-y-4">
        <FormField :error="errors.email?.[0]">
          <FormLabel>Email</FormLabel>
          <Input
            v-model="form.email"
            type="email"
            placeholder="Digite seu email"
            :error="!!errors.email"
          >
            <template #prefix>
              <Mail class="w-4 h-4 text-[rgb(var(--color-foreground))]" /> </template
          ></Input>
        </FormField>

        <FormField :error="errors.password?.[0]">
          <FormLabel>Senha</FormLabel>
          <PasswordInput
            v-model="form.password"
            placeholder="Digite sua senha"
            :error="!!errors.password"
          />
        </FormField>

        <Button class="w-full" :disabled="loading" @click="login">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </Button>

        <p class="text-sm text-center mt-4 text-muted-foreground">
          Não tem conta?
          <span
            class="text-primary cursor-pointer hover:underline"
            @click="router.push('/register')"
          >
            Criar conta
          </span>
        </p>
      </form>
    </div>
  </div>
</template>
