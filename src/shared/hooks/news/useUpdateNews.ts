import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
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
    mutationFn: async ({
      data,
      newsId
    }: {
      data: INewsFormData
      newsId: string
    }) => {
      const response = await window.api.updateNews(data, newsId)

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
      toast.success('Новость успешно обнавленна')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getNews] })
      navigate({ to: URL_PAGES.MANAGE_NEWS })
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

  return { updateNews, isPendingUpdate, isSuccessUpdate, updateError }
}
