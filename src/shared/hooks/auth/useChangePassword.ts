import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IChangePasswordFormData } from '@shared/types/auth.types'

import { URL_PAGES } from '@shared/config/url.config'

export const useChangePassword = (
  reset: UseFormReset<IChangePasswordFormData>
) => {
  const navigate = useNavigate()
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: [TanStackQueryKey.changePassword],
    mutationFn: async (data: IChangePasswordFormData) => {
      const response = await window.api.changePassword(data)

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Пароль был успешно изменён')
      reset()
      navigate({ to: URL_PAGES.PROFILE })
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

  return { changePassword: mutate, isPending, isError, isSuccess }
}
