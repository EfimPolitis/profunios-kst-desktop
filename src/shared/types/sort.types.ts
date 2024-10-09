import { Dispatch, SetStateAction } from 'react'

export interface IGetData {
  search?: string
  sort?: { label: string; value: string }
  type?: EType
  page: number
}

interface ISortItem {
  label: string
  value: string
}

export enum EType {
  asc = 'asc',
  desc = 'desc'
}

export interface ISort {
  list: ISortItem[]
  sort: ISortItem
  setSort: Dispatch<SetStateAction<ISortItem>>
  type: EType
  setType: Dispatch<SetStateAction<EType>>
}
