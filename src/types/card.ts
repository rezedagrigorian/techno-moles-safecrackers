import type { PlayerColor } from './player'
export interface ICardPort {
  group: number
  isTroll?: boolean
  isGold?: boolean
  door?: PlayerColor
}

export type ICardRotation = boolean

/** Ровно четыре порта: по одному на каждую сторону карты. */
export type ICardPorts = [ICardPort?, ICardPort?, ICardPort?, ICardPort?]

export enum CardStatus {
  Deck = 'deck',
  Hand = 'hand',
  Placed = 'placed',
}

export interface ICardBase {
  id: string
  ports: ICardPorts
  isGolden: boolean
  svg?: string
  goldSvg?: string
  doorSvg?: string
  goldAmount?: number
}

export interface ICard extends ICardBase {
  status: CardStatus
  owner: string | null
  rotation: ICardRotation
}
