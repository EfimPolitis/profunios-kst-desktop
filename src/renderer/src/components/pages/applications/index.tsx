import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'

import { applicationSortList } from '@shared/constants/sort.constants'

import { EType } from '@shared/types/sort.types'

import { useApplications } from '@shared/hooks/application/useApplications'
import { useDebounce } from '@shared/hooks/useDebounce'

import styles from './index.module.scss'
import { Pagination, Sort } from '@/components/frames'
import { ApplicationTable } from '@/components/frames/tables/application-table/table'
import { Search } from '@/components/ui'

const ApplicationsPage = () => {
  window.api.setTitle('Заявки')

  const [type, setType] = useState<EType>(EType.asc)
  const [sort, setSort] = useState(applicationSortList[0])
  const [page, setPage] = useState(0)
  const [debounceSearch, search, setSearch] = useDebounce('', 500)
  const { data, isFetching, refetch } = useApplications({
    search,
    page,
    sort,
    type
  })

  useEffect(() => {
    refetch()
  }, [debounceSearch, page, sort, type, refetch])

  const applications = data?.data?.items
  const countPage = data?.data?.countPage

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.top}>
          <Search
            placeholder={'Поиск...'}
            value={search}
            setValue={setSearch}
          />
          <Sort
            list={applicationSortList}
            sort={sort}
            setSort={setSort}
            type={type}
            setType={setType}
          />
          <button
            className={styles.getReport}
            title='Скачать отчёт'
          >
            <FileText size={30} />
          </button>
        </div>
        <ApplicationTable
          applications={applications}
          isLoading={isFetching}
        />
      </div>
      <Pagination
        countPage={countPage || 0}
        value={page}
        setValue={setPage}
      />
    </div>
  )
}

export default ApplicationsPage
