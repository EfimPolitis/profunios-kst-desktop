import cn from 'clsx'
import { Check, X } from 'lucide-react'
import { useEffect } from 'react'

import { EStatus, IApplication } from '@shared/types/application.types'

import { useSendStatus } from '@shared/hooks/application/useSendStatus'

import styles from './index.module.scss'
import { Loader } from '@/components/ui'

interface ITableRow {
  application: IApplication
  count: number
}

export const TableRow = ({ application, count }: ITableRow) => {
  const { mutate, isPending, isSuccess } = useSendStatus()
  const sendStatus = (data: { status: string; id: string }) => {
    mutate(data)
  }

  useEffect(() => {}, [isPending, isSuccess])

  return (
    <tr>
      <td>{count + 1}</td>
      <td>{`${application.user.lastName} ${application.user.firstName} ${application.user.middleName}`}</td>
      <td>{application.events.title}</td>
      <td>{EStatus[application.status]}</td>
      <td>{application.ticketsCount}</td>
      <td>{application.createdAt.slice(0, 10)}</td>
      <td>{application.updatedAt.slice(0, 10)}</td>
      {isPending ? (
        <Loader
          size={30}
          style={{ position: 'relative', top: '10px', right: '10px' }}
        />
      ) : (
        application.status === 'PENDING' && (
          <td className={styles.menu}>
            <button
              className={cn(styles.approve, styles.btn)}
              title='Принять'
              onClick={() =>
                sendStatus({ status: 'APPROVED', id: application.id })
              }
            >
              <Check />
            </button>
            <button
              className={cn(styles.reject, styles.btn)}
              title='Отклонить'
              onClick={() =>
                sendStatus({ status: 'REJECTED', id: application.id })
              }
            >
              <X />
            </button>
          </td>
        )
      )}
    </tr>
  )
}

TableRow.displayName = 'applicationTableRow'
