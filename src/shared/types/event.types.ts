import type { IResponseCategory } from './category.types'

export type TypeImage = {
  id: string
  url: string
  name: string
}

export interface IEvent {
  eventId: string
  images: TypeImage[]
  title: string
  description: string
  categories: IResponseCategory[]
  date: string
  organizer: string
  link: string
  totalTickets: number
  createdAt: string
  updatedAt: string
}

export interface IResponseEvents {
  items: IEvent[]
  countPage: number
}

export interface IEventCard {
  ticketsCount?: number
  type: string
  data: IEvent
}

export interface IEventFormData {
  title: string
  description: string
  categoriesId: string[]
  organizer: string
  imagesId: string[]
  date: string
  link?: string
  totalTickets?: number
}
