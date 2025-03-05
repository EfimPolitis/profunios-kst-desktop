import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { INewsFormData } from '@shared/types/news.types'

import { URL_PAGES } from '@shared/config/url.config'

export const useUpdateNews = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    mutate: updateNews,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    error: updateError
  } = useMutation({
    mutationKey: [TanStackQueryKey.updateNews],
    mutationFn: ({ data, newsId }: { data: INewsFormData; newsId: string }) =>
      window.api.updateNews(data, newsId),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success('Новость успешно обнавленна')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getNews] })
      navigate({ to: URL_PAGES.MANAGE_NEWS })
    },
    onError: () => {
      toast.dismiss()
      toast.error('Произошла ошибка')
    }
  })

  return { updateNews, isPendingUpdate, isSuccessUpdate, updateError }
}
