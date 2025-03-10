import type { IResponseCategory } from './category.types'

export enum EStatus {
  INTERNAL = 'INTERNAL',
  EVERYONE = 'EVERYONE'
}

export type TypeImage = {
  id: string
  url: string
  name: string
}

export interface IEvent {
  eventId: string
  images: TypeImage[]
  categories: IResponseCategory[]
  title: string
  description: string
  date: string
  organizer: string
  link: string
  status: EStatus
  places: number
  createdAt: string
  updatedAt: string
}

export interface IResponseEvents {
  items: IEvent[]
  countPage: number
}

export interface IEventCard {
  places?: number
  data: IEvent
}

export interface IEventFormData {
  title: string
  description: string
  imagesId: string[]
  categoriesId: string[]
  organizer: string
  date: string
  link?: string
  places?: number
  status: EStatus
}
