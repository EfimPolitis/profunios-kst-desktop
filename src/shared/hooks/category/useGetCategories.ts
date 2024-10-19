import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { TanStackQueryKey } from '@shared/constants/query-key.constants'

import { IResponseCategory } from '@shared/types/category.types'

export const useGetCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: TanStackQueryKey.getCategories,
    queryFn: () => window.api.getCategories()
  })

  const [categories, setCategories] = useState<IResponseCategory[]>(
    data?.data || []
  )

  useEffect(() => {
    setCategories(data?.data || [])
  }, [data?.data])

  return { categories, setCategories, isLoading, error }
}
