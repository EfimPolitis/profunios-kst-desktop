import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IEventFormData } from '@shared/types/event.types'

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
    mutationKey: TanStackQueryKey.updateEvent,
    mutationFn: ({
      data,
      eventId
    }: {
      data: IEventFormData
      eventId: string
    }) => window.api.updateEvents(data, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getEvents })
      navigate({ to: URL_PAGES.MANAGE_EVENTS })
    }
  })

  return { updateEvent, isPendingUpdate, isSuccessUpdate, updateError }
}
