import { IEvent } from './event.types'
import { IUser } from './user.types'

export interface IApplication {
  id: string
  user: IUser
  events: IEvent
  ticketsCount: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  updatedAt: string
}

export interface IResponeApplications {
  items: IApplication[]
  countPage: number
}

export interface IApplicationData {
  userId: string
  eventId: string
  ticketsCount: number
}

export enum EStatus {
  PENDING = 'В ожидании',
  APPROVED = 'Принято',
  REJECTED = 'Отклонено'
}
