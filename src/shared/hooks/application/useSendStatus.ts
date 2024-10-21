import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useSendStatus = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: [TanStackQueryKey.sendStatus],
    mutationFn: (data: { status: string; id: string }) =>
      window.api.sendStatusApplication(data.status, data.id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [TanStackQueryKey.getApplications]
      })
    }
  })

  return { mutate, isPending, error, isSuccess }
}
