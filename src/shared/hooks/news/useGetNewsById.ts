import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useGetNewsById = (newsId: string) => {
  const { data, isLoading, isPending, isFetching, error } = useQuery({
    queryKey: [TanStackQueryKey.getNewsById],
    queryFn: () => window.api.getNewsById(newsId)
  })

  return { data, isLoading, isPending, isFetching, error }
}
