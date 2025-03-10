import { useFiltersStore } from '@shared/store/store'

import type { IUser } from '@shared/types/user.types'

import { useDeleteUser } from '@shared/hooks/user/useDeleteUser'

import { UserTableRow } from '../row'

import styles from './index.module.scss'
import { Loader } from '@/components/ui'

interface IUserTable {
  users: IUser[] | undefined
  isLoading: boolean
}

export const UserTable = ({ users, isLoading }: IUserTable) => {
  const { deleteUser, isPending } = useDeleteUser()

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
              deleteUser={deleteUser}
              isPending={isPending}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.info}>
        {isLoading ? (
          <Loader size={30} />
        ) : users?.length ? (
          ''
        ) : (
          <h2 className=''>Пользователи не были найдены</h2>
        )}
      </div>
    </div>
  )
}
