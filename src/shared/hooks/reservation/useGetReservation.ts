import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IGetData } from '@/types/sort.types'

import { reservationService } from '@/services/reservation.service'

export const useGetReservation = (searchData: IGetData) => {
  const { data, isLoading, isPending, isFetching, refetch, error } = useQuery({
    queryKey: TanStackQueryKey.getReservations,
    queryFn: () => reservationService.getAll(searchData)
  })

  return { data, isLoading, isPending, isFetching, refetch, error }
}
