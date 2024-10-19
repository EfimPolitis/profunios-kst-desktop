import cn from 'clsx'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useOutside } from '@shared/hooks/useOutside'

import styles from './index.module.scss'
import { TypeInputSelectProps } from './index.types'

export const InputSelect = ({
  style,
  className,
  initialValue,
  setState,
  variants,
  Icon,
  ...rest
}: TypeInputSelectProps) => {
  const [value, setValue] = useState(initialValue)
  const { isShow, setIsShow, ref } = useOutside(false)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div
      className={cn(styles.inputSelect, className)}
      ref={ref}
    >
      <div className={styles.input}>
        {Icon && (
          <div className={styles.icon}>
            <Icon />
          </div>
        )}
        <input
          style={style}
          value={value}
          {...rest}
        />
        <div
          className={styles.shevron}
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <ChevronDown /> : <ChevronUp />}
        </div>
      </div>
      {isShow && (
        <div className={styles.menu}>
          <ul>
            {variants.map(item => (
              <li
                onClick={() => {
                  setState(item.value)
                  setValue(item.label)
                  setIsShow(!isShow)
                }}
                key={item.value}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
