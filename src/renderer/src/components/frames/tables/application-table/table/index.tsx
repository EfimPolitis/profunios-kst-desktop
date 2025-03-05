import type { IApplication } from '@shared/types/application.types'

import { TableRow } from '../row'

import styles from './index.module.scss'
import { Loader } from '@/components/ui'

interface IApplicationTable {
  applications: IApplication[] | undefined
  isLoading: boolean
}

export const ApplicationTable = ({
  applications,
  isLoading
}: IApplicationTable) => {
  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>ФИО</td>
            <td>Мероприятие</td>
            <td className={styles.places}>Зарезервированных мест</td>
            <td>Создан</td>
          </tr>
        </thead>
        <tbody>
          {isLoading ||
            applications?.map((application, count) => (
              <TableRow
                application={application}
                key={application.id}
                count={count}
              />
            ))}
        </tbody>
      </table>
      <div className={styles.info}>
        {isLoading ? (
          <Loader size={30} />
        ) : applications?.length ? (
          ''
        ) : (
          <h2 className=''>Заявки на мероприятия не были найдены</h2>
        )}
      </div>
    </div>
  )
}
