import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { ICategory } from '@/types/category.types'

import { categoryService } from '@/services/category.service'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: updateCategory,
    isPending: isUpdatePending,
    error: updateError
  } = useMutation({
    mutationKey: TanStackQueryKey.updateCategory,
    mutationFn: ({ id, formData }: { id: string; formData: ICategory }) => {
      return categoryService.update(id, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getCategories
      })
    }
  })

  return { updateCategory, isUpdatePending, updateError }
}
