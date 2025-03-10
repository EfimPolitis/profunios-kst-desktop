import { create } from 'zustand'

import type { IBookingStore, IFilterStore } from './store.types'

const initialQuearyParams: Pick<IFilterStore, 'queryParams'> = {
  queryParams: {
    search: '',
    page: 1
  }
}

export const useFiltersStore = create<IFilterStore>(set => ({
  ...initialQuearyParams,
  isFilterUpdated: false,
  isFilterReset: false,

  updateQueryParam: ({ key, value }) => {
    set(state => ({
      queryParams: { ...state.queryParams, [key]: value },
      isFilterUpdated: true,
      isFilterReset: false
    }))
  },

  reset: () =>
    set(() => ({
      ...initialQuearyParams,
      isFilterUpdated: true,
      isFilterReset: true
    }))
}))

export const useBookingStore = create<IBookingStore>(set => ({
  count: 0,

  increment: () => {
    set(state => ({
      count: state.count + 1
    }))
  },

  decrement: () => {
    set(state => ({
      count: state.count === 0 ? state.count : state.count - 1
    }))
  },

  setCount: count => {
    set(() => ({
      count
    }))
  }
}))
