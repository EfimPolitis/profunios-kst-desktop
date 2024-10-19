import { IEvent } from './event.types'
import { IUser } from './user.types'

export interface IReservation {
  id: string
  user: IUser
  events: IEvent
  ticketsCount: number
  createdAt: string
}

export interface IResponseReservations {
  items: IReservation[]
  countPage: number
}
