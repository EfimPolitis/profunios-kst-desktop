import cn from 'clsx'
import { type TextareaHTMLAttributes, forwardRef } from 'react'

import styles from './index.module.scss'

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...rest }, ref) => {
  return (
    <textarea
      className={cn(className, styles.textarea)}
      autoComplete='none'
      ref={ref}
      {...rest}
    />
  )
})

TextArea.displayName = 'textarea'
