import { LucideIcon } from 'lucide-react'
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'

interface IVariant {
  label: string
  value: string
}

export interface IFieldProps {
  variants: IVariant[]
  Icon?: LucideIcon
  setState: Dispatch<SetStateAction<string>>
  initialValue: string
}

export type TypeInputSelectProps = InputHTMLAttributes<HTMLInputElement> &
  IFieldProps
