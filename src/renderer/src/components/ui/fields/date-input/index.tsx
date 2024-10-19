import {
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef
} from 'react'

import styles from './index.module.scss'

interface IDateInput {
  style?: CSSProperties
  type?: 'datetime-local' | 'date'
}

type TypeDateInput = IDateInput &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const DateInput = forwardRef<HTMLInputElement, TypeDateInput>(
  ({ style, type, ...rest }, ref) => {
    const initialType = type || 'datetime-local'
    return (
      <input
        className={styles.date_input}
        style={{ ...style, width: initialType === 'date' ? '200px' : '260px' }}
        ref={ref}
        type={initialType}
        {...rest}
      />
    )
  }
)

DateInput.displayName = 'dateInput'
