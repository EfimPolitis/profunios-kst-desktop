import type { IEvent } from './event.types'
import type { IUser } from './user.types'

export interface IApplication {
  id: string
  user: Pick<IUser, 'firstName' | 'lastName' | 'middleName'>
  event: Pick<IEvent, 'title'>
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
