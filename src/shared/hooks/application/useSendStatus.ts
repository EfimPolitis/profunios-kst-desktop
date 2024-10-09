import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { applicationService } from '@/services/application.service'

export const useSendStatus = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: TanStackQueryKey.sendStatus,
    mutationFn: useCallback(
      (data: { status: string; id: string }) =>
        applicationService.sendStatus(data.status, data.id),
      []
    ),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: TanStackQueryKey.getApplications
      })
    }
  })

  return { mutate, isPending, error, isSuccess }
}
