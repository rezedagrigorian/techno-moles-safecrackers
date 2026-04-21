import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { IUser } from '@/types'

function createInitialDuelUsers(): IUser[] {
  return [
    { id: 'player1', name: 'Player 1', avatar: '' },
    { id: 'player2', name: 'Player 2', avatar: '' },
  ]
}

export const useUserStore = defineStore('user', () => {
  const users = ref<IUser[]>(createInitialDuelUsers())
  const currentUserId = ref<IUser['id']>('player1')

  const currentUser = computed(() =>
    users.value.find(user => user.id === currentUserId.value)
  )

  return { users, currentUserId, currentUser }
})