import type { EnumSort } from '@shared/constants/sort.constants'

import type { EStatus } from './application.types'
import type { ERole } from './user.types'

export enum EnumOrder {
  ASC = 'asc',
  DESC = 'desc'
}

enum EnumEventType {
  ALL = '',
  TICKET = 'ticket',
  LINK = 'link'
}

export interface IQueryParam {
  sort?: EnumSort
  order?: EnumOrder
  search?: string
  type?: EnumEventType
  role?: ERole
  status?: EStatus
  page?: string | number
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
  key: EnumSort
  value: string
}

export interface ISort {
  data: ISortItem[]
  value: ISortItem | undefined
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
}
