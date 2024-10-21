import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IApplicationData } from '@shared/types/application.types'

export const useCreateApplication = () => {
  const QueryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationKey: [TanStackQueryKey.createApplication],
    mutationFn: (data: IApplicationData) => window.api.createApplication(data),
    onSuccess() {
      QueryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getEvents] })
      toast.success('Заявка на мероприятие поданна успешно')
    },
    onError() {
      toast.error(
        'Произошла ошибка, не получилось подать заявку на мероприятие!'
      )
    }
  })

  return { mutate, isPending, isSuccess, isError, error, reset }
}
