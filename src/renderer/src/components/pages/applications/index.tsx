import { useFiltersStore } from '@shared/store/store'
import cn from 'clsx'
import { FileText, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { applicationSortList } from '@shared/constants/sort.constants'

import { useApplications } from '@shared/hooks/application/useApplications'

import styles from './index.module.scss'
import { FilterComponent, Sort } from '@/components/frames'
import { ApplicationTable } from '@/components/frames/tables/application-table/table'
import { Button, Loader, Pagination, Search } from '@/components/ui'

const ApplicationsPage = () => {
  window.api.setTitle('Заявки')

  const {
    queryParams,
    isFilterUpdated,
    isFilterReset,
    updateQueryParam,
    reset
  } = useFiltersStore()

  const { data, isFetching, refetch } = useApplications(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const applications = data?.data?.items
  const countPage = data?.data?.countPage

  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const handleResetFilter = () => {
    reset()
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <Search
            updateQueryParam={updateQueryParam}
            queryParams={queryParams}
            placeholder={'Поиск...'}
          />
          <Sort
            isFilterReset={isFilterReset}
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            data={applicationSortList}
          />
          <button
            className={cn(styles.filter, {
              [styles.active]: isOpenFilter
            })}
            title={isOpenFilter ? 'Закрыть фильтры' : 'Открыть фильтры'}
            onClick={() => setIsOpenFilter(!isOpenFilter)}
          >
            <Filter size={30} />
          </button>
          <button
            className={styles.getReport}
            title='Скачать отчёт по заявокам'
            onClick={() => window.api.getReport('application')}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='application'
          handleResetFilter={handleResetFilter}
          isFilterReset={isFilterReset}
          updateQueryParam={updateQueryParam}
        />
        <ApplicationTable applications={applications} />
        {isFetching ? (
          <div className={styles.not_found}>
            <Loader size={50} />
          </div>
        ) : (
          !applications?.length && (
            <div className={styles.not_found}>
              <h2>Заявки на мероприятия не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )
        )}
      </div>
      <Pagination
        updateQueryParam={updateQueryParam}
        countPage={countPage || 0}
      />
    </div>
  )
}

export default ApplicationsPage
