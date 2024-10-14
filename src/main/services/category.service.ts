import { API_URL } from '@shared/constants/api.constants'

import { ICategory, IResponseCategories } from '@shared/types/category.types'

import { axiosWithAuth } from '../api/interseptors'

export const categoryService = {
  async getAll() {
    const { headers, config, request, ...response } = await axiosWithAuth.get<
      IResponseCategories[]
    >(`${API_URL}/category`)

    return response
  },

  async create(data: ICategory) {
    const response = await axiosWithAuth.post<IResponseCategories>(
      `${API_URL}/category`,
      data
    )

    return response
  },

  async update(id: string, data: ICategory) {
    const response = await axiosWithAuth.patch(
      `${API_URL}/category/${id}`,
      data
    )

    return response
  },

  async delete(categoryId: string) {
    const response = await axiosWithAuth.delete(
      `${API_URL}/category/${categoryId}`
    )

    return response
  }
}
