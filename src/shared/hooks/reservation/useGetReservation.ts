import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IQueryParam } from '@shared/types/filter.types'

export const useGetReservation = (queryData: IQueryParam, enabled: boolean) => {
  const { data, isLoading, isPending, isFetching, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getReservations, queryData],
    queryFn: () => window.api.getReservations(queryData),
    enabled: enabled
  })

  return { data, isLoading, isPending, isFetching, refetch, error }
}
