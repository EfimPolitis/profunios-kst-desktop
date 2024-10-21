import debounce from 'debounce'
import { useCallback, useEffect } from 'react'
import type { UseFormWatch } from 'react-hook-form'

import type { ICategory } from '@shared/types/category.types'

import { useCreateCategory } from './useCreateCategory'
import { useUpdateCategory } from './useUpdateCategory'

type TypeCategoryFormState = Partial<Omit<ICategory, '' | 'id'>>

interface IUseCategoryDebounce {
  watch: UseFormWatch<TypeCategoryFormState>
  id: string
}

export const useCategoryDebounce = ({ watch, id }: IUseCategoryDebounce) => {
  const { createCategory } = useCreateCategory()
  const { updateCategory } = useUpdateCategory()

  const watchValue = watch()

  const debouncedCreateCategory = useCallback(
    debounce((data: TypeCategoryFormState) => {
      createCategory(data as ICategory)
    }, 2000),
    [createCategory]
  )

  const debouncedUpdateCategory = useCallback(
    debounce((data: TypeCategoryFormState) => {
      updateCategory({ data, id } as { data: ICategory; id: string })
    }, 500),
    [updateCategory, id]
  )

  useEffect(() => {
    const subscription = watch(data => {
      if (id) {
        debouncedUpdateCategory({
          ...data
        })
      } else {
        debouncedCreateCategory(data)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watchValue, debouncedCreateCategory, debouncedUpdateCategory, id, watch])
}
