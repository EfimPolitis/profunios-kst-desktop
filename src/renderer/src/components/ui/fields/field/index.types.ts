import type { LucideIcon } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

export interface IFieldProps {
  placeholder?: string
  error?: FieldError
  isPassword?: boolean
  Icon?: LucideIcon
}

export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps
