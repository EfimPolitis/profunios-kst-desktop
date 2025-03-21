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
  Sort
} from '@/components/frames'
import { Button, Loader, Pagination, Search } from '@/components/ui'

const EventsPage = () => {
  window.api.setTitle('Мероприятия')

  const {
    queryParams,
    isFilterUpdated,
    isFilterReset,
    updateQueryParam,
    reset
  } = useFiltersStore()

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
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            isFilterReset={isFilterReset}
          />
          <Sort
            data={eventSortList}
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            isFilterReset={isFilterReset}
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
          isFilterReset={isFilterReset}
        />
        <div className={styles.events_block}>
          {isFetching
            ? [...new Array(12)].map((_, i) => <EventCardSkeleton key={i} />)
            : !!events?.length &&
              events.map(event => (
                <EventCard
                  key={event.eventId}
                  data={event}
                />
              ))}
        </div>
        {isFetching ? (
          <div className={styles.not_found}>
            <Loader size={50} />
          </div>
        ) : (
          !!events?.length || (
            <div className={styles.not_found}>
              <h2>Мероприятия не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )
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
