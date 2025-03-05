import cn from 'clsx'
import { Check, X } from 'lucide-react'
import { useEffect } from 'react'

import { type IApplication } from '@shared/types/application.types'

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
    <tr className={styles.tr}>
      <td className={styles.count}>{count + 1}</td>
      <td>{`${application.user.lastName} ${application.user.firstName}`}</td>
      <td>{application.events.title}</td>
      <td className={styles.places}>{application.places}</td>
      <td>{application.createdAt.slice(0, 19).replace('T', ' ')}</td>
    </tr>
  )
}

TableRow.displayName = 'applicationTableRow'
