import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { ICategory } from '@shared/types/category.types'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: updateCategory,
    isPending: isUpdatePending,
    error: updateError
  } = useMutation({
    mutationKey: TanStackQueryKey.updateCategory,
    mutationFn: ({ id, data }: { id: string; data: ICategory }) =>
      window.api.updateCategory(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getCategories
      })
    }
  })

  return { updateCategory, isUpdatePending, updateError }
}
