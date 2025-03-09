import { useFiltersStore } from '@shared/store/store'
import cn from 'clsx'
import { FileText, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { applicationSortList } from '@shared/constants/sort.constants'

import { useApplications } from '@shared/hooks/application/useApplications'

import styles from './index.module.scss'
import { FilterComponent, Pagination, Sort } from '@/components/frames'
import { ApplicationTable } from '@/components/frames/tables/application-table/table'
import { Search } from '@/components/ui'

const ApplicationsPage = () => {
  window.api.setTitle('Заявки')

  const { queryParams, isFilterUpdated, updateQueryParam, reset } =
    useFiltersStore()

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
            placeholder={'Поиск...'}
            updateQueryParam={updateQueryParam}
          />
          <Sort
            data={applicationSortList}
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
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
            title='Скачать отчёт'
            onClick={() => window.api.getReport('application')}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='application'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
        />
        <ApplicationTable
          applications={applications}
          isLoading={isFetching}
        />
      </div>
      <Pagination
        countPage={countPage || 0}
        updateQueryParam={updateQueryParam}
      />
    </div>
  )
}

export default ApplicationsPage
