import { useFiltersStore } from '@shared/store/store'

import type { IApplication } from '@shared/types/application.types'

import { TableRow } from '../row'

import styles from './index.module.scss'

interface IApplicationTable {
  applications: IApplication[] | undefined
}

export const ApplicationTable = ({ applications }: IApplicationTable) => {
  const countPage = useFiltersStore.getState().queryParams.page

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>ФИО</td>
            <td>Мероприятие</td>
            <td className={styles.places}>Зарезервированных мест</td>
            <td>Зарегестрировано</td>
          </tr>
        </thead>
        <tbody>
          {!!applications?.length &&
            applications?.map((application, count) => (
              <TableRow
                application={application}
                key={application.id}
                count={(countPage - 1) * 10 + (count + 1)}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}
