import type { LucideIcon } from 'lucide-react'
import type { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'

import type { IQueryParam } from '@shared/types/query.types'

interface IData {
  key: string
  label: string
}

export interface IFieldProps {
  data?: IData[]
  Icon?: LucideIcon
  setState?: Dispatch<SetStateAction<string>>
  initialValue?: string
  updateQueryParam?: (data: { key: keyof IQueryParam; value: string }) => void
  queryKey?: keyof IQueryParam
  top?: number
}

export type TypeInputSelectProps = InputHTMLAttributes<HTMLInputElement> &
  IFieldProps
