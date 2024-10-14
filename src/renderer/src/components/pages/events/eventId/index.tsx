import { useParams } from '@tanstack/react-router'

import { URL_PAGES } from '@shared/config/url.config'

import { useGetEventById } from '@shared/hooks/event/useGetEventById'
import { useProfile } from '@shared/hooks/user/useProfile'

import styles from './index.module.scss'
import EventPageSkeleton from './index.skeleton'
import { Slider } from '@/components/frames/cards/event-card/card-slider'
import { RegisterBlock } from '@/components/frames/event-register-block'
import { UndoBtn } from '@/components/ui'

export const EventPage = () => {
  window.api.setTitle('Мероприятие')

  const eventId = useParams({
    from: '/_layout/event/$eventId',
    select: params => params.eventId
  })

  const { data, isPending } = useGetEventById(eventId)
  const { data: user } = useProfile()

  const event = data?.data
  const userId = user?.userId

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
                date={event.eventDate}
                event={event}
                userId={userId}
                type={event.link ? 'link' : 'btn'}
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
                {event.totalTickets ? (
                  <h3>Колличество билетов: {event.totalTickets}</h3>
                ) : (
                  ''
                )}
                <h2>{event.title}</h2>
                <div className={styles.description}>
                  {event?.description
                    .split('\n')
                    // .filter(item => item !== '')
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
