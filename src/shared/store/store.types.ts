import type { IQueryParam } from '@shared/types/query.types'

export interface IFilterStore {
  queryParams: IQueryParam
  isFilterUpdated: boolean
  isFilterReset: boolean
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
  reset: () => void
}

export interface IBookingStore {
  count: number
  increment: () => void
  decrement: () => void
  setCount: (count: number) => void
}
