import type { TypeImage } from './event.types'

export interface INews {
  newsId: string
  title: string
  description: string
  content: string
  views: number
  images: TypeImage[]
  createdAt: string
  updatedAt: string
}

export interface INewsFormData {
  title: string
  description: string
  content: string
  imagesId: string[]
}

export interface IResponseNews {
  items: INews[]
  countPage: number
}

export interface INewsCard {
  data: INews
}

export type TypeNewsFormData = Pick<
  INews,
  'title' | 'description' | 'content'
> & { imagesId: string[] }
