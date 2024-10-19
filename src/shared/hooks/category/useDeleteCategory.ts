import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteCategory,
    isPending: isDeletePanding,
    error: deleteError
  } = useMutation({
    mutationKey: TanStackQueryKey.deleteCategory,
    mutationFn: (id: string) => window.api.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getCategories
      })
    }
  })

  return { deleteCategory, isDeletePanding, deleteError }
}
