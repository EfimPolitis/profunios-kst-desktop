import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { IResponseCategory } from '@shared/types/category.types'

import styles from './index.module.scss'

interface IListAddRowInput {
  setCategories: Dispatch<SetStateAction<IResponseCategory[]>>
}

export const ListAddRowInput = ({ setCategories }: IListAddRowInput) => {
  const addRow = () => {
    //@ts-ignore
    setCategories(prev => {
      if (!prev) return

      return [
        ...prev,
        {
          id: '',
          name: ''
        }
      ]
    })
  }

  return (
    <button
      className={styles.addRowBtn}
      onClick={addRow}
    >
      Новая категория <ChevronDown size={32} />
    </button>
  )
}
