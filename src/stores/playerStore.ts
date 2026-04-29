import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { IPlayer } from '@/types'

function createInitialDuelPlayers(): IPlayer[] {
  return [
    { id: 'player1', name: 'Player 1', avatar: '' },
    { id: 'player2', name: 'Player 2', avatar: '' },
  ]
}

export const usePlayerStore = defineStore('player', () => {
  const players = ref<IPlayer[]>(createInitialDuelPlayers())
  const currentPlayerId = ref<IPlayer['id']>('player1')

  const currentPlayer = computed(() =>
    players.value.find(player => player.id === currentPlayerId.value)
  )

  return { players, currentPlayerId, currentPlayer }
})
