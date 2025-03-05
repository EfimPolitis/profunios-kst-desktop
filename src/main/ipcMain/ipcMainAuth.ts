import { ipcMain } from 'electron'

import type { IAuthFormData } from '@shared/types/auth.types'

import { authService } from '../services/auth/auth.service'

export const ipcMainAuth = () => {
  ipcMain.handle(
    'auth',
    (_, type: 'login' | 'register', data: IAuthFormData) => {
      return authService.main(type, data)
    }
  )

  ipcMain.handle('logout', () => {
    authService.logout()
  })
}
