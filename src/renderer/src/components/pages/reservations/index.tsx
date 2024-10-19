'use client'

import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'

import { reservationSortList } from '@shared/constants/sort.constants'

import { EType } from '@shared/types/sort.types'

import { useGetReservation } from '@shared/hooks/reservation/useGetReservation'
import { useDebounce } from '@shared/hooks/useDebounce'

import styles from './index.module.scss'
import { Pagination, Sort } from '@/components/frames'
import { ReservationTable } from '@/components/frames/tables/reservation-table'
import { Search } from '@/components/ui'

const ReservationsPage = () => {
  window.api.setTitle('Бронь')

  const [type, setType] = useState<EType>(EType.asc)
  const [sort, setSort] = useState(reservationSortList[0])
  const [debounseSearh, search, setSearch] = useDebounce('', 500)
  const [page, setPage] = useState(0)
  const { data, isFetching, refetch } = useGetReservation({
    search,
    page,
    sort,
    type
  })

  useEffect(() => {
    refetch()
  }, [debounseSearh, page, sort, type, refetch])

  const reservations = data?.data?.items
  const countPage = data?.data?.countPage

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.top}>
          <Search
            placeholder={'Поиск...'}
            value={search}
            setValue={setSearch}
          />
          <Sort
            list={reservationSortList}
            sort={sort}
            setSort={setSort}
            type={type}
            setType={setType}
          />
          <button
            className={styles.getReport}
            title='Скачать отчёт'
          >
            <FileText size={30} />
          </button>
        </div>
        <ReservationTable
          reservations={reservations}
          isLoading={isFetching}
        />
      </div>
      <Pagination
        countPage={countPage || 0}
        value={page}
        setValue={setPage}
      />
    </div>
  )
}

export default ReservationsPage
