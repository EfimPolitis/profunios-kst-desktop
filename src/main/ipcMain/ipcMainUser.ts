import { ipcMain } from 'electron'

import type { IFormData } from '@shared/types/auth.types'
import type { IQueryParam } from '@shared/types/filter.types'

import { userService } from '../services/user.service'

export const ipcMainUser = () => {
  ipcMain.handle('getUsers', (_, search: IQueryParam) =>
    userService.getUsers(search)
  )

  ipcMain.handle('getUser', (_, userId: string) => userService.getUser(userId))

  ipcMain.handle('getProfile', () => userService.getProfile())

  ipcMain.handle('updateUser', (_, data: IFormData, userId: string) =>
    userService.updateUser(data, userId)
  )

  ipcMain.handle('deleteUser', (_, id: string) => userService.deleteUser(id))
}
