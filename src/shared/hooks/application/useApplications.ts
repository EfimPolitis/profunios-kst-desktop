import { useQuery } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IGetData } from '@/types/sort.types'

import { applicationService } from '@/services/application.service'

export const useApplications = (search: IGetData) => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: TanStackQueryKey.getApplications,
    queryFn: () => applicationService.getAll(search)
  })

  return { data, isLoading, isFetching, refetch }
}
