import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useProfile = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: [TanStackQueryKey.profile],
    queryFn: () => window.api.getProfile(),
    retry: 1
  })

  return { data, isLoading, isError, isFetching, refetch }
}
