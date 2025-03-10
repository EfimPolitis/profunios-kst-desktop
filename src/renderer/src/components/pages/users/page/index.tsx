import { useFiltersStore } from '@shared/store/store'
import { Link } from '@tanstack/react-router'
import cn from 'clsx'
import { FileText, Filter, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { userSortList } from '@shared/constants/sort.constants'

import { URL_PAGES } from '@shared/config/url.config'

import { useGetUsers } from '@shared/hooks/user/useGetUsers'

import styles from './index.module.scss'
import { FilterComponent, Pagination, Sort } from '@/components/frames'
import { UserTable } from '@/components/frames/tables/user-table/table'
import { Search } from '@/components/ui'

const UsersPage = () => {
  window.api.setTitle('Пользователи')

  const {
    queryParams,
    isFilterUpdated,
    isFilterReset,
    updateQueryParam,
    reset
  } = useFiltersStore()
  const { data, isFetching, refetch } = useGetUsers(
    queryParams,
    isFilterUpdated
  )

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const users = data?.data?.items
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
            queryParams={queryParams}
            isFilterReset={isFilterReset}
          />
          <Sort
            data={userSortList}
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            isFilterReset={isFilterReset}
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
          <Link
            to={URL_PAGES.CREATE_USER}
            className={styles.create_user}
            title='Создать пользователя'
          >
            <UserPlus size={30} />
          </Link>
          <button
            className={styles.getReport}
            title='Скачать отчёт'
            onClick={() => window.api.getReport('user')}
          >
            <FileText size={30} />
          </button>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='user'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
          isFilterReset={isFilterReset}
        />
        <UserTable
          users={users}
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

export default UsersPage
