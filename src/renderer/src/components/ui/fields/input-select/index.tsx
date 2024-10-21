import cn from 'clsx'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useOutside } from '@shared/hooks/useOutside'

import styles from './index.module.scss'
import type { TypeInputSelectProps } from './index.types'

export const InputSelect = ({
  initialValue,
  setState,
  data,
  Icon,
  top,
  updateQueryParam,
  queryKey,
  style,
  ...rest
}: TypeInputSelectProps) => {
  const [value, setValue] = useState(initialValue)
  const { isShow, setIsShow, ref } = useOutside(false)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div
      className={cn(styles.inputSelect)}
      ref={ref}
    >
      <div
        className={styles.input}
        style={style}
      >
        {Icon && (
          <div className={styles.icon}>
            <Icon size={30} />
          </div>
        )}
        <input
          value={value}
          readOnly
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
        <div
          className={styles.menu}
          style={{ top: `${top}px` }}
        >
          <ul>
            {data?.map(item => (
              <li
                onClick={() => {
                  if (updateQueryParam && queryKey)
                    updateQueryParam({ key: queryKey, value: item.key })
                  if (setState) setState(item.key)
                  setValue(item.label)
                  setIsShow(!isShow)
                }}
                key={item.key}
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
