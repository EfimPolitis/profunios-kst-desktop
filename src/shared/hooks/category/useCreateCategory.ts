import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { ICategory } from '@/types/category.types'

import { categoryService } from '@/services/category.service'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: createCategory,
    isPending: isCreatePending,
    isSuccess,
    error
  } = useMutation({
    mutationKey: TanStackQueryKey.createCategory,
    mutationFn: (data: ICategory) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getCategories
      })
    }
  })

  return { createCategory, isCreatePending, isSuccess, error }
}
