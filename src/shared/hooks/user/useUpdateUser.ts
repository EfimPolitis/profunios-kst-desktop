import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IAuthFormData } from '@shared/types/auth.types'

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
    mutationKey: [TanStackQueryKey.updateUser],
    mutationFn: async ({
      data,
      userId
    }: {
      data: IAuthFormData
      userId: string | undefined
    }) => {
      if (!userId) throw new Error('Invalid userId')

      const response = await window.api.updateUser(data, userId)

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
    onMutate: () => {
      toast.loading('Обработка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пользователь обнавлён успешно')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getUsers] })
      navigate({ to: URL_PAGES.MANAGE_USERS })
    },
    onError: (error: unknown) => {
      toast.dismiss()

      let message = 'Произошла неизвестная ошибка'

      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message
        if (typeof serverMessage === 'string') {
          message = serverMessage
        }
      }

      toast.error(message)
    }
  })

  return { updateUser, isPendingUpdate, isSuccessUpdate, error }
}
