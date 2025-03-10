import { EStatus } from './event.types'
import type { ERole } from './user.types'

export enum EUserSort {
  ALPHABETIC_ASC = '1',
  ALPHABETIC_DESC = '2',
  CREATED_AT_ASC = '3',
  CREATED_AT_DESC = '4',
  UPDATED_AT_ASC = '5',
  UPDATED_AT_DESC = '6'
}

export enum EEventSort {
  ALPHABETIC_ASC = '1',
  ALPHABETIC_DESC = '2',
  PLACES_ASC = '3',
  PLACES_DESC = '4',
  DATE_ASC = '5',
  DATE_DESC = '6'
}

export enum ENewsSort {
  ALPHABETIC_ASC = '1',
  ALPHABETIC_DESC = '2',
  VIEWS_ASC = '3',
  VIEWS_DESC = '4',
  CREATED_AT_ASC = '5',
  CREATED_AT_DESC = '6'
}

export enum EApplicationSort {
  PLACES_ASK = '1',
  PLACES_DESC = '2',
  CREATED_AT_ASC = '3',
  CREATED_AT_DESC = '4'
}

export interface IQueryParam {
  sort?: EUserSort | EEventSort | ENewsSort | EApplicationSort
  search?: string
  role?: ERole
  status?: EStatus
  page: number
  date_start?: string
  date_end?: string
  time_start?: string
  time_end?: string
  created_at_start?: string
  created_at_end?: string
  updated_at_start?: string
  updated_at_end?: string
}

export interface ISortItem {
  message: string
  keys: {
    asc: EUserSort | EEventSort | ENewsSort | EApplicationSort
    desc: EUserSort | EEventSort | ENewsSort | EApplicationSort
  }
}

export interface ISort {
  data: ISortItem[]
  queryParams: IQueryParam | undefined
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
  isFilterReset: boolean
}
