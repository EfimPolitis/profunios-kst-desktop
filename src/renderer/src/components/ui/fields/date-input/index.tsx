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

//"2025-03-21T17:16"
//"2025-03-20T17:00:00.000Z"

DateInput.displayName = 'dateInput'
