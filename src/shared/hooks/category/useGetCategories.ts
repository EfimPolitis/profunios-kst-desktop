import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { TanStackQueryKey } from '@/constants/queryKey.constants'

import { IResponseCategories } from '@/types/category.types'

import { categoryService } from '@/services/category.service'

export const useGetCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: TanStackQueryKey.getCategories,
    queryFn: () => categoryService.getAll()
  })

  const [categories, setCategories] = useState<IResponseCategories[]>(
    data?.data || []
  )

  useEffect(() => {
    setCategories(data?.data || [])
  }, [data?.data])

  return { categories, setCategories, isLoading, error }
}
