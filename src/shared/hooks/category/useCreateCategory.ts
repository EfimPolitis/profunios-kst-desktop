import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { ICategory } from '@shared/types/category.types'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: createCategory,
    isPending: isCreatePending,
    isSuccess,
    error
  } = useMutation({
    mutationKey: TanStackQueryKey.createCategory,
    mutationFn: (data: ICategory) => window.api.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getCategories
      })
    }
  })

  return { createCategory, isCreatePending, isSuccess, error }
}
