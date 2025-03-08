import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useGetEventById = (eventId: string) => {
  const { data, isLoading, isPending, isFetching, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getEventById],
    queryFn: () => window.api.getEventById(eventId)
  })

  return { data, isLoading, isPending, isFetching, refetch, error }
}
