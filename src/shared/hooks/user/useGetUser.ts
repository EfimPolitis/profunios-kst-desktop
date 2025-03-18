import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useGetUser = (userId: string | undefined) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [TanStackQueryKey.getUser],
    queryFn: () => {
      if (!userId) throw new Error('Invalid userId')
      return window.api.getUser(userId)
    }
  })

  return { data, isFetching, error }
}
