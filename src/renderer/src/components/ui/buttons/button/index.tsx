import cn from 'clsx'
import { Check, X } from 'lucide-react'

import styles from './index.module.scss'
import type { IButton } from './index.types'
import { Loader } from '@/components/ui'

export const Button = ({
  children,
  isPending,
  isSuccess,
  isLoading,
  isError,
  type,
  className,
  disabled,
  onClick,
  style
}: IButton) => {
  return (
    <button
      type={type}
      className={cn(styles.btn, className, {
        [styles.success]: isSuccess,
        [styles.error]: isError
      })}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {isLoading || isPending ? (
        <Loader />
      ) : isSuccess ? (
        <p>
          Успешно
          <Check />
        </p>
      ) : isError ? (
        <p>
          Ошибка
          <X />
        </p>
      ) : (
        children
      )}
    </button>
  )
}
