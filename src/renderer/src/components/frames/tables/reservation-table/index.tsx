import type { IReservation } from '@shared/types/reservation.types'

import styles from './index.module.scss'
import { Loader } from '@/components/ui'

interface IReservationTable {
  reservations: IReservation[] | undefined
  isLoading: boolean
}

export const ReservationTable = ({
  reservations,
  isLoading
}: IReservationTable) => {
  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>Пользователь</td>
            <td>Мероприятие</td>
            <td className={styles.ticketsCount}>Количество билетов</td>
            <td>Забронированно</td>
          </tr>
        </thead>
        <tbody>
          {isLoading ||
            reservations?.map((reservation, i) => (
              <tr key={reservation.id}>
                <td className={styles.count}>{i + 1}</td>
                <td>{reservation.user.userName}</td>
                <td>{reservation.events.title}</td>
                <td className={styles.ticketsCount}>
                  {reservation.ticketsCount}
                </td>
                <td className={styles.date}>
                  {reservation.createdAt.slice(0, 10)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={styles.info}>
        {isLoading ? (
          <Loader size={30} />
        ) : reservations?.length ? (
          ''
        ) : (
          <h2 className=''>Забронированных мероприятий пока нет</h2>
        )}
      </div>
    </div>
  )
}
