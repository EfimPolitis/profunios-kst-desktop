import { SearchIcon, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import type { IQueryParam } from '@shared/types/query.types'

import { useDebounce } from '@shared/hooks/useDebounce'

import styles from './index.module.scss'

interface ISearch {
  placeholder: string
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
}

export const Search = ({ placeholder, updateQueryParam }: ISearch) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [debounceSearch, search, setSearch] = useDebounce('', 500)

  useEffect(() => {
    updateQueryParam({ key: 'search', value: search })
  }, [debounceSearch])

  return (
    <div className={styles.search}>
      <SearchIcon className={styles.search_icon} />
      <input
        type='text'
        placeholder={placeholder}
        className={styles.search_input}
        value={search}
        ref={inputRef}
        onChange={event => setSearch(event.target.value)}
      />
      {search && (
        <X
          className={styles.close}
          onClick={() => {
            setSearch('')
            if (inputRef.current) inputRef.current.focus()
          }}
        />
      )}
    </div>
  )
}
