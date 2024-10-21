import {
  type CSSProperties,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  forwardRef
} from 'react'

import styles from './index.module.scss'

interface IDateInput {
  style?: CSSProperties
  type?: 'datetime-local' | 'date' | 'time'
}

type TypeDateInput = IDateInput &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const DateInput = forwardRef<HTMLInputElement, TypeDateInput>(
  ({ style, type, ...rest }, ref) => {
    const initialType = type || 'datetime-local'
    return (
      <input
        className={styles.date_input}
        style={{ ...style }}
        ref={ref}
        type={initialType}
        {...rest}
      />
    )
  }
)

DateInput.displayName = 'dateInput'
