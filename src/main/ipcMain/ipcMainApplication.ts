import { ipcMain } from 'electron'

import type { IApplicationData } from '@shared/types/application.types'
import type { IQueryParam } from '@shared/types/filter.types'

import { applicationService } from '../services/application.service'

export const ipcMainApplication = () => {
  ipcMain.handle('getApplications', (_, data: IQueryParam) =>
    applicationService.getAll(data)
  )

  ipcMain.handle('createApplication', (_, data: IApplicationData) =>
    applicationService.create(data)
  )

  ipcMain.handle('sendStatusApplication', (_, status: string, id: string) =>
    applicationService.sendStatus(status, id)
  )
}
