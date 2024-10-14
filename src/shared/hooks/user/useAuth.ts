import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IFormData } from '@shared/types/auth.types'
import { errorList } from '@shared/types/error.types'

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
    mutationKey: TanStackQueryKey.auth,
    mutationFn: (data: IFormData) =>
      window.api.auth(isLogin ? 'login' : 'register', data),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Вы успешно вошли в систему')
      reset()
      navigate({ to: URL_PAGES.MANAGE_EVENTS })
      useResize(1200, 800)
    },
    onError: error => {
      toast.dismiss()
      toast.error(errorList[error.message])
    }
  })

  return { authUser, isPendingAuth, isSuccessAuth, error }
}
