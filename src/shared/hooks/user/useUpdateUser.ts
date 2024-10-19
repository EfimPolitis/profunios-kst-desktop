import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IFormData } from '@shared/types/auth.types'

import { URL_PAGES } from '@shared/config/url.config'

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
    onMutate: () => {
      toast.loading('Обработка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пользователь обнавлён успешно')
      queryClient.invalidateQueries({ queryKey: TanStackQueryKey.getUsers })
      navigate({ to: URL_PAGES.MANAGE_USERS })
    },
    onError: () => {
      toast.dismiss()
      toast.error('При обнавлении пользователя произошла ошибка')
    }
  })

  return { updateUser, isPendingUpdate, isSuccessUpdate, error }
}
