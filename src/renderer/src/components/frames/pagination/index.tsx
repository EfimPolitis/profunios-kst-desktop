import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { IQueryParam } from '@shared/types/filter.types'

import styles from './index.module.scss'

interface IPagination {
  countPage: number
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
}

export const Pagination = ({ countPage, updateQueryParam }: IPagination) => {
  const [page, setPage] = useState(0)
  const pages = new Array(countPage)

  useEffect(() => {
    updateQueryParam({ key: 'page', value: (page + 1).toString() })
  }, [page])

  return (
    <>
      {!!countPage && (
        <div className={styles.pagination}>
          <div
            className={clsx(styles.icon, styles.item)}
            onClick={() => setPage(prev => prev - 1)}
          >
            <ChevronLeft />
          </div>
          <ul className={styles.pages}>
            {[...pages].map((_, i) => (
              <li
                key={i}
                className={clsx(styles.item, page === i ? styles.active : '')}
                onClick={() => {
                  setPage(i)
                }}
              >
                {i + 1}
              </li>
            ))}
          </ul>
          <div
            className={clsx(styles.icon, styles.item)}
            onClick={() => setPage(prev => prev + 1)}
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </>
  )
}
