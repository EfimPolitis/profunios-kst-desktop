import { Link } from '@tanstack/react-router'
import { FileText, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { userSortList } from '@shared/constants/sort.constants'

import { EType } from '@shared/types/sort.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useDebounce } from '@shared/hooks/useDebounce'
import { useGetUsers } from '@shared/hooks/user/useGetUsers'

import styles from './index.module.scss'
import { Pagination, Sort } from '@/components/frames'
import { UserTable } from '@/components/frames/tables/user-table/table'
import { Search } from '@/components/ui'

const UsersPage = () => {
  window.api.setTitle('Пользователи')

  const [type, setType] = useState<EType>(EType.asc)
  const [sort, setSort] = useState(userSortList[0])
  const [debounceSearch, search, setSearch] = useDebounce('', 500)
  const [page, setPage] = useState(0)
  const { data, isFetching, refetch } = useGetUsers({
    search,
    page,
    sort,
    type
  })

  useEffect(() => {
    refetch()
  }, [debounceSearch, page, sort, type, refetch])

  const users = data?.data?.items
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
            list={userSortList}
            sort={sort}
            setSort={setSort}
            type={type}
            setType={setType}
          />
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
          >
            <FileText size={30} />
          </button>
        </div>
        <UserTable
          users={users}
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

export default UsersPage
