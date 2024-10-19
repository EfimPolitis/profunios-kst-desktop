import { useState } from 'react'

import { useDebounce } from './useDebounce'

export const useFilter = ({}) => {
  const [debounceSearch, search, setSearch] = useDebounce('', 500)
  const [page, setPage] = useState(0)

  return { debounceSearch, search, setSearch, page, setPage }
}
