import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { type IQueryParam } from '@shared/types/filter.types'

export const useGetEvents = (queryData: IQueryParam, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getEvents, queryData],
    queryFn: () => window.api.getEvents(queryData),
    enabled: enabled
  })

  return { data, isLoading, isFetching, refetch, error }
}
