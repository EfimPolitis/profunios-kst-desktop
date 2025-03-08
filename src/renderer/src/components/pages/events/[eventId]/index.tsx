import { useParams } from '@tanstack/react-router'
import { useEffect } from 'react'

import { URL_PAGES } from '@shared/config/url.config'

import { useGetEventById } from '@shared/hooks/event/useGetEventById'
import { useProfile } from '@shared/hooks/user/useProfile'

import styles from './index.module.scss'
import EventPageSkeleton from './index.skeleton'
import { RegisterBlock } from '@/components/frames/event-register-block'
import { UndoBtn } from '@/components/ui'
import { Slider } from '@/components/ui/slider'

export const EventPageId = () => {
  const eventId = useParams({
    from: '/_layout/events/$eventId',
    select: params => params.eventId
  })

  const { data, isPending, isFetching, isLoading, refetch } =
    useGetEventById(eventId)
  const { data: user } = useProfile()

  const event = data?.data
  const userId = user?.data?.userId

  useEffect(() => {
    refetch()
  }, [isPending, isFetching, isLoading])

  window.api.setTitle(`${event?.title}`)

  return (
    <div className={styles.page}>
      {!isPending ? (
        <div className={styles.content}>
          {event ? (
            <>
              <UndoBtn
                link={URL_PAGES.MANAGE_EVENTS}
                size={30}
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '-60px',
                  zIndex: '1'
                }}
              />
              <Slider
                height={500}
                images={event?.images}
                style={{ borderRadius: '10px 10px 0px 0px' }}
              />
              <RegisterBlock
                date={event.date}
                event={event}
                userId={userId}
              />
              <div className={styles.info_block}>
                <div className={styles.categories}>
                  {event.categories.map(category => (
                    <div
                      className={styles.category}
                      key={category.id}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
                {event.places ? (
                  <h3>Колличество оставшихся мест: {event.places}</h3>
                ) : (
                  ''
                )}
                <h2>{event.title}</h2>
                <div className={styles.description}>
                  {event?.description
                    .split('\n')
                    ?.map((label, index) => <p key={index}>{label}</p>)}
                </div>
                <p>Организатор: {event.organizer}</p>
              </div>
            </>
          ) : (
            <p>Кажется что данного мероприятия уже нет...</p>
          )}
        </div>
      ) : (
        <EventPageSkeleton />
      )}
    </div>
  )
}
