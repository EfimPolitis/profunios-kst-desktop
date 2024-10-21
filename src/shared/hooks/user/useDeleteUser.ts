import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteUser,
    isPending,
    error
  } = useMutation({
    mutationKey: [TanStackQueryKey.deleteUser],
    mutationFn: (id: string) => window.api.deleteUser(id),
    onMutate: () => {
      toast.loading('Загрузка...')
    },
    onSuccess: () => {
      toast.success('Пользователь успешно удалён')
      queryClient.invalidateQueries({ queryKey: [TanStackQueryKey.getUsers] })
    },
    onError: () => {
      toast.error('При удалении произошла ошибка')
    }
  })

  return { deleteUser, isPending, error }
}
