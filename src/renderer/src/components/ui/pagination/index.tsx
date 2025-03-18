import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { IQueryParam } from '@shared/types/query.types'

import styles from './index.module.scss'

interface IPagination {
  countPage: number
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
}

export const Pagination = ({ countPage, updateQueryParam }: IPagination) => {
  const [page, setPage] = useState(0)

  useEffect(() => {
    updateQueryParam({ key: 'page', value: (page + 1).toString() })
  }, [page])

  const handlePageClick = (i: number) => {
    setPage(i)
  }

  const renderPages = () => {
    let pages: JSX.Element[] = []

    if (countPage <= 8) {
      return Array.from({ length: countPage }, (_, i) => (
        <li
          key={i}
          className={clsx(
            styles.item,
            styles.btn,
            page === i ? styles.active : ''
          )}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </li>
      ))
    } else {
      pages.push(
        <li
          key={0}
          className={clsx(
            styles.item,
            styles.btn,
            page === 0 ? styles.active : ''
          )}
          onClick={() => handlePageClick(0)}
        >
          1
        </li>
      )

      if (page > 3) {
        pages.push(
          <li
            key='dots-start'
            className={styles.space}
          ></li>
        )
      }

      let start = Math.max(1, page - 2)
      let end = Math.min(countPage - 2, page + 2)

      for (let i = start; i <= end; i++) {
        pages.push(
          <li
            key={i}
            className={clsx(
              styles.item,
              styles.btn,
              page === i ? styles.active : ''
            )}
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </li>
        )
      }

      if (page < countPage - 4) {
        pages.push(
          <li
            key='dots-end'
            className={styles.space}
          ></li>
        )
      }

      pages.push(
        <li
          key={countPage - 1}
          className={clsx(
            styles.item,
            styles.btn,
            page === countPage - 1 ? styles.active : ''
          )}
          onClick={() => handlePageClick(countPage - 1)}
        >
          {countPage}
        </li>
      )
    }

    return pages
  }

  return (
    <>
      {!!countPage && (
        <div className={styles.pagination}>
          <div
            className={clsx(styles.icon, styles.item, {
              [styles.disabled]: page === 0,
              [styles.btn]: page !== 0
            })}
            onClick={() => page > 0 && setPage(prev => prev - 1)}
          >
            <ChevronLeft />
          </div>
          <ul className={styles.pages}>{renderPages()}</ul>
          <div
            className={clsx(styles.icon, styles.item, {
              [styles.disabled]: page === countPage - 1,
              [styles.btn]: page !== countPage - 1
            })}
            onClick={() => page < countPage - 1 && setPage(prev => prev + 1)}
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </>
  )
}
