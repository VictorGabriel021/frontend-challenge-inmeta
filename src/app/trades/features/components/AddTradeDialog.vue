<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import Button from '@/components/ui/button/Button.vue'

import type { useMarketplaceViewModel } from '../trades/useMarketplaceViewModel'
import SelectableCardGrid from './SelectableCardGrid.vue'

const props = defineProps<{
  open: boolean
  vm: ReturnType<typeof useMarketplaceViewModel>
}>()

const emit = defineEmits(['update:open'])

const selectedOffering = ref<string | null>(null)
const selectedReceiving = ref<string | null>(null)

const canCreate = computed(() => {
  return selectedOffering.value && selectedReceiving.value && !props.vm.state.creating
})

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      selectedOffering.value = null
      selectedReceiving.value = null

      await props.vm.fetchMyCards()
      await props.vm.fetchSystemCards()
    }
  },
)

function close() {
  emit('update:open', false)
}

async function handleCreate() {
  if (!selectedOffering.value || !selectedReceiving.value) return

  await props.vm.createTrade(selectedOffering.value, selectedReceiving.value)

  close()
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent
      class="bg-[rgb(var(--color-card))] w-250 max-h-[90vh] overflow-auto rounded-xl p-6 relative"
      @update:open="emit('update:open', $event)"
    >
      <h2 class="text-xl font-bold mb-6">Criar Solicitação de Troca</h2>

      <SelectableCardGrid
        title="Selecione sua carta"
        :loading="vm.state.loadingMyCards"
        :cards="vm.state.myCards"
        :selected="selectedOffering"
        @select="selectedOffering = $event"
      />

      <SelectableCardGrid
        title="Selecione carta desejada"
        :loading="vm.state.loadingSystem"
        :cards="vm.state.systemCards"
        :selected="selectedReceiving"
        @select="selectedReceiving = $event"
      />

      <div v-if="vm.state.systemMore" class="flex justify-center mb-8">
        <Button
          variant="outline"
          @click="vm.loadMoreSystemCards"
          :disabled="vm.state.loadingSystemMore"
          class="flex items-center gap-2"
          :loading="vm.state.loadingSystemMore"
        >
          {{ vm.state.loadingSystemMore ? 'Carregando...' : 'Carregar mais' }}
        </Button>
      </div>

      <Button
        class="w-full py-3 flex items-center justify-center gap-2"
        :disabled="!canCreate"
        :loading="vm.state.creating"
        @click="handleCreate"
      >
        {{ vm.state.creating ? 'Criando...' : 'Criar Troca' }}
      </Button>
    </DialogContent>
  </Dialog>
</template>
