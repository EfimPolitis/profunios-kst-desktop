import type { IEvent } from '@shared/types/event.types'

import styles from './index.module.scss'
import { Button } from '@/components/ui'

interface IRegisterBlock {
  date: string
  event: IEvent
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  isPending: boolean
  isSuccess: boolean
  isError: boolean
}

export const RegisterBlock = ({
  date,
  event,
  setIsShow,
  isError,
  isPending,
  isSuccess
}: IRegisterBlock) => {
  const { places } = event

  return (
    <div className={styles.event_card}>
      <div className={styles.top}>
        <div className={styles.event_date}>
          <div className={styles.date_day}>{new Date(date).getDate()}</div>
          <div className={styles.date_month}>
            {new Date(date).toLocaleDateString('ru-RU', {
              month: 'long'
            })}
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
              month: 'long',
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
        onClick={() => setIsShow(true)}
        className={styles.button}
        isPending={isPending}
        isError={isError}
        isSuccess={isSuccess}
        disabled={places === 0}
        style={{ width: '200px', fontSize: '20px' }}
      >
        {places === 0 ? 'Больше нет мест на мероприятие' : 'Хочу учавствовать'}
      </Button>
    </div>
  )
}
