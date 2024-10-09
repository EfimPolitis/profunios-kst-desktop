import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IEventFormData } from '@shared/types/event.types'

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
    mutationKey: TanStackQueryKey.createEvent,
    mutationFn: (data: IEventFormData) => window.api.createEvents(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getEvents })
      navigate({ to: URL_PAGES.MANAGE_EVENTS })
    }
  })

  return { createEvent, isPendingCreate, isSuccessCreate, createError }
}
