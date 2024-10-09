import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IGetData } from '@shared/types/sort.types'

export const useGetUsers = (search: IGetData) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: TanStackQueryKey.getUsers,
    queryFn: () => window.api.getUsers(search)
  })

  return { data, isLoading, isFetching, refetch }
}
