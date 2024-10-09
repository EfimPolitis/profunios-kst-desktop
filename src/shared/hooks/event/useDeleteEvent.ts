import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: TanStackQueryKey.deleteEvent,
    mutationFn: (eventId: string) => window.api.deleteEvents(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getEvents
      })
    }
  })

  return { mutate, isPending, isSuccess, error }
}
