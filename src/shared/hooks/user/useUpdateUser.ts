import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IFormData } from '@shared/types/auth.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useNavigate } from '@tanstack/react-router'

export const useUpdateUser = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    mutate: updateUser,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    error
  } = useMutation({
    mutationKey: TanStackQueryKey.updateUser,
    mutationFn: ({ data, userId }: { data: IFormData; userId: string }) =>
      window.api.updateUser(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getUsers })
      navigate({ to: URL_PAGES.MANAGE_USERS })
    }
  })

  return { updateUser, isPendingUpdate, isSuccessUpdate, error }
}
