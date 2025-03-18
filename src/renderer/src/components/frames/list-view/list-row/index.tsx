import { Trash2 } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'

import type { IResponseCategory } from '@shared/types/category.types'

import { useCategoryDebounce } from '@shared/hooks/category/useCategoryDebounce'
import { useDeleteCategory } from '@shared/hooks/category/useDeleteCategory'

import styles from './index.module.scss'
import { ConfirmPopup } from '@/components/frames'
import { Loader } from '@/components/ui'
import { TransparentField } from '@/components/ui/fields/transparent-field'

interface IListRow {
  category: IResponseCategory
  setCategories: Dispatch<SetStateAction<IResponseCategory[]>>
}

export const ListRow = ({ category, setCategories }: IListRow) => {
  const { deleteCategory, isDeletePanding } = useDeleteCategory()

  const { register, watch } = useForm({
    defaultValues: {
      name: category.name
    }
  })

  //@ts-ignore
  useCategoryDebounce({ id: category?.id, watch })

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <>
      {isShow && (
        <ConfirmPopup
          onConfirm={() => {
            deleteCategory(category.id)

            setIsShow(false)
          }}
          onCancel={() => setIsShow(false)}
          message='Вы точно хотите удалить данную категорию?'
        />
      )}
      <div className={styles.list_row}>
        <TransparentField
          placeholder='Новая категория'
          {...register('name')}
        />
        <div>
          <button
            onClick={() => {
              if (category.id) setIsShow(true)
              else setCategories(prev => prev.slice(0, prev.length - 1))
            }}
            className={styles.trash}
          >
            {isDeletePanding ? <Loader size={24} /> : <Trash2 size={24} />}
          </button>
        </div>
      </div>
    </>
  )
}
