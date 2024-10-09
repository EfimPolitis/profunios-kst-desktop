import { SearchIcon, X } from 'lucide-react'
import { Dispatch, SetStateAction, useRef } from 'react'

import styles from './index.module.scss'

interface ISearch {
  placeholder: string
  value: string
  setValue: Dispatch<SetStateAction<any>>
}

export const Search = ({ placeholder, value, setValue }: ISearch) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.search}>
      <SearchIcon className={styles.search_icon} />
      <input
        type='text'
        placeholder={placeholder}
        className={styles.search_input}
        value={value}
        ref={inputRef}
        onChange={event => setValue(event.target.value)}
      />
      {value && (
        <X
          className={styles.close}
          onClick={() => {
            setValue('')
            if (inputRef.current) inputRef.current.focus()
          }}
        />
      )}
    </div>
  )
}
