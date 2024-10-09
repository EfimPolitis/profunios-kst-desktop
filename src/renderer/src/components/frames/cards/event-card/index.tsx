import { Link } from '@tanstack/react-router'
import { URL_PAGES } from '@shared/config/url.config'
import { Edit2, Trash2 } from 'lucide-react'
import cn from 'clsx'
import { FC } from 'react'
import { useDeleteEvent } from '@shared/hooks/event/useDeleteEvent'
import { useProfile } from '@shared/hooks/user/useProfile'
import { IEventCard } from '@shared/types/event.types'
import { Slider } from './card-slider'

import styles from './index.module.scss'

export const EventCard: FC<IEventCard> = ({
  ticketsCount,
  isSmall,
  type,
  data
}) => {
  const { title, totalTickets, categories, eventDate, eventId, images } = data
  const { data: user } = useProfile()

  const { mutate: mutateEvent } = useDeleteEvent()

  const onDelete = (eventId: string) => {
    const answer = confirm('Вы точно хотите удалить мероприятие?')
    answer && mutateEvent(eventId)
  }

  return (
    <div className={cn(isSmall ? styles.small : styles.standart, styles.card)}>
      {user?.role === 'ADMIN' || user?.role === 'MODER' ? (
        <div className={styles.menu}>
          <Link
            to={`${URL_PAGES.EDIT_EVENT}/${eventId}`}
            className={styles.edit}
          >
            <Edit2 />
          </Link>
          <Trash2
            className={styles.trash}
            onClick={() => onDelete(eventId)}
          />
        </div>
      ) : null}
      <Slider
        images={images}
        isCard
        style={{ borderRadius: '10px 10px 0px 0px' }}
      />
      <div className={styles.info_block}>
        <p className={styles.title}>
          {title.length > 28 ? title.slice(0, 27) + '...' : title}
        </p>
        <p className={styles.date}>
          Дата проведения: {eventDate.split('T').join(' ')}
        </p>
        {type !== 'link' && !ticketsCount && (
          <p className={styles.total_tickets}>
            Билетов осталось: {totalTickets}
          </p>
        )}
        {ticketsCount && <p>Билетов взято: {ticketsCount}</p>}
        <div className={styles.categories}>
          {categories.map((category, i) => {
            if (i > 2) return

            return (
              <div
                className={styles.category}
                key={category.id}
              >
                {i === 2 ? '...' : category.name}
              </div>
            )
          })}
        </div>
        <Link
          to={`${URL_PAGES.MANAGE_EVENTS}/${eventId}`}
          className={styles.details}
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}