import type { CSSProperties } from 'react'

import type { IQueryParam } from '@shared/types/filter.types'

type TypeFilterName = 'user' | 'event' | 'news' | 'application'

interface IFilterGroup {
  title: string
  type?: 'date' | 'select'
  inputs_block: IFilterInputBlock[]
}

interface IFilterInputBlock {
  label?: string
  type?: 'date' | 'select'
  queryKey: keyof IQueryParam
  options?: IFilterOption
}

interface IFilterOption {
  type?: 'date' | 'time' | 'datetime-local'
  style?: CSSProperties
  data?: IFilterSelectData[]
}

interface IFilterSelectData {
  key: string
  label: string
}

export const FILTER_DATA: Record<TypeFilterName, IFilterGroup[]> = {
  event: [
    {
      title: 'По дате проведения',
      type: 'date',
      inputs_block: [
        {
          label: 'С',
          type: 'date',
          queryKey: 'date_start',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        },
        {
          label: 'По',
          type: 'date',
          queryKey: 'date_end',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        }
      ]
    },
    {
      title: 'По времени проведения',
      type: 'date',
      inputs_block: [
        {
          label: 'С',
          type: 'date',
          queryKey: 'time_start',
          options: {
            type: 'time',
            style: { width: 140 }
          }
        },
        {
          label: 'По',
          type: 'date',
          queryKey: 'time_end',
          options: {
            type: 'time',
            style: { width: 140 }
          }
        }
      ]
    }
  ],
  user: [
    {
      title: 'По дате создания',
      type: 'date',
      inputs_block: [
        {
          label: 'С',
          type: 'date',
          queryKey: 'created_at_start',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        },
        {
          label: 'По',
          type: 'date',
          queryKey: 'created_at_end',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        }
      ]
    },
    {
      title: 'По дате обновления',
      type: 'date',
      inputs_block: [
        {
          label: 'С',
          type: 'date',
          queryKey: 'updated_at_start',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        },
        {
          label: 'По',
          type: 'date',
          queryKey: 'updated_at_end',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        }
      ]
    },
    {
      title: 'По роли пользователя',
      type: 'select',
      inputs_block: [
        {
          type: 'select',
          queryKey: 'role',
          options: {
            style: { width: 220, height: 50, borderWidth: 2 },
            data: [
              { label: 'Все роли', key: '' },
              { label: 'Админ', key: 'admin' },
              { label: 'Модер', key: 'moder' },
              { label: 'Пользователь', key: 'user' }
            ]
          }
        }
      ]
    }
  ],
  application: [
    {
      title: 'По дате создания',
      type: 'date',
      inputs_block: [
        {
          label: 'С',
          type: 'date',
          queryKey: 'created_at_start',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        },
        {
          label: 'По',
          type: 'date',
          queryKey: 'created_at_end',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        }
      ]
    }
  ],
  news: [
    {
      title: 'По дате публикации',
      type: 'date',
      inputs_block: [
        {
          label: 'С',
          type: 'date',
          queryKey: 'created_at_start',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        },
        {
          label: 'По',
          type: 'date',
          queryKey: 'created_at_end',
          options: {
            type: 'date',
            style: { width: 200 }
          }
        }
      ]
    }
  ]
}
