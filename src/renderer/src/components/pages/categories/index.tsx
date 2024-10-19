import { useGetCategories } from '@shared/hooks/category/useGetCategories'

import styles from './index.module.scss'
import { ListRowParent } from '@/components/frames'
import { Loader } from '@/components/ui'

const CategoriesPage = () => {
  window.api.setTitle('Категории')

  const { categories, setCategories, isLoading } = useGetCategories()

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader />
      ) : (
        <ListRowParent
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </div>
  )
}

export default CategoriesPage
