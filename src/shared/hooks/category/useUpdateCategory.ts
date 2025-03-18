import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { ICategory } from '@shared/types/category.types'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  const {
    mutate: updateCategory,
    isPending: isUpdatePending,
    error: updateError
  } = useMutation({
    mutationKey: [TanStackQueryKey.updateCategory],
    mutationFn: async ({ id, data }: { id: string; data: ICategory }) => {
      const response = await window.api.updateCategory(data, id)

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

  return { updateCategory, isUpdatePending, updateError }
}
