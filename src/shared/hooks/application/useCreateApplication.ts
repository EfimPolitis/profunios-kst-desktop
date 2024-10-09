import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IApplicationData } from '@/types/application.types'

import { applicationService } from '@/services/application.service'

export const useCreateApplication = () => {
  const QueryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: TanStackQueryKey.createApplication,
    mutationFn: (responseData: IApplicationData) =>
      applicationService.create(responseData),
    async onSuccess() {
      QueryClient.invalidateQueries({ queryKey: TanStackQueryKey.getEvents })
    }
  })

  return { mutate, isPending, isSuccess, isError, error }
}
