import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IQueryParam } from '@shared/types/query.types'

export const useGetUsers = (queryData: IQueryParam, enabled: boolean) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [TanStackQueryKey.getUsers, queryData],
    queryFn: () => window.api.getUsers(queryData),
    enabled: enabled
  })

  return { data, isLoading, isFetching, refetch }
}
