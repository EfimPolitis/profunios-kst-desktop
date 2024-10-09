import { InputHTMLAttributes } from 'react'

export interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
  isPending?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  isError?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  text: string
  isSmall?: boolean
}
