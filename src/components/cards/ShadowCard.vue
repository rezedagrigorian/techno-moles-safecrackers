<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/stores/cardStore'
import Card from './Card.vue'

const cardStore = useCardStore()
const { selectedCardId } = storeToRefs(cardStore)

const selectionX = ref(-1)
const selectionY = ref(-1)

function onMouseMove(event: MouseEvent) {
  selectionX.value = event.clientX
  selectionY.value = event.clientY
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    cardStore.clearSelection()
  }
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div
    v-show="selectionX !== -1 && selectionY !== -1"
    class="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-100"
    :style="{ left: `${selectionX}px`, top: `${selectionY}px` }"
  >
    <Card :card-id="selectedCardId!" />
  </div>
</template>
