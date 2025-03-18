import { useFiltersStore } from '@shared/store/store'
import { useEffect } from 'react'

import { useGetCategories } from '@shared/hooks/category/useGetCategories'

import styles from './index.module.scss'
import { ListRowParent } from '@/components/frames'

const CategoriesPage = () => {
  window.api.setTitle('Категории')

  const { updateQueryParam, queryParams, isFilterUpdated, reset } =
    useFiltersStore()

  const { categories, setCategories, isLoading, refetch } = useGetCategories(
    queryParams,
    isFilterUpdated
  )

  console.log(categories)

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    refetch()
  }, [queryParams])

  return (
    <div className={styles.page}>
      <ListRowParent
        categories={categories}
        refetch={refetch}
        setCategories={setCategories}
        queryParams={queryParams}
        updateQueryParam={updateQueryParam}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CategoriesPage
