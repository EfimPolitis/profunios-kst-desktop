import { m } from 'framer-motion'
import React from 'react'

import styles from './index.module.scss'
import { Button } from '@/components/ui'

interface ConfirmPopupProps {
  onCancel: () => void
  onConfirm: () => void
  message: string
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  onCancel,
  onConfirm,
  message
}) => {
  return (
    <m.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <m.div
        className={styles.popup}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className={styles.title}>{message}</h2>
        <div className={styles.buttonContainer}>
          <Button
            text='Подтвердить'
            onClick={onConfirm}
            style={{ height: '50px', fontSize: '18px' }}
          />
          <Button
            text='Отмена'
            onClick={onCancel}
            style={{ height: '50px', fontSize: '18px' }}
          />
        </div>
      </m.div>
    </m.div>
  )
}

export default ConfirmPopup
