import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import styles from './index.module.scss'

interface IPagination {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  countPage: number
}

export const Pagination = ({ value, setValue, countPage }: IPagination) => {
  const pages = new Array(countPage)
  return (
    <>
      {!!countPage && (
        <div className={styles.pagination}>
          <div className={clsx(styles.icon, styles.item)}>
            <ChevronLeft />
          </div>
          <ul className={styles.pages}>
            {[...pages].map((_, i) => (
              <li
                key={i}
                className={clsx(styles.item, value === i ? styles.active : '')}
                onClick={() => {
                  setValue(i)
                }}
              >
                {i + 1}
              </li>
            ))}
          </ul>
          <div className={clsx(styles.icon, styles.item)}>
            <ChevronRight />
          </div>
        </div>
      )}
    </>
  )
}
