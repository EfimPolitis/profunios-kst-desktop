import { useFiltersStore } from '@shared/store/store'
import { Link } from '@tanstack/react-router'
import cn from 'clsx'
import { CalendarPlus, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { newsSortList } from '@shared/constants/sort.constants'

import { URL_PAGES } from '@shared/config/url.config'

import { useGetNews } from '@shared/hooks/news/useGetNews'

import styles from './index.module.scss'
import {
  FilterComponent,
  NewsCard,
  NewsCardSkeleton,
  Pagination,
  Sort
} from '@/components/frames'
import { Search } from '@/components/ui'

const NewsPage = () => {
  window.api.setTitle('Новости')

  const {
    queryParams,
    isFilterUpdated,
    isFilterReset,
    updateQueryParam,
    reset
  } = useFiltersStore()

  const { data, isFetching, refetch } = useGetNews(queryParams, isFilterUpdated)

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  const news = data?.data?.items
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
            placeholder='Поиск...'
            queryParams={queryParams}
            updateQueryParam={updateQueryParam}
            isFilterReset={isFilterReset}
          />
          <Sort
            data={newsSortList}
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
            to={URL_PAGES.CREATE_NEWS}
            className={styles.create_news}
            title='Создать новость'
          >
            <CalendarPlus size={30} />
          </Link>
        </div>
        <FilterComponent
          isOpen={isOpenFilter}
          type='news'
          updateQueryParam={updateQueryParam}
          handleResetFilter={handleResetFilter}
          isFilterReset={isFilterReset}
        />
        <div className={styles.news_block}>
          {isFetching
            ? [...new Array(6)].map((_, i) => <NewsCardSkeleton key={i} />)
            : !!news?.length &&
              news.map(news => (
                <NewsCard
                  key={news.newsId}
                  data={news}
                />
              ))}
        </div>

        {!isFetching && !news?.length && (
          <h3
            className={styles.not_found}
            style={{ position: 'relative', top: '0px' }}
          >
            Новости не были найденны
          </h3>
        )}
      </div>
      {!!countPage && countPage > 1 && (
        <Pagination
          countPage={countPage || 0}
          updateQueryParam={updateQueryParam}
        />
      )}
    </div>
  )
}

export default NewsPage
