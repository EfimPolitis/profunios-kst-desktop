import axios from 'axios'
import { ipcMain } from 'electron'

import type {
  IAuthFormData,
  IChangePasswordFormData
} from '@shared/types/auth.types'

import { authService } from '../services/auth/auth.service'

export const ipcMainAuth = () => {
  ipcMain.handle(
    'auth',
    async (_, type: 'login' | 'register', data: IAuthFormData) => {
      try {
        const response = await authService.main(type, data)
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

  ipcMain.handle('logout', () => {
    return authService.logout()
  })

  ipcMain.handle('changePassword', async (_, data: IChangePasswordFormData) => {
    try {
      const response = await authService.changePassword(data)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })
}
