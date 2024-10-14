import { CSSProperties, Dispatch, SetStateAction, memo } from 'react'

import styles from './index.module.scss'

type TypeInputRadio = {
  setState: Dispatch<SetStateAction<string>>
  variants: { value: any; label: string }[]
  checked: string
  style?: CSSProperties
}

export const InputRadio = ({
  setState,
  variants,
  checked,
  style
}: TypeInputRadio) => {
  return (
    <div
      style={style}
      className={styles.inputsRadioBlock}
    >
      {variants.map(({ value, label }) => (
        <div
          key={value}
          className={styles.inputRadio}
        >
          <input
            type='radio'
            id={value}
            name='type'
            defaultChecked={value === checked}
            onClick={() => setState(value)}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
    </div>
  )
}
