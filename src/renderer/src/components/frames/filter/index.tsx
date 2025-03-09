import cn from 'clsx'
import { m } from 'framer-motion'

import type { IQueryParam } from '@shared/types/query.types'

import { FILTER_DATA } from './filter.data'
import styles from './index.module.scss'
import { Button, DateInput, InputSelect } from '@/components/ui'

interface IFilters {
  isOpen: boolean
  type: 'event' | 'user' | 'application' | 'news'
  handleResetFilter: () => void
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
}

export const FilterComponent = ({
  isOpen,
  type,
  handleResetFilter,
  updateQueryParam
}: IFilters) => {
  return (
    <div className={styles.filter}>
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
          {FILTER_DATA[type]?.map(({ title, type, inputs_block }) => (
            <section
              key={title}
              className={cn({
                [styles.date_section]: type === 'date',
                [styles.type_section]: type === 'select'
              })}
            >
              <h5>{title}</h5>
              {inputs_block.map(input => (
                <div
                  className={styles.input_block}
                  key={input.queryKey}
                >
                  {input.type === 'date' && (
                    <>
                      <span>{input?.label}</span>
                      <DateInput
                        type={input?.options?.type}
                        style={input?.options?.style}
                        onChange={event =>
                          updateQueryParam({
                            key: input.queryKey,
                            value: event.target.value
                          })
                        }
                      />
                    </>
                  )}
                  {input.type === 'select' && (
                    <InputSelect
                      data={input?.options?.data}
                      initialValue={input?.options?.data?.[0]?.label}
                      updateQueryParam={updateQueryParam}
                      queryKey={input?.queryKey}
                      style={input?.options?.style}
                      top={55}
                    />
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
        <Button
          text='Сбросить фильтры'
          onClick={handleResetFilter}
          className={styles.resetBtn}
        />
      </m.div>
    </div>
  )
}
