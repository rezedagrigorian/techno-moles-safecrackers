
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { ICardBase, ICard, ICardPort } from '@/types'
import { CardStatus } from '@/types/card'
import { START_CARD_ID } from '@/game-core/constants'
import cardsJson from './cards.json'

function createCard(base: ICardBase): ICard {
  return {
    ...base,
    status: base.id === START_CARD_ID ? CardStatus.Placed : CardStatus.Deck,
    owner: null,
    rotation: false,
  }
}

function buildInitialCards(): Map<string, ICard> {
  return new Map(
    (cardsJson as ICardBase[]).map(base => [base.id, createCard(base)])
  )
}

export const useCardStore = defineStore('cards', () => {
  const cards = ref<Map<string, ICard>>(buildInitialCards())
  const selectedCardId = ref<string | null>(null)

  const cardIds = computed(() => Array.from(cards.value.keys()))
  const playableCardIds = computed(() => cardIds.value.filter(id => id !== START_CARD_ID))

  function getRandomCard(playerId: string): void {
    const deckCards = Array.from(cards.value.values()).filter(card => card.status === CardStatus.Deck)
    if (deckCards.length === 0) return
    const randomCard = deckCards[Math.floor(Math.random() * deckCards.length)]
    if (!randomCard) return
    randomCard.status = CardStatus.Hand
    randomCard.owner = playerId
  }

  function getCardById(id: string): ICard | undefined {
    return cards.value.get(id)
  }

  function selectCard(id: string) {
    selectedCardId.value = id
  }

  function markCardAsPlaced(id: string, playerId: string) {
    if (!playerId.trim()) {
      return
    }
    const card = cards.value.get(id)
    if (card) {
      card.status = CardStatus.Placed
    }
  }

  function clearSelection() {
    selectedCardId.value = null
  }

  function rotateSelectedCard() {
    if (!selectedCardId.value) return
    const card = cards.value.get(selectedCardId.value)
    if (!card) return
  
    cards.value.set(selectedCardId.value, {
      ...card,
      rotation: !card.rotation,
      ports: [card.ports[2], card.ports[3], card.ports[0], card.ports[1]],
    })
  }
  

  function getPortsByCardID(id: string) : (ICardPort | undefined)[] {
    const card = getCardById(id)
    return card ? card.ports : []
  }

  function getOutPortsByCardIDAndPortIndex(id: string, portIndex: number): (ICardPort | undefined)[] | undefined {
    const card = getCardById(id)
    if (!card) return undefined
    const ports = card.ports
  
    const inPort: ICardPort | undefined = ports[portIndex]
    if (!inPort) return undefined

    return ports.map((port, index) => {
      if (port && port.group === inPort.group && index !== portIndex) {
        return port
      }
      return undefined
    })
  }
  
  return {
    cards,
    cardIds,
    playableCardIds,
    selectedCardId,
    getCardById,
    selectCard,
    markCardAsPlaced,
    clearSelection,
    rotateSelectedCard,
    getPortsByCardID,
    getOutPortsByCardIDAndPortIndex,
    getRandomCard,
  }
})
