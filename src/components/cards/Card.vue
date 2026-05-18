<script setup lang="ts">

import { computed } from 'vue'

import type { ICard } from '@/types'
import { useCardStore } from '../../stores/cardStore'

const props = defineProps<{
  cardId: string
}>()

const { getCardById } = useCardStore()
const card = computed<ICard | undefined>(() => getCardById(props.cardId))

const DOOR_COLOR: Record<number, string> = {
  1: 'yellow',
  2: 'violet',
}

const PORT_GROUP_CLASS: Record<number, string> = {
  1: 'bg-red-500',
  2: 'bg-green-500',
  3: 'bg-blue-500',
}

function portGroupClass(group: number): string {
  return PORT_GROUP_CLASS[group] ?? 'bg-neutral-400'
}

const PORT_POSITIONS = [
  'left-[-8px] top-1/2 -translate-y-1/2',      // 0 - слева по центру
  'top-[-8px] left-1/2 -translate-x-1/2',      // 1 - сверху по центру
  'right-[-8px] top-1/2 -translate-y-1/2',     // 2 - справа по центру
  'bottom-[-8px] left-1/2 -translate-x-1/2',   // 3 - снизу по центру
]


</script>

<template>
  <div
    v-if="card"
    role="button"
    tabindex="0"
    class="relative grid h-full w-full cursor-pointer overflow-hidden"
    :class="!card.style.svg && 'rounded border'"
    :style="{
      backgroundColor: card.style.svg ? 'transparent' : (card.isGolden ? 'gold' : 'white'),
      transform: card.rotation ? 'rotate(180deg)' : 'rotate(0deg)',
    }"
  >
    <img
      v-if="card.style.svg"
      :src="`/cards/${card.style.svg}`"
      :alt="card.style.svg"
      class="absolute inset-0 h-full w-full object-contain"
    >
    <img
      v-if="card.style.svg && card.style.goldSvg"
      :src="`/cards/${card.style.goldSvg}`"
      alt=""
      class="pointer-events-none absolute inset-0 h-full w-full object-contain"
    >
    <img
      v-if="card.style.doorSvg"
      :src="`/cards/${card.style.doorSvg}`"
      alt=""
      class="pointer-events-none absolute inset-0 h-full w-full object-contain"
    >
    <template v-if="!card.style.svg">
      <div
        v-for="(port, index) in card.ports"
        :key="card.id + '-' + index"
        class="absolute flex size-5 items-center justify-center"
        :class="PORT_POSITIONS[index]"
      >
        <div
          v-if="port"
          :key="`${card.id}-${index}-g${port.group}`"
          class="flex size-5 flex-col items-center justify-center rounded-sm leading-none"
          :class="portGroupClass(port.group)"
          :style="{
            border: port.isTroll ? '1px dashed black' : 'none',
            boxShadow: port.door ? `0 0 0 3px ${DOOR_COLOR[port.door]}` : 'none',
          }"
        >
          <span class="text-[10px] font-bold text-white">{{ index }}</span>
          <span
            v-if="card.gold?.[port.group] || port.isTroll || port.door"
            class="text-[7px] font-semibold text-white"
          >
            {{ card.gold?.[port.group] ? 'G' : '' }}{{ port.isTroll ? 'T' : '' }}{{ port.door ? 'D' : '' }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
