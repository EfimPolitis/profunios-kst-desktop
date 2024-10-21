import type { IQueryParam } from '@shared/types/filter.types'

export interface IStore {
  queryParams: IQueryParam
  isFilterUpdated: boolean
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
  reset: () => void
}
