import type { CSSProperties } from 'react'

import { EStatus } from '@shared/types/event.types'
import type { IQueryParam } from '@shared/types/query.types'
import { ERole } from '@shared/types/user.types'

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
    },
    {
      title: 'По типу мероприятия',
      type: 'select',
      inputs_block: [
        {
          type: 'select',
          queryKey: 'status',
          options: {
            style: { width: 220, height: 50, borderWidth: 2 },
            data: [
              { label: 'Все типы', key: '' },
              { label: 'Публичные', key: EStatus.EVERYONE },
              { label: 'Скрытые', key: EStatus.INTERNAL }
            ]
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
              { label: 'Админ', key: ERole.ADMIN },
              { label: 'Модер', key: ERole.MODER },
              { label: 'Пользователь', key: ERole.USER }
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
