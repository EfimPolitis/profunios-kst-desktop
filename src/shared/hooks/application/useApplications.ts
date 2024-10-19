import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IGetData } from '@shared/types/sort.types'

export const useApplications = (search: IGetData) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: TanStackQueryKey.getApplications,
    queryFn: () => window.api.getApplications(search)
  })

  return { data, isLoading, isFetching, refetch }
}
