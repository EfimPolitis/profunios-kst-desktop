import { useMutation } from '@tanstack/react-query'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

export const useIncrementView = () => {
  const { mutate } = useMutation({
    mutationKey: [TanStackQueryKey.incrementView],
    mutationFn: (newsId: string) => window.api.incrementView(newsId)
  })

  return { mutate }
}
