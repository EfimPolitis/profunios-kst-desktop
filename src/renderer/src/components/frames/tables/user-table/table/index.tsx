import { useFiltersStore } from '@shared/store/store'

import type { IUser } from '@shared/types/user.types'

import { UserTableRow } from '../row'

import styles from './index.module.scss'

interface IUserTable {
  users: IUser[] | undefined
}

export const UserTable = ({ users }: IUserTable) => {
  const countPage = useFiltersStore.getState().queryParams.page

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>Пользователь</td>
            <td>Роль</td>
            <td>ФИО</td>
            <td>Почта</td>
            <td>Создан</td>
            <td>Обновлён</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, count) => (
            <UserTableRow
              key={user.userId}
              user={user}
              count={(countPage - 1) * 10 + count + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
