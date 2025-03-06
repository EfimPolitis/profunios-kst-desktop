import type { IEvent } from './event.types'
import type { IUser } from './user.types'

export interface IApplication {
  id: string
  user: IUser
  events: IEvent
  places: number
  createdAt: string
}

export interface IResponeApplications {
  items: IApplication[]
  countPage: number
}

export interface IApplicationData {
  userId: string
  eventId: string
  places: number
}
