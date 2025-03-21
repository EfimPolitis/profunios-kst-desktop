import type { IAuthFormData } from '@shared/types/auth.types'
import type { IQueryParam } from '@shared/types/query.types'
import {
  type IProfileResponse,
  type IResponseUsers,
  type IUser
} from '@shared/types/user.types'

import { axiosWithAuth } from '../api/interseptors'

import { reportServise } from './report.sevice'

export const userService = {
  async getAll(queryData = {} as IQueryParam) {
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IResponseUsers>('/users', {
        params: queryData
      })

    return response
  },

  async getById(userId: string) {
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IUser>(`/users/${userId}`)

    return response
  },

  async getProfile() {
    const { headers, request, config, ...response } =
      await axiosWithAuth.get<IProfileResponse>('/users/profile')

    return response
  },

  async update(data: IAuthFormData, userId: string) {
    const { headers, request, config, ...response } = await axiosWithAuth.patch(
      `/users/${userId}`,
      data
    )
    return response
  },

  async delete(userId: string) {
    const { headers, request, config, ...response } =
      await axiosWithAuth.delete(`/users/${userId}`)
    return response
  },

  async getReport() {
    return reportServise.downloadReport('users')
  }
}
