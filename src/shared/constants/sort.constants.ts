import type { ISortItem } from '@shared/types/filter.types'

export enum EnumSort {
  ALPHABETIC = 'alphabetic',
  DATE = 'date',
  TICKETS = 'tickets',
  ROLE = 'role',
  STATUS = 'status',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}

export enum EnumUserSort {}

export const eventSortList: ISortItem[] = [
  {
    value: 'По алфавиту',
    key: EnumSort.ALPHABETIC
  },
  {
    value: 'По дате',
    key: EnumSort.DATE
  },
  {
    value: 'По количеству билетов',
    key: EnumSort.TICKETS
  }
]

export const userSortList: ISortItem[] = [
  {
    value: 'По алфавиту',
    key: EnumSort.ALPHABETIC
  },
  {
    value: 'По роли',
    key: EnumSort.ROLE
  },
  {
    value: 'По дате создания',
    key: EnumSort.CREATED_AT
  },
  {
    value: 'По дате обновления',
    key: EnumSort.UPDATED_AT
  }
]

export const reservationSortList: ISortItem[] = [
  {
    value: 'По алфавиту',
    key: EnumSort.ALPHABETIC
  },
  {
    value: 'По кол-ву билетов',
    key: EnumSort.TICKETS
  },
  {
    value: 'По дате создания',
    key: EnumSort.CREATED_AT
  },
  {
    value: 'По дате обновления',
    key: EnumSort.UPDATED_AT
  }
]

export const applicationSortList: ISortItem[] = [
  {
    value: 'По алфавиту',
    key: EnumSort.ALPHABETIC
  },
  {
    value: 'По статусу',
    key: EnumSort.STATUS
  },
  {
    value: 'По кол-ву билетов',
    key: EnumSort.TICKETS
  },
  {
    value: 'По дате создания',
    key: EnumSort.CREATED_AT
  },
  {
    value: 'По дате обновления',
    key: EnumSort.UPDATED_AT
  }
]
