import cn from 'clsx'
import { Check } from 'lucide-react'
import React from 'react'

import { Loader } from '@/components/ui'

import styles from './index.module.scss'
import { IButton } from './index.types'

export const Button = ({
  isPending,
  isSuccess,
  isLoading,
  isError,
  type,
  text,
  className,
  disabled,
  onClick,
  style,
  isSmall
}: IButton) => {
  return (
    <button
      type={type}
      className={cn(
        isSmall ? styles.small : styles.standart,
        isSuccess && styles.success,
        isError && styles.error,
        styles.btn,
        className
      )}
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
        <p>Произошла ошибка</p>
      ) : (
        text
      )}
    </button>
  )
}
