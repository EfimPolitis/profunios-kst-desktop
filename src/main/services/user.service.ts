import type { IFormData } from '@shared/types/auth.types'
import type { IGetData } from '@shared/types/sort.types'
import {
  type IProfileResponse,
  type IResponseUsers,
  IUser
} from '@shared/types/user.types'

import { getUrlForRequest } from '@shared/hooks/getUrlForRequest'

import { axiosWithAuth } from '../api/interseptors'

export const userService = {
  async getUsers(data: IGetData) {
    const { url } = getUrlForRequest(data)
    return axiosWithAuth.get<IResponseUsers>(`/users?${url}`)
  },

  async getUser(userId: string) {
    return axiosWithAuth.get<IUser>(`/users/${userId}`)
  },

  async getProfile() {
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IProfileResponse>('/users/profile')
    return response.data
  },

  async updateUser(data: IFormData, id: string) {
    const response = await axiosWithAuth.patch(`/users/${id}`, data)
    return response
  },

  async deleteUser(id: string) {
    const response = await axiosWithAuth.delete(`/users/${id}`)
    return response
  }
}
