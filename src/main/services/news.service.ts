import { IQueryParam } from '@shared/types/filter.types'
import { INews, INewsFormData, IResponseNews } from '@shared/types/news.types'

import { axiosClassic, axiosWithAuth } from '../api/interseptors'

export const newsService = {
  async getById(id: string) {
    const { headers, config, request, ...response } =
      await axiosClassic.get<INews>(`/news/${id}`)

    return response
  },

  async getAll(queryData = {} as IQueryParam) {
    const { headers, config, request, ...response } =
      await axiosClassic.get<IResponseNews>('/news', {
        params: queryData
      })

    return response
  },

  async create(data: INewsFormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post(
      '/news',
      data
    )

    return response
  },

  async update(data: INewsFormData, id: string) {
    const { headers, config, request, ...response } = await axiosWithAuth.patch(
      `/news/${id}`,
      data
    )

    return response
  },

  async delete(id: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`/news/${id}`)

    return response
  },

  async uploadImage(formData: FormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post<{
      url: string
      id: string
    }>('/news/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  },

  async deleteImage(fileName: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`/news/image/${fileName}`)

    return response
  }
}
