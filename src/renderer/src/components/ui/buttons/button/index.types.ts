import type { InputHTMLAttributes } from 'react'

export interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
  isPending?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  isError?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  isSmall?: boolean
  children: React.ReactNode
}
