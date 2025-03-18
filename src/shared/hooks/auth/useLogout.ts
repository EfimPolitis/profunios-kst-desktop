import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { URL_PAGES } from '@shared/config/url.config'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending, data, error } = useMutation({
    mutationKey: [TanStackQueryKey.logout],
    mutationFn: () => window.api.logout(),
    onMutate() {
      toast.loading('Загрузка...')
    },
    onSuccess() {
      toast.dismiss()
      navigate({ to: URL_PAGES.LOGIN })
      queryClient.getQueryCache().clear()
    }
  })

  return { mutate, isPending, data, error }
}
