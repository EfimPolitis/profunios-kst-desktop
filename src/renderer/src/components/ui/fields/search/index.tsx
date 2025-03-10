import { SearchIcon, X } from 'lucide-react'
import { type InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import type { IQueryParam } from '@shared/types/query.types'

import { useDebounce } from '@shared/hooks/useDebounce'

import styles from './index.module.scss'

interface ISearch {
  placeholder: string
  queryParams: IQueryParam
  updateQueryParam: (data: { key: keyof IQueryParam; value: string }) => void
  isFilterReset?: boolean
}

export type TypeSearchProps = InputHTMLAttributes<HTMLInputElement> & ISearch

export const Search = ({
  placeholder,
  updateQueryParam,
  queryParams,
  isFilterReset,
  ...rest
}: TypeSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [debounceSearch, search, setSearch] = useDebounce('', 500)

  useEffect(() => {
    updateQueryParam({ key: 'search', value: search })
  }, [debounceSearch])

  useEffect(() => {
    if (isFilterReset) {
      setSearch('')
    }
  }, [isFilterReset])

  return (
    <div
      className={styles.search}
      {...rest}
    >
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
