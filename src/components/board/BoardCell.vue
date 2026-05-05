<script setup lang="ts">
import type { IGridCell } from '@/types'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useCardStore } from '@/stores/cardStore'
import { useGridStore } from '@/stores/gridStore'
import { usePlayerStore } from '@/stores/playerStore'

import Card from '../cards/Card.vue'

const props = defineProps<IGridCell>()

const { assignCardToCell } = useGridStore()
const cardStore = useCardStore()
const { currentPlayerId } = storeToRefs(usePlayerStore())

const isPlaceable = computed(() => !props.card && !!cardStore.selectedCardId)

function handleClick() {
  if (props.card || !cardStore.selectedCardId) { return }
  assignCardToCell(props.id, cardStore.selectedCardId, currentPlayerId.value)
}
</script>

<template>
  <button
    type="button"
    class="card-size min-w-0 overflow-hidden border-r border-b border-cell-border bg-board-surface transition-colors"
    :class="isPlaceable && 'hover:bg-cell-hover hover:ring-2 hover:ring-inset hover:ring-cyan-500'"
    @click="handleClick"
  >
    <Card
      v-if="card"
      :card-id="card"
    />
  </button>
</template>
