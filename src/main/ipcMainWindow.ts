import { BrowserWindow, ipcMain } from 'electron'

import { getAccessToken } from './services/auth/auth.helper'

export const ipcMainWidnow = (mainWindow: BrowserWindow) => {
  ipcMain.handle('setWindowSize', (_, width, height, x, y) => {
    mainWindow.setMinimumSize(width, height)
    mainWindow.setContentSize(width, height)
    mainWindow.setPosition(x, y)
  })

  ipcMain.handle('getAccessToken', _ => {
    return getAccessToken()
  })
}
