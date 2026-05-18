import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { IPlayer } from '@/types'

function createInitialDuelPlayers(): IPlayer[] {
  return [
    { id: 'player1', name: 'Player 1', avatar: '', gold: 0 },
    { id: 'player2', name: 'Player 2', avatar: '', gold: 0 },
  ]
}

export const usePlayerStore = defineStore('player', () => {
  const players = ref<IPlayer[]>(createInitialDuelPlayers())
  const currentPlayerId = ref<IPlayer['id']>('player1')

  const currentPlayer = computed(() =>
    players.value.find(player => player.id === currentPlayerId.value)
  )

  function addGold(playerId: string, amount: number) {
    const player = players.value.find(p => p.id === playerId)
    if (player) player.gold += amount
  }

  function setGold(playerId: string, amount: number) {
    const player = players.value.find(p => p.id === playerId)
    if (player) player.gold = amount
  }


  return { players, currentPlayerId, currentPlayer, setGold, addGold }
})
