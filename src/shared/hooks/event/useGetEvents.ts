import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IGetData } from '@shared/types/sort.types'


export const useGetEvents = (search: IGetData) => {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: TanStackQueryKey.getEvents,
    queryFn: () => window.api.getEvents(search)
  })

  return { data, isLoading, isFetching, refetch, error }
}
