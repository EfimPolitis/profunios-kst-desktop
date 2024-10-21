import useFiltersStore from '@shared/store/store'
import { FileText } from 'lucide-react'
import { useEffect } from 'react'

import { reservationSortList } from '@shared/constants/sort.constants'

import { useGetReservation } from '@shared/hooks/reservation/useGetReservation'

import styles from './index.module.scss'
import { Pagination, Sort } from '@/components/frames'
import { ReservationTable } from '@/components/frames/tables/reservation-table'
import { Search } from '@/components/ui'

const ReservationsPage = () => {
  window.api.setTitle('Бронь')

  const { queryParams, isFilterUpdated, updateQueryParam, reset } =
    useFiltersStore()

  useEffect(() => {
    reset()
  }, [])

  const { data, isFetching, refetch } = useGetReservation(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    refetch()
  }, [queryParams])

  const reservations = data?.data?.items
  const countPage = data?.data?.countPage

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.top}>
          <Search
            placeholder={'Поиск...'}
            updateQueryParam={updateQueryParam}
          />
          <Sort
            data={reservationSortList}
            value={reservationSortList.find(
              value => value.key === queryParams.sort
            )}
            updateQueryParam={updateQueryParam}
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
        updateQueryParam={updateQueryParam}
      />
    </div>
  )
}

export default ReservationsPage
