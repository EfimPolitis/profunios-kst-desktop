import { useFiltersStore } from '@shared/store/store'
import cn from 'clsx'
import { ArrowDownUp, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import type {
  EApplicationSort,
  EEventSort,
  ENewsSort,
  EUserSort,
  ISort,
  ISortItem
} from '@shared/types/query.types'

import { useOutside } from '@shared/hooks/useOutside'

import styles from './index.module.scss'

enum EnumOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export const Sort = ({
  data,
  queryParams,
  updateQueryParam,
  isFilterReset
}: ISort) => {
  const { isShow, setIsShow, ref } = useOutside(false)

  const [order, setOrder] = useState<EnumOrder>(EnumOrder.DESC)
  const [sort, setSort] = useState<
    EUserSort | EEventSort | ENewsSort | EApplicationSort
  >()
  const [current, setCurrent] = useState<ISortItem | undefined>(
    data.find(value => value.keys[order] === queryParams?.sort)
  )

  useEffect(() => {
    if (!sort) return

    updateQueryParam({
      key: 'sort',
      value: sort
    })
  }, [order, sort, current])

  useEffect(() => {
    if (isFilterReset) {
      setOrder(EnumOrder.DESC)
      setSort(undefined)
      setCurrent(undefined)
    }
  }, [isFilterReset])

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
          <span>{current?.message}</span>
          {isShow ? (
            <ChevronDown className={styles.icon} />
          ) : (
            <ChevronUp className={styles.icon} />
          )}
        </div>
        <button
          className={cn(styles.order, order === EnumOrder.ASC && styles.active)}
          onClick={() => {
            setOrder(order === EnumOrder.DESC ? EnumOrder.ASC : EnumOrder.DESC)
            setSort(
              order === EnumOrder.DESC ? current?.keys.asc : current?.keys.desc
            )
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
                  setSort(
                    order === EnumOrder.DESC ? item.keys.desc : item.keys.asc
                  )
                  setCurrent(item)
                  setIsShow(!isShow)
                }}
                key={order === EnumOrder.DESC ? item.keys.desc : item.keys.asc}
              >
                {item.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
