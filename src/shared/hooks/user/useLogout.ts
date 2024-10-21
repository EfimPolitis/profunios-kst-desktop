import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { URL_PAGES } from '@shared/config/url.config'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending, data, error } = useMutation({
    mutationKey: [TanStackQueryKey.logout],
    mutationFn: () => window.api.logout(),
    async onSuccess() {
      navigate({ to: URL_PAGES.LOGIN })
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.profile] })
    }
  })

  return { mutate, isPending, data, error }
}
