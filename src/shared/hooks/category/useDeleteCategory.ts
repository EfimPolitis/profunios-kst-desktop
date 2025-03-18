import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteCategory,
    isPending: isDeletePanding,
    error: deleteError
  } = useMutation({
    mutationKey: [TanStackQueryKey.deleteCategory],
    mutationFn: async (id: string) => {
      const response = await window.api.deleteCategory(id)

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TanStackQueryKey.getCategories]
      })
    },
    onError: (error: unknown) => {
      toast.dismiss()

      let message = 'Произошла неизвестная ошибка'

      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message
        if (typeof serverMessage === 'string') {
          message = serverMessage
        }
      }

      toast.error(message)
    }
  })

  return { deleteCategory, isDeletePanding, deleteError }
}
