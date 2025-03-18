import axios from 'axios'
import { ipcMain } from 'electron'

import type { IAuthFormData } from '@shared/types/auth.types'
import type { IQueryParam } from '@shared/types/query.types'

import { userService } from '../services/user.service'

export const ipcMainUser = () => {
  ipcMain.handle('getUsers', (_, search: IQueryParam) =>
    userService.getAll(search)
  )

  ipcMain.handle('getUser', (_, userId: string) => userService.getById(userId))

  ipcMain.handle('getProfile', () => userService.getProfile())

  ipcMain.handle(
    'updateUser',
    async (_, data: IAuthFormData, userId: string) => {
      try {
        const response = await userService.update(data, userId)
        return { success: true, response }
      } catch (error) {
        let message = 'Неизвестная ошибка'
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          message = error.response.data.message
        }
        return { success: false, message }
      }
    }
  )

  ipcMain.handle('deleteUser', async (_, userId: string) => {
    try {
      const response = await userService.delete(userId)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('getUserReport', () => userService.getReport())
}
