import { ipcMain } from 'electron'

import type { IAuthFormData } from '@shared/types/auth.types'
import type { IQueryParam } from '@shared/types/filter.types'

import { userService } from '../services/user.service'

export const ipcMainUser = () => {
  ipcMain.handle('getUsers', (_, search: IQueryParam) =>
    userService.getUsers(search)
  )

  ipcMain.handle('getUser', (_, userId: number) => userService.getUser(userId))

  ipcMain.handle('getProfile', () => userService.getProfile())

  ipcMain.handle('updateUser', (_, data: IAuthFormData, userId: number) =>
    userService.updateUser(data, userId)
  )

  ipcMain.handle('deleteUser', (_, id: number) => userService.deleteUser(id))
}
