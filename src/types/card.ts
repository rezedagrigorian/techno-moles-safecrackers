import type { PlayerColor } from './player'



export interface ICardPort {
  group: number

  isTroll?: boolean
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

export interface ICardBaseStyle {
  svg?: string
  goldSvg?: string
  doorSvg?: string
}

export enum CardAction {
  BreakFlashlight = 'break_flashlight',
  FixFlashlight = 'fix_flashlight',
  BreakWagon = 'break_wagon',
  FixWagon = 'fix_wagon',
}

// card can have ports or card can have action, but not both at the same time
export interface ICardBase {
  id: string
  ports: ICardPorts
  action: CardAction | null

  // gold is a mapping from group number to gold amount, if any
  gold?: Record<number, number>

  isGolden: boolean
  style: ICardBaseStyle
}

export interface ICard extends ICardBase {
  status: CardStatus
  owner: string | null
  rotation: ICardRotation
}
