import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IGetData } from '@shared/types/sort.types'

export const useGetReservation = (searchData: IGetData) => {
  const { data, isLoading, isPending, isFetching, refetch, error } = useQuery({
    queryKey: TanStackQueryKey.getReservations,
    queryFn: () => window.api.getReservations(searchData)
  })

  return { data, isLoading, isPending, isFetching, refetch, error }
}
