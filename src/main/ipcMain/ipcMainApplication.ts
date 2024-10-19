import { ipcMain } from 'electron'

import { IApplicationData } from '@shared/types/application.types'
import { IGetData } from '@shared/types/sort.types'

import { applicationService } from '../services/application.service'

export const ipcMainApplication = () => {
  ipcMain.handle('getApplications', (_, data: IGetData) =>
    applicationService.getAll(data)
  )

  ipcMain.handle('createApplication', (_, data: IApplicationData) =>
    applicationService.create(data)
  )

  ipcMain.handle('sendStatusApplication', (_, status: string, id: string) =>
    applicationService.sendStatus(status, id)
  )
}
