import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { INewsFormData } from '@shared/types/news.types'

import { URL_PAGES } from '@shared/config/url.config'

export const useCreateNews = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    mutate: createNews,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
    error: createError
  } = useMutation({
    mutationKey: [TanStackQueryKey.createNews],
    mutationFn: (data: INewsFormData) => window.api.createNews(data),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Новость успешно созданна')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getNews] })
      navigate({ to: URL_PAGES.MANAGE_NEWS })
    },
    onError: () => {
      toast.dismiss()
      toast.error('Произошла ошибка')
    }
  })

  return { createNews, isPendingCreate, isSuccessCreate, createError }
}
