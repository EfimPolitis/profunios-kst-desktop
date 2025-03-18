import axios from 'axios'
import { ipcMain } from 'electron'

import type { IApplicationData } from '@shared/types/application.types'
import type { IQueryParam } from '@shared/types/query.types'

import { applicationService } from '../services/application.service'

export const ipcMainApplication = () => {
  ipcMain.handle('getApplications', (_, data: IQueryParam) =>
    applicationService.getAll(data)
  )

  ipcMain.handle('createApplication', async (_, data: IApplicationData) => {
    try {
      const response = await applicationService.create(data)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('getApplicationReport', () => applicationService.getReport())
}
