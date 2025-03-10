import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import type { IResponseCategory } from '@shared/types/category.types'
import type { IQueryParam } from '@shared/types/query.types'

export const useGetCategories = (
  queryData?: IQueryParam,
  enabled?: boolean
) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [TanStackQueryKey.getCategories, queryData],
    queryFn: () => window.api.getCategories(queryData),
    enabled: enabled
  })

  const [categories, setCategories] = useState<IResponseCategory[]>(
    data?.data || []
  )

  useEffect(() => {
    setCategories(data?.data || [])
  }, [data?.data])

  return { categories, setCategories, isLoading, refetch, error }
}
