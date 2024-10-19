import type { Dispatch, SetStateAction } from 'react'

import type { IResponseCategory } from '@shared/types/category.types'

import { ListAddRowInput } from '../list-add-row-input'
import { ListRow } from '../list-row'

import styles from './index.module.scss'

interface IListRowParent {
  categories: IResponseCategory[] | undefined
  setCategories: Dispatch<SetStateAction<IResponseCategory[]>>
}

export const ListRowParent = ({
  categories,
  setCategories
}: IListRowParent) => {
  return (
    <div className={styles.listRowParent}>
      {categories?.length ? (
        categories?.map(category => (
          <ListRow
            key={category.id}
            category={category}
            setCategories={setCategories}
          />
        ))
      ) : (
        <h1>Здесь пока нет категорий</h1>
      )}
      {!categories?.some(category => !category.id) && (
        <ListAddRowInput setCategories={setCategories} />
      )}
    </div>
  )
}
