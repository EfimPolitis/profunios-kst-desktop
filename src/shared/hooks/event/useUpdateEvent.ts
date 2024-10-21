import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IEventFormData } from '@shared/types/event.types'

import { URL_PAGES } from '@shared/config/url.config'

export const useUpdateEvent = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    mutate: updateEvent,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    error: updateError
  } = useMutation({
    mutationKey: [TanStackQueryKey.updateEvent],
    mutationFn: ({
      data,
      eventId
    }: {
      data: IEventFormData
      eventId: string
    }) => window.api.updateEvent(data, eventId),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Мероприятие успешно обнавленно')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getEvents] })
      navigate({ to: URL_PAGES.MANAGE_EVENTS })
    },
    onError: () => {
      toast.dismiss()
      toast.error('Произошла ошибка')
    }
  })

  return { updateEvent, isPendingUpdate, isSuccessUpdate, updateError }
}
