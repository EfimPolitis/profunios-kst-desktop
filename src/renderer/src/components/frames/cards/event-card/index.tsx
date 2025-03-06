import { Link } from '@tanstack/react-router'
import { ArrowRight, Edit2, Trash2 } from 'lucide-react'
import type { FC } from 'react'

import type { IEventCard } from '@shared/types/event.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useDeleteEvent } from '@shared/hooks/event/useDeleteEvent'
import { useProfile } from '@shared/hooks/user/useProfile'

import { Slider } from '@/components/ui/slider'

import styles from './index.module.scss'

export const EventCard: FC<IEventCard> = ({ data }) => {
  const { title, places, categories, date, eventId, images } = data
  const { data: user } = useProfile()

  const { mutate: mutateEvent } = useDeleteEvent()

  const onDelete = (eventId: string) => {
    const answer = confirm('Вы точно хотите удалить мероприятие?')
    answer && mutateEvent(eventId)
  }

  return (
    <div className={styles.card}>
      <Link
        className={styles.card_link}
        to={'/events/$eventId'}
        params={{eventId}}
      />
      {user?.role === 'ADMIN' || user?.role === 'MODER' ? (
        <div className={styles.menu}>
          <Link
            to={'/events/edit/$eventId'}
            params={{eventId}}
            title='Редактировать'
            className={styles.edit}
          >
            <Edit2 />
          </Link>
          <button
            className={styles.trash}
            title='Удалить'
          >
            <Trash2 onClick={() => onDelete(eventId)} />
          </button>
        </div>
      ) : null}
      <Slider
        images={images}
        height={240}
        style={{ borderRadius: '10px 10px 0px 0px' }}
      />
      <div className={styles.info_block}>
        <p
          className={styles.title}
          title={title}
        >
          {title.length > 30 ? title.slice(0, 30) + '...' : title}
        </p>
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
        <p className={styles.date}>
          Дата проведения:{' '}
          <span>
            {new Date(date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </p>
        <p className={styles.date}>
          Время проведения:{' '}
          <span>
            {new Date(date).toLocaleTimeString('ru-RU', {
              hour: 'numeric',
              minute: 'numeric'
            })}
          </span>
        </p>
        <p className={styles.places}>
          Мест осталось: <span>{places}</span>
        </p>

        <Link
          to={'/events/$eventId'}
          params={{eventId}}
          className={styles.details}
        >
          Подробнее
          <ArrowRight
            size={20}
            className={styles.arrow}
          />
        </Link>
      </div>
    </div>
  )
}
