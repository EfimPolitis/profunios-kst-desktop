import type { IAuthFormData } from '@shared/types/auth.types'
import type { IQueryParam } from '@shared/types/filter.types'
import {
  type IProfileResponse,
  type IResponseUsers,
  IUser
} from '@shared/types/user.types'

import { axiosWithAuth } from '../api/interseptors'

export const userService = {
  async getUsers(queryData = {} as IQueryParam) {
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IResponseUsers>(`/users`, {
        params: queryData
      })

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

  async updateUser(data: IAuthFormData, userId: string) {
    const { headers, request, config, ...response } = await axiosWithAuth.patch(
      `/users/${userId}`,
      data
    )
    return response
  },

  async deleteUser(userId: string) {
    const { headers, request, config, ...response } =
      await axiosWithAuth.delete(`/users/${userId}`)
    return response
  }
}
