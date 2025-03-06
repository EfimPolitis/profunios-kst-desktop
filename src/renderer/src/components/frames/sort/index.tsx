import cn from 'clsx'
import { ArrowDownUp, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import { EnumOrder, type ISort } from '@shared/types/filter.types'

import { useOutside } from '@shared/hooks/useOutside'

import styles from './index.module.scss'

export const Sort = ({ data, value, updateQueryParam }: ISort) => {
  const { isShow, setIsShow, ref } = useOutside(false)

  const [order, setOrder] = useState(EnumOrder.ASC)

  return (
    <div
      className={styles.sort}
      ref={ref}
    >
      <div className={styles.sort_field}>
        Сортировка:
        <div
          className={styles.selected}
          onClick={() => setIsShow(!isShow)}
        >
          <span>{value?.value}</span>
          {isShow ? (
            <ChevronDown className={styles.icon} />
          ) : (
            <ChevronUp className={styles.icon} />
          )}
        </div>
        <button
          className={cn(
            styles.order,
            order === EnumOrder.DESC && styles.active
          )}
          onClick={() => {
            setOrder(order === EnumOrder.ASC ? EnumOrder.DESC : EnumOrder.ASC)
            updateQueryParam({ key: 'order', value: order })
          }}
          title={
            order === EnumOrder.ASC
              ? 'В порядке убывания'
              : 'В порядке возрастания'
          }
        >
          <ArrowDownUp size={24} />
        </button>
      </div>
      {isShow && (
        <div className={styles.menu}>
          <ul>
            {data.map(item => (
              <li
                onClick={() => {
                  updateQueryParam({ key: 'sort', value: item.key })
                  setIsShow(!isShow)
                }}
                key={item.key}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
