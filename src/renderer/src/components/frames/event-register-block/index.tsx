import { Link } from '@tanstack/react-router'

import type { IEvent } from '@shared/types/event.types'

import { useCreateApplication } from '@shared/hooks/application/useCreateApplication'

import styles from './index.module.scss'
import { Button } from '@/components/ui'

interface IRegisterBlock {
  date: string
  event: IEvent
  userId: string | undefined
}

export const RegisterBlock = ({ date, event, userId }: IRegisterBlock) => {
  const { places } = event

  const {
    mutate: mutateApplication,
    isPending,
    isSuccess,
    isError,
    reset
  } = useCreateApplication()

  const onClickBtn = (eventId: string, userId: string | undefined) => {
    if (!userId) return

    const takePlaces = 1

    if (!takePlaces) return

    if (places < Number(takePlaces))
      return alert('Вы не можете забронировать мест больше чем есть в наличии!')

    const responseData = { eventId, userId, places: takePlaces }

    mutateApplication(responseData)
  }

  if (isSuccess || isError) setTimeout(() => reset(), 1500)

  return (
    <div className={styles.event_card}>
      <div className={styles.top}>
        <div className={styles.event_date}>
          <div className={styles.date_day}>{new Date(date).getDate()}</div>
          <div className={styles.date_month}>
            {new Date(date)
              .toLocaleDateString('ru-RU', {
                month: 'short'
              })
              .slice(0, -1)}
          </div>
        </div>
        <div className={styles.event_details}>
          <div className={styles.event_day}>
            {new Date(date)
              .toLocaleDateString('ru-RU', {
                weekday: 'short'
              })
              .toUpperCase()}
          </div>
          <div className={styles.event_date_full}>
            {new Date(date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
          <div className={styles.event_time}>
            {new Date(date).toLocaleTimeString('ru-RU', {
              hour: 'numeric',
              minute: 'numeric'
            })}{' '}
            МСК
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <Button
        text={
          places === 0 ? 'Мест на мероприятие больше нет' : 'Хочу учавствовать'
        }
        onClick={() => onClickBtn(event?.eventId, userId)}
        className={styles.button}
        isPending={isPending}
        isError={isError}
        isSuccess={isSuccess}
        disabled={places === 0}
        style={{ width: '200px', fontSize: '20px' }}
      />
    </div>
  )
}
