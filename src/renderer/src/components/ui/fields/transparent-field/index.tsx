import cn from 'clsx'
import { type InputHTMLAttributes, forwardRef } from 'react'

import styles from './index.module.scss'

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<
  HTMLInputElement,
  TypeTransparentField
>(({ className, ...rest }, ref) => {
  return (
    <input
      className={cn(styles.transparent_field, className)}
      ref={ref}
      {...rest}
    />
  )
})

TransparentField.displayName = 'TransparentField'
