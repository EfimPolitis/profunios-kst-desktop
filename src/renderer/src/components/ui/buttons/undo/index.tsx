import { Link } from '@tanstack/react-router'
import { Undo2 } from 'lucide-react'
import { CSSProperties } from 'react'

import styles from './index.module.scss'

interface IUndoBtn {
  link: string
  style?: CSSProperties
  size?: number
}

export const UndoBtn = ({ link, style, size }: IUndoBtn) => {
  return (
    <Link
      to={link}
      className={styles.undo_btn}
      style={style}
    >
      <Undo2 size={size} />
    </Link>
  )
}
