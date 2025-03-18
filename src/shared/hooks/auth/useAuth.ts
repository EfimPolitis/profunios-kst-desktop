import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { AxiosResponse } from 'axios'
import type { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IAuthFormData, IAuthResponse } from '@shared/types/auth.types'
import { ERole } from '@shared/types/user.types'

import { URL_PAGES } from '@shared/config/url.config'

import { useResize } from '../useResize'

export const useAuth = (isLogin: boolean, reset: UseFormReset<any>) => {
  const navigate = useNavigate()
  const {
    mutate: authUser,
    isPending: isPendingAuth,
    isSuccess: isSuccessAuth,
    error
  } = useMutation({
    mutationKey: [TanStackQueryKey.auth],
    mutationFn: async (data: IAuthFormData) => {
      const response = await window.api.auth(
        isLogin ? 'login' : 'register',
        data
      )

      if (!response.success) {
        throw new Error(response.message)
      }

      return response.data
    },
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: (data: AxiosResponse<IAuthResponse>) => {
      toast.dismiss()
      const role = data?.data?.user?.role

      if (role === ERole.USER) {
        toast.error('У вас недостаточно прав, чтобы войти в систему!')
      } else {
        toast.success(
          isLogin
            ? 'Вы успешно вошли в систему'
            : 'Новый пользователь успешно создан'
        )
        reset()
        isLogin
          ? navigate({ to: URL_PAGES.MANAGE_EVENTS })
          : navigate({ to: URL_PAGES.MANAGE_USERS })
        useResize(1200, 800)
      }
    },
    onError: (error: unknown) => {
      toast.dismiss()
      console.log(error)

      let message = 'Произошла неизвестная ошибка'

      if (error instanceof Error) {
        message = error.message
      }

      toast.error(message)
    }
  })

  return { authUser, isPendingAuth, isSuccessAuth, error }
}
