import type { CSSProperties } from 'react'

import type { EStatus } from '@shared/types/event.types'

import styles from './index.module.scss'

type TypeInputRadio = {
  variants: { _value: any; label: string }[]
  checked: EStatus
  style?: CSSProperties
  onChange: (...event: any[]) => void
}

export const InputRadio = ({
  variants,
  checked,
  style,
  onChange
}: TypeInputRadio) => {
  console.log(checked)
  return (
    <div
      style={style}
      className={styles.inputsRadioBlock}
    >
      {variants.map(({ _value, label }) => (
        <div
          key={label}
          className={styles.inputRadio}
        >
          <input
            type='radio'
            id={_value}
            name='status'
            checked={_value === checked}
            value={_value}
            onChange={() => onChange(_value)}
          />
          <label htmlFor={_value}>{label}</label>
        </div>
      ))}
    </div>
  )
}
