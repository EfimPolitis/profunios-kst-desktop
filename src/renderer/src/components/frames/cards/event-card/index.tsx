import { Link } from '@tanstack/react-router'
import { ArrowRight, Edit2, EyeOff, Trash2 } from 'lucide-react'
import { type FC, useState } from 'react'

import { EStatus, type IEventCard } from '@shared/types/event.types'

import { useDeleteEvent } from '@shared/hooks/event/useDeleteEvent'
import { useProfile } from '@shared/hooks/user/useProfile'

import styles from './index.module.scss'
import { ConfirmPopup } from '@/components/frames'
import { Slider } from '@/components/ui/slider'

export const EventCard: FC<IEventCard> = ({ data }) => {
  const { title, places, categories, date, eventId, images, status, address } =
    data
  const { profile } = useProfile()

  const { mutate: mutateEvent } = useDeleteEvent()

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <>
      {isShow && (
        <ConfirmPopup
          onConfirm={() => {
            mutateEvent(eventId)
            setIsShow(false)
          }}
          onCancel={() => setIsShow(false)}
          message='Вы точно хотите удалить данное мероприятие?'
        />
      )}
      <div className={styles.card}>
        <Link
          className={styles.card_link}
          to={'/events/$eventId'}
          params={{ eventId }}
        />
        {profile?.role === 'ADMIN' || profile?.role === 'MODER' ? (
          <>
            {status === EStatus.INTERNAL && (
              <div className={styles.privateMark}>
                <EyeOff />
              </div>
            )}
            <div className={styles.menu}>
              <Link
                to={'/events/edit/$eventId'}
                params={{ eventId }}
                title='Редактировать'
                className={styles.edit}
              >
                <Edit2 />
              </Link>
              <button
                className={styles.trash}
                title='Удалить'
              >
                <Trash2 onClick={() => setIsShow(true)} />
              </button>
            </div>
          </>
        ) : null}
        <Slider
          images={images}
          height={240}
          style={{ borderRadius: '10px' }}
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
          <p className={styles.row}>
            Дата проведения:{' '}
            <span>
              {new Date(date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </p>
          <p className={styles.row}>
            Время проведения:{' '}
            <span>
              {new Date(date).toLocaleTimeString('ru-RU', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'UTC'
              })}
            </span>
          </p>
          <p className={styles.row}>
            Мест осталось: <span>{places}</span>
          </p>
          <p className={styles.row}>
            Место регистрации:{' '}
            <span style={{ lineHeight: '25px' }}>
              {address.length > 60 ? address.slice(0, 59) + '...' : address}
            </span>
          </p>
          <Link
            to={'/events/$eventId'}
            params={{ eventId }}
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
    </>
  )
}
