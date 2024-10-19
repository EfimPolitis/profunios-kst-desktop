import { ipcMain } from 'electron'

import { IGetData } from '@shared/types/sort.types'

import { reservationService } from '../services/reservation.service'

export const ipcMainReservation = () => {
  ipcMain.handle('getReservations', (_, data: IGetData) =>
    reservationService.getAll(data)
  )
}
