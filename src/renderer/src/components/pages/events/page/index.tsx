import { useFiltersStore } from '@shared/store/store'
import { Link } from '@tanstack/react-router'
import cn from 'clsx'
import { CalendarPlus, FileText, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { eventSortList } from '@shared/constants/sort.constants'

import { URL_PAGES } from '@shared/config/url.config'

import { useGetEvents } from '@shared/hooks/event/useGetEvents'

import styles from './index.module.scss'
import {
  EventCard,
  EventCardSkeleton,
  FilterComponent,
  Pagination,
  Sort
} from '@/components/frames'
import { Search } from '@/components/ui'

const EventsPage = () => {
  window.api.setTitle('Мероприятия')

  const { queryParams, isFilterUpdated, updateQueryParam, reset } =
    useFiltersStore()

  const { data, isFetching, refetch } = useGetEvents(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const events = data?.data?.items
  const countPage = data?.data?.countPage

  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const handleResetFilter = () => {
    reset()
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <Search
            placeholder='Поиск...'
            updateQueryParam={updateQueryParam}
          />
          <Sort
            data={eventSortList}
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
          />
          <button
            className={cn(styles.filter, {
              [styles.active]: isOpenFilter
            })}
            title={isOpenFilter ? 'Закрыть фильтры' : 'Открыть фильтры'}
            onClick={() => setIsOpenFilter(!isOpenFilter)}
          >
            <Filter size={30} />
          </button>
          <Link
            to={URL_PAGES.CREATE_EVENT}
            className={styles.create_event}
            title='Новое мероприятие'
          >
            <CalendarPlus size={30} />
          </Link>
          <button
            className={styles.getReport}
            title='Скачать отчёт'
            onClick={() => window.api.getReport('event')}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='event'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
        />
        <div className={styles.events_block}>
          {isFetching
            ? [...new Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
            : !!events?.length &&
              events.map(event => (
                <EventCard
                  key={event.eventId}
                  data={event}
                />
              ))}
        </div>

        {!isFetching && !events?.length && (
          <h3 className={styles.not_found}>Мероприятия не найденны</h3>
        )}
      </div>
      <Pagination
        countPage={countPage || 0}
        updateQueryParam={updateQueryParam}
      />
    </div>
  )
}

export default EventsPage
