import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IApplicationData } from '@shared/types/application.types'

export const useCreateApplication = () => {
  const QueryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationKey: [TanStackQueryKey.createApplication],
    mutationFn: async (data: IApplicationData) => {
      const response = await window.api.createApplication(data)

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
    onSuccess() {
      QueryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getEvents] })
      toast.success('Заявка на мероприятие поданна успешно')
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

  return { mutate, isPending, isSuccess, isError, error, reset }
}
