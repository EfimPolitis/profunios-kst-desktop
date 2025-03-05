import type { ISortItem } from '@shared/types/filter.types'

export enum EnumSort {
  ALPHABETIC = 'alphabetic',
  DATE = 'date',
  PLACES = 'places',
  VIEWS = 'views',
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
    value: 'По дате проведения',
    key: EnumSort.DATE
  },
  {
    value: 'По количеству мест',
    key: EnumSort.PLACES
  }
]

export const newsSortList: ISortItem[] = [
  {
    value: 'По дате публикации',
    key: EnumSort.DATE
  },
  {
    value: 'По количеству просмотров',
    key: EnumSort.VIEWS
  },
  {
    value: 'По алфавиту',
    key: EnumSort.ALPHABETIC
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

export const applicationSortList: ISortItem[] = [
  {
    value: 'По алфавиту',
    key: EnumSort.ALPHABETIC
  },
  {
    value: 'По кол-ву мест',
    key: EnumSort.PLACES
  },
  {
    value: 'По дате создания',
    key: EnumSort.CREATED_AT
  }
]
