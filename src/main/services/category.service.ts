import { ICategory, IResponseCategory } from '@shared/types/category.types'

import { axiosWithAuth } from '../api/interseptors'

export const categoryService = {
  async getAll() {
    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponseCategory[]>('/category')

    return response
  },

  async create(data: ICategory) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.post<IResponseCategory>('/category', data)

    return response
  },

  async update(id: string, data: ICategory) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.patch<IResponseCategory>(`/category/${id}`, data)

    return response
  },

  async delete(categoryId: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`/category/${categoryId}`)

    return response
  }
}
