<script setup lang="ts">
import { useRegisterViewModel } from '@/app/auth/features/register/useRegisterViewModel'

import Button from '@/components/ui/button/Button.vue'

import Input from '@/components/ui/input/Input.vue'
import PasswordInput from '@/components/ui/input/PasswordInput.vue'

import { useRouter } from 'vue-router'
import FormField from '@/components/ui/form/FormField.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import { Mail, User } from 'lucide-vue-next'

defineOptions({ name: 'RegisterPage' })

const router = useRouter()
const { form, touched, errors, register, loading } = useRegisterViewModel()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div
      class="w-full max-w-md border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-8 rounded-xl shadow-lg"
    >
      <h1 class="text-2xl font-bold text-center mb-6">Criar Conta</h1>

      <form @submit.prevent="register" class="space-y-4">
        <FormField :error="touched.name ? errors.name?.[0] : ''">
          <FormLabel>Nome</FormLabel>
          <Input
            v-model="form.name"
            placeholder="Digite seu nome"
            :error="!!errors.name && touched.name"
            @focus="touched.name = true"
          >
            <template #prefix>
              <User class="w-4 h-4 text-[rgb(var(--color-foreground))]" /> </template
          ></Input>
        </FormField>

        <FormField :error="touched.email ? errors.email?.[0] : ''">
          <FormLabel>Email</FormLabel>
          <Input
            v-model="form.email"
            type="email"
            placeholder="Digite seu email"
            :error="!!errors.email && touched.email"
            autocomplete="current-email"
            @focus="touched.email = true"
          >
            <template #prefix>
              <Mail class="w-4 h-4 text-[rgb(var(--color-foreground))]" /> </template
          ></Input>
        </FormField>

        <FormField :error="touched.password ? errors.password?.[0] : ''">
          <FormLabel>Senha</FormLabel>
          <PasswordInput
            v-model="form.password"
            placeholder="Digite sua senha"
            :error="!!errors.password && touched.password"
            autocomplete="new-password"
            @focus="touched.password = true"
          />
        </FormField>

        <Button :disabled="loading" :loading="loading" class="w-full">
          {{ loading ? 'Criando...' : 'Criar Conta' }}
        </Button>

        <p class="text-sm text-center mt-4 text-muted-foreground">
          Já tem conta?
          <span class="text-primary cursor-pointer hover:underline" @click="router.push('/login')">
            Voltar para login
          </span>
        </p>

        <p class="text-sm text-center mt-4 text-muted-foreground hover:underline">
          <router-link to="/">Ir para o Marketplace</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
