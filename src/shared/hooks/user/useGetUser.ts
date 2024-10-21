import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useGetUser = (userId: string) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [TanStackQueryKey.getUser],
    queryFn: () => window.api.getUser(userId)
  })

  return { data, isFetching, error }
}
