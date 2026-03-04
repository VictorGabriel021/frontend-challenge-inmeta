<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'

import type { useMarketplaceViewModel } from '../trades/useMarketplaceViewModel'

const { open, tradeId, vm } = defineProps<{
  open: boolean
  tradeId: string
  vm: ReturnType<typeof useMarketplaceViewModel>
}>()
const emit = defineEmits(['update:open'])

const { deleteTrade } = vm

async function handleDelete() {
  await deleteTrade(tradeId)
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent
      class="w-100 h-50 flex items-center flex-col"
      @update:open="emit('update:open', $event)"
    >
      <h2 class="text-xl font-semibold mb-4">Você deseja deletar esta solicitação de troca?</h2>

      <div class="flex gap-2 mt-6">
        <Button
          variant="destructive"
          :disabled="vm.state.loading"
          :loading="vm.state.loading"
          @click="emit('update:open', false)"
        >
          Cancelar
        </Button>

        <Button :disabled="vm.state.loading" :loading="vm.state.loading" @click="handleDelete">
          Deletar
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
