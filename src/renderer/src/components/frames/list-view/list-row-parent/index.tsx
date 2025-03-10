import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

import type { IResponseCategory } from '@shared/types/category.types'
import type { IQueryParam } from '@shared/types/query.types'

import { ListAddRowInput } from '../list-add-row-input'
import { ListRow } from '../list-row'

import styles from './index.module.scss'
import { Loader, Search } from '@/components/ui'

interface IListRowParent {
  categories: IResponseCategory[] | undefined
  setCategories: Dispatch<SetStateAction<IResponseCategory[]>>
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
  queryParams: IQueryParam
  isLoading: boolean
}

export const ListRowParent = ({
  categories,
  setCategories,
  updateQueryParam,
  queryParams,
  isLoading
}: IListRowParent) => {
  return (
    <div className={styles.listRowParent}>
      <Search
        placeholder='Поиск'
        updateQueryParam={updateQueryParam}
        queryParams={queryParams}
        style={{ width: '100%' }}
      />
      {!categories?.some(category => !category.id) && (
        <ListAddRowInput setCategories={setCategories} />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.listCategories}>
          {categories?.length ? (
            categories
              ?.map(category => (
                <ListRow
                  key={category.id}
                  category={category}
                  setCategories={setCategories}
                />
              ))
              .reverse()
          ) : (
            <h3
              style={{
                wordWrap: 'break-word',
                color: 'rgba(var(--text-color), 0.6)'
              }}
            >
              По запросу{' '}
              <span
                style={{
                  fontWeight: 'bold',
                  color: 'rgb(var(--text-color))'
                }}
              >
                "{queryParams.search}"
              </span>{' '}
              ничего не найденно
            </h3>
          )}
        </div>
      )}
    </div>
  )
}
