import { useBookingStore } from '@shared/store/store'
import { motion } from 'framer-motion'
import React from 'react'

import styles from './index.module.scss'
import { Button, Field } from '@/components/ui'

interface BookingPopupProps {
  onClose: () => void
  onConfirm: () => void
}

const BookingPopup: React.FC<BookingPopupProps> = ({ onClose, onConfirm }) => {
  const { count, setCount, increment, decrement } = useBookingStore()

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.popup}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className={styles.title}>Сколько мест хотите забронировать?</h2>
        <div className={styles.cardContainer}>
          <Button
            text='-'
            onClick={decrement}
            style={{ fontSize: '30px' }}
          />
          <Field
            type='number'
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            style={{
              paddingLeft: '0',
              paddingRight: '0',
              textAlign: 'center',
              width: '120px'
            }}
          />
          <Button
            text='+'
            onClick={increment}
            style={{ fontSize: '30px' }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            text='Отмена'
            onClick={onClose}
            style={{ height: '50px', fontSize: '18px' }}
          />
          <Button
            text='Подтвердить'
            onClick={() => onConfirm()}
            style={{ height: '50px', fontSize: '18px' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BookingPopup
