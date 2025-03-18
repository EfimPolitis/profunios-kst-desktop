import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IEventFormData } from '@shared/types/event.types'

import { URL_PAGES } from '@shared/config/url.config'

export const useCreateEvent = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    mutate: createEvent,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
    error: createError
  } = useMutation({
    mutationKey: [TanStackQueryKey.createEvent],
    mutationFn: async (data: IEventFormData) => {
      const response = await window.api.createEvent(data)

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Мероприятие успешно созданно')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getEvents] })
      navigate({ to: URL_PAGES.MANAGE_EVENTS })
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

  return { createEvent, isPendingCreate, isSuccessCreate, createError }
}
