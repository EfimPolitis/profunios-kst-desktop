import { BrowserWindow, ipcMain } from 'electron'

import { getAccessToken } from './services/auth/auth.helper'

export const ipcMainWidnow = (mainWindow: BrowserWindow) => {
  ipcMain.on('setTitle', (_, title) => {
    mainWindow.setTitle(`Профсоюз КСТ | ${title}`)
  })

  ipcMain.on('setWindowSize', (_, width, height, x, y) => {
    mainWindow.setMinimumSize(width, height)
    mainWindow.setContentSize(width, height)
    mainWindow.setPosition(x, y)
  })

  ipcMain.handle('getAccessToken', async () => await getAccessToken())
}
