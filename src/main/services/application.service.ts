import { BrowserWindow, dialog } from 'electron'
import fs from 'fs'

import {
  IApplication,
  IApplicationData,
  IResponeApplications
} from '@shared/types/application.types'
import { IQueryParam } from '@shared/types/query.types'

import { axiosWithAuth } from '../api/interseptors'

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
    const win = BrowserWindow.getFocusedWindow()
    if (!win) return

    const { filePath } = await dialog.showSaveDialog(win, {
      title: 'Сохранить отчёт',
      defaultPath: 'report.xlsx',
      filters: [{ name: 'Excel', extensions: ['xlsx'] }]
    })

    if (!filePath) return

    try {
      const response = await axiosWithAuth.get('http://localhost:3000/report', {
        responseType: 'arraybuffer'
      })

      fs.writeFileSync(filePath, response.data)
    } catch (error) {
      console.error('Ошибка загрузки отчёта:', error)
    }
  }
}
