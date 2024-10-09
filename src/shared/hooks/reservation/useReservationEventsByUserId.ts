import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { reservationService } from '@/services/reservation.service'

export const useReservationEventsByUserId = (userId: string) => {
  const { data, isPending, isFetching, isLoading, refetch, error } = useQuery({
    queryKey: TanStackQueryKey.getReservationByUserId,
    queryFn: () => reservationService.getByUserId(userId)
  })

  return { data, isPending, isFetching, isLoading, refetch, error }
}
