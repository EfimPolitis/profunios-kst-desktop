import { ipcMain } from 'electron'

import { IFormData } from '@shared/types/auth.types'
import { IGetData } from '@shared/types/sort.types'

import { userService } from '../services/user.service'

export const ipcMainUser = () => {
  ipcMain.handle('getUsers', (_, search: IGetData) =>
    userService.getUsers(search)
  )

  ipcMain.handle('getUser', (_, userId: string) => userService.getUser(userId))

  ipcMain.handle('getProfile', () => userService.getProfile())

  ipcMain.handle('updateUser', (_, data: IFormData, userId: string) =>
    userService.updateUser(data, userId)
  )

  ipcMain.handle('deleteUser', (_, id: string) => userService.deleteUser(id))
}
