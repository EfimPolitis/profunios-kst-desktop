import { ipcMainApplication } from './ipcMain/ipcMainApplication'
import { ipcMainAuth } from './ipcMain/ipcMainAuth'
import { ipcMainCategory } from './ipcMain/ipcMainCategory'
import { ipcMainEvent } from './ipcMain/ipcMainEvent'
import { ipcMainReservation } from './ipcMain/ipcMainReservations'
import { ipcMainUser } from './ipcMain/ipcMainUser'

export const ipcMainApi = () => {
  ipcMainAuth()
  ipcMainUser()
  ipcMainEvent()
  ipcMainApplication()
  ipcMainReservation()
  ipcMainCategory()
}
