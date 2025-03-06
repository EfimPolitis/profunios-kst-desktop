import { ipcMainApplication } from './ipcMain/ipcMainApplication'
import { ipcMainAuth } from './ipcMain/ipcMainAuth'
import { ipcMainCategory } from './ipcMain/ipcMainCategory'
import { ipcMainEvent } from './ipcMain/ipcMainEvent'
import { ipcMainNews } from './ipcMain/ipcMainNews'
import { ipcMainUser } from './ipcMain/ipcMainUser'

export const ipcMainApi = () => {
  ipcMainAuth()
  ipcMainUser()
  ipcMainEvent()
  ipcMainNews()
  ipcMainApplication()
  ipcMainCategory()
}
