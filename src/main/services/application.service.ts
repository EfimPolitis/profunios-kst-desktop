import {
  IApplication,
  IApplicationData,
  IResponeApplications
} from '@shared/types/application.types'
import { IQueryParam } from '@shared/types/query.types'

import { axiosWithAuth } from '../api/interseptors'

import { reportServise } from './report.sevice'

export const applicationService = {
  async getAll(queryData = {} as IQueryParam) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponeApplications>('/application', {
        params: queryData
      })
    return response
  },

  async getByUserId(userId: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponeApplications>(`/application/${userId}`)
    return response
  },

  async create(data: IApplicationData) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.post<IApplication>('/application', data)
    return response
  },

  async getReport() {
    return reportServise.downloadReport('application')
  }
}
