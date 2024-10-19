import { API_URL } from '@shared/constants/api.constants'

import {
  IApplication,
  IApplicationData,
  IResponeApplications
} from '@shared/types/application.types'
import { IGetData } from '@shared/types/sort.types'

import { getUrlForRequest } from '@shared/hooks/getUrlForRequest'

import { axiosWithAuth } from '../api/interseptors'

export const applicationService = {
  async getAll(data: IGetData) {
    const { url } = getUrlForRequest(data)

    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponeApplications>(
        `${API_URL}/application?${url}`
      )
    return response
  },

  async getByUserId(userId: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponeApplications>(
        `${API_URL}/application/${userId}`
      )
    return response
  },

  async create(data: IApplicationData) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.post<IApplication>(`${API_URL}/application`, data)
    return response
  },

  async sendStatus(status: string, id: string) {
    const { headers, config, request, ...response } = await axiosWithAuth.patch(
      `${API_URL}/application/${id}`,
      {
        status
      }
    )
    return response
  }
}
