import {
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef
} from 'react'

import { useFormatDate } from '@shared/hooks/useFormatDate'

import styles from './index.module.scss'

interface IDateInput {
  style?: CSSProperties
}

type TypeDateInput = IDateInput &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const DateInput = forwardRef<HTMLInputElement, TypeDateInput>(
  ({ style, ...rest }, ref) => {
    const min = useFormatDate(new Date())
    const max = useFormatDate(
      new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
    )

    return (
      <input
        className={styles.date_input}
        style={style}
        ref={ref}
        type='datetime-local'
        min={min}
        max={max}
        {...rest}
      />
    )
  }
)

DateInput.displayName = 'dateInput'
