import cn from 'clsx'
import { m } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import styles from './index.module.scss'
import { DateInput, InputSelect } from '@/components/ui'

export const EventFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState('')

  return (
    <div className={styles.filter}>
      <button
        className={styles.btn}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Фильтрация</span>
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </button>
      <m.div
        className={cn(styles.menu, {
          [styles.hidden]: !isOpen
        })}
        animate={{ height: isOpen ? 'min-content' : '0px' }}
        transition={{
          type: 'tween'
        }}
      >
        <div className={styles.fields}>
          <section className={styles.date_section}>
            <h5>По дате проведения</h5>
            <div className={styles.input_block}>
              <span>С</span>
              <DateInput type='date' />
            </div>
            <div className={styles.input_block}>
              <span>По</span>
              <DateInput type='date' />
            </div>
          </section>
          <section className={styles.type_section}>
            <h5>Тип мероприятия</h5>
            <InputSelect
              initialValue='Все'
              variants={[
                { label: 'Все', value: '' },
                { label: 'Ссылка', value: 'link' },
                { label: 'Билеты', value: 'ticket' }
              ]}
              setState={setType}
              style={{
                width: 220,
                paddingLeft: 10,
                borderWidth: 2,
                borderRadius: 8
              }}
            />
          </section>
        </div>
      </m.div>
    </div>
  )
}
