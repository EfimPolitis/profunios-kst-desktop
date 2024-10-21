import { create } from 'zustand'

import type { IStore } from './store.types'

const initialQuearyParams: Pick<IStore, 'queryParams'> = {
  queryParams: {
    search: '',
    page: 1,
    date_start: '',
    date_end: '',
    time_start: '',
    time_end: ''
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
