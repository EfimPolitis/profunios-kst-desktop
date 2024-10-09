import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useGetEventById = (eventId: string) => {
  const { data, isLoading, isPending, isFetching, error } = useQuery({
    queryKey: TanStackQueryKey.getEventById,
    queryFn: () => window.api.getEvent(eventId)
  })

  return { data, isLoading, isPending, isFetching, error }
}
