import { useGetEvents } from '@shared/hooks/event/useGetEvents'
import styles from './index.module.scss'
import { useDebounce } from '@shared/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { EType } from '@shared/types/sort.types'
import { eventSortList } from '@shared/constants/sort.constants'
import { URL_PAGES } from '@shared/config/url.config'
import { Link } from '@tanstack/react-router'
import { CalendarPlus, FileText } from 'lucide-react'

import { Pagination, Search, Sort } from '@/components/ui'
import { EventCard, EventCardSkeleton } from '@/components/frames'

const EventsPage = () => {
  const [type, setType] = useState<EType>(EType.asc)
  const [sort, setSort] = useState(eventSortList[0])
  const [page, setPage] = useState(0)
  const [debounceSearch, search, setSearch] = useDebounce('', 500)

  const { data, isFetching, refetch } = useGetEvents({
    page,
    search,
    sort,
    type
  })

  useEffect(() => {
    refetch()
  }, [debounceSearch, page, sort, type, refetch])

  const events = data?.data?.items
  const countPage = data?.data?.countPage

  return (
    <div className={styles.event_page}>
      <div>
        <div className={styles.top}>
          <Search
            placeholder='Поиск...'
            value={search}
            setValue={setSearch}
          />
          <Sort
            list={eventSortList}
            sort={sort}
            setSort={setSort}
            type={type}
            setType={setType}
          />
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
          >
            <FileText size={30} />
          </button>
        </div>
        <div className={styles.events_block}>
          {isFetching
            ? [...new Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
            : !!events?.length &&
              events.map(event => (
                <EventCard
                  key={event.eventId}
                  data={event}
                  type={event.link.length > 0 ? 'link' : 'noLink'}
                />
              ))}
        </div>

        {!isFetching && !events?.length && (
          <h3 className={styles.not_found}>Мероприятия не найденны</h3>
        )}
      </div>
      <Pagination
        countPage={countPage || 0}
        value={page}
        setValue={setPage}
      />
    </div>
  )
}

export default EventsPage
