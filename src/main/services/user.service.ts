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
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IResponseUsers>(`/users?${url}`)

    return response
  },

  async getUser(userId: string) {
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IUser>(`/users/${userId}`)

    return response
  },

  async getProfile() {
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IProfileResponse>('/users/profile')
    return response.data
  },

  async updateUser(data: IFormData, id: string) {
    const { headers, request, config, ...response } = await axiosWithAuth.patch(
      `/users/${id}`,
      data
    )
    return response
  },

  async deleteUser(id: string) {
    const { headers, request, config, ...response } =
      await axiosWithAuth.delete(`/users/${id}`)
    return response
  }
}
