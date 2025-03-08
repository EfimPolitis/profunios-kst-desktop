import { create } from 'zustand'

import { EnumOrder } from '@shared/types/filter.types'

import type { IStore } from './store.types'

const initialQuearyParams: Pick<IStore, 'queryParams'> = {
  queryParams: {
    search: '',
    page: 1,
    order: EnumOrder.ASC
  }
}

const useFiltersStore = create<IStore>(set => ({
  ...initialQuearyParams,
  isFilterUpdated: false,

  updateQueryParam: ({ key, value }) => {
    set(state => ({
      queryParams: { ...state.queryParams, [key]: value },
      isFilterUpdated: true
    }))
  },

  reset: () => set(() => ({ ...initialQuearyParams, isFilterUpdated: true }))
}))

export default useFiltersStore
