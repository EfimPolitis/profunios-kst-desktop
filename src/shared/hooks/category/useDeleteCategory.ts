import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { categoryService } from '@/services/category.service'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteCategory,
    isPending: isDeletePanding,
    error: deleteError
  } = useMutation({
    mutationKey: TanStackQueryKey.deleteCategory,
    mutationFn: (categoryId: string) => categoryService.delete(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getCategories
      })
    }
  })

  return { deleteCategory, isDeletePanding, deleteError }
}
