import debounce from 'debounce'
import { useCallback, useEffect, useMemo } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { ICategory } from '@/types/category.types'

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
    debounce((formData: TypeCategoryFormState) => {
      createCategory(formData as ICategory)
    }, 2000),
    [createCategory]
  )

  const debouncedUpdateCategory = useCallback(
    debounce((formData: TypeCategoryFormState) => {
      updateCategory({ id, formData } as { id: string; formData: ICategory })
    }, 500),
    [updateCategory, id]
  )

  useEffect(() => {
    const subscription = watch(formData => {
      if (id) {
        debouncedUpdateCategory({
          ...formData,
          color: formData.color || undefined
        })
      } else {
        debouncedCreateCategory(formData)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watchValue, debouncedCreateCategory, debouncedUpdateCategory, id, watch])
}
