import { type IApplication } from '@shared/types/application.types'

import styles from './index.module.scss'

interface ITableRow {
  application: IApplication
  count: number
}

export const TableRow = ({ application, count }: ITableRow) => {
  return (
    <tr className={styles.tr}>
      <td className={styles.count}>{count + 1}</td>
      <td>{`${application.user.lastName} ${application.user.firstName}`}</td>
      <td>{application.events.title}</td>
      <td className={styles.places}>{application.places}</td>
      <td>{application.createdAt}</td>
    </tr>
  )
}

TableRow.displayName = 'applicationTableRow'
