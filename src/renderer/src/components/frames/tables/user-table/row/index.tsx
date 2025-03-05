import type { UseMutateFunction } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { AxiosResponse } from 'axios'
import cn from 'clsx'
import { Edit2, Trash2 } from 'lucide-react'

import { roles } from '@shared/constants/roles.constants'

import type { IUser } from '@shared/types/user.types'

import { URL_PAGES } from '@shared/config/url.config'

import styles from './index.module.scss'
import { Loader } from '@/components/ui'

interface ITableField {
  user: IUser
  count: number
  deleteUser: UseMutateFunction<AxiosResponse<any, any>, Error, number, unknown>
  isPending: boolean
}

export const UserTableRow = ({
  user,
  count,
  deleteUser,
  isPending
}: ITableField) => {
  const navigate = useNavigate()

  return (
    <tr>
      <td className={styles.count}>{count + 1}</td>
      <td>{user.userName}</td>
      <td>{roles[user.role]}</td>
      <td>{`${user.lastName} ${user.firstName}`}</td>
      <td>{user.email}</td>
      <td className={styles.date}>{user.createdAt.slice(0, 10)}</td>
      <td className={styles.date}>{user.updatedAt.slice(0, 10)}</td>
      {isPending ? (
        <Loader
          size={30}
          style={{ position: 'relative', top: '10px', right: '10px' }}
        />
      ) : (
        <td className={styles.menu}>
          <button
            className={cn(styles.btn, styles.edit)}
            title='Редактировать'
            onClick={() =>
              navigate({ to: `${URL_PAGES.EDIT_USER}/${user.userId}` })
            }
          >
            <Edit2 />
          </button>
          <button
            className={cn(styles.btn, styles.trash)}
            title='Удалить'
            onClick={() =>
              confirm('Вы действительно хотите удалить пользователя?') &&
              deleteUser(user.userId)
            }
          >
            <Trash2 />
          </button>
        </td>
      )}
    </tr>
  )
}
