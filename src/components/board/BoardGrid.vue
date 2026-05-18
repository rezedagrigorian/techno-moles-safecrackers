<script setup lang="ts">
import BoardCell from './BoardCell.vue'
import { useGridStore } from '../../stores/gridStore'

const gridStore = useGridStore()
</script>

<template>
  <div class="rounded-lg p-3">
    <div
      class="grid p-4 gap-0 overflow-hidden border border-block-border bg-main-bg"
      :style="{
        gridTemplateColumns: `repeat(${gridStore.grid.size.width}, var(--cell-width))`,
      }"
    >
      <BoardCell
        v-for="cell in gridStore.grid.cells"
        :key="cell.id"
        v-bind="cell"
      />
    </div>
  </div>
</template>
