import { useFiltersStore } from '@shared/store/store'
import { Link } from '@tanstack/react-router'
import cn from 'clsx'
import { FileText, Filter, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { userSortList } from '@shared/constants/sort.constants'

import { ERole } from '@shared/types/user.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useGetUsers } from '@shared/hooks/user/useGetUsers'
import { useProfile } from '@shared/hooks/user/useProfile'

import styles from './index.module.scss'
import { FilterComponent, Sort } from '@/components/frames'
import { UserTable } from '@/components/frames/tables/user-table/table'
import { Button, Loader, Pagination, Search } from '@/components/ui'

const UsersPage = () => {
  window.api.setTitle('Пользователи')

  const { profile } = useProfile()
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
  const countPage = data?.data?.countPage || 0

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
          {profile?.role === ERole.ADMIN && (
            <>
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
            </>
          )}
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='user'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
          isFilterReset={isFilterReset}
        />
        <UserTable users={users} />
        {isFetching ? (
          <div className={styles.not_found}>
            <Loader size={50} />
          </div>
        ) : (
          !users?.length && (
            <div className={styles.not_found}>
              <h2>Пользователи не были найдены</h2>
              <Button onClick={() => refetch()}>
                <p>Обновить</p>
              </Button>
            </div>
          )
        )}
      </div>
      <Pagination
        updateQueryParam={updateQueryParam}
        countPage={countPage > 1 ? countPage : 0}
      />
    </div>
  )
}

export default UsersPage
