import { ipcMain } from 'electron'

import type { IQueryParam } from '@shared/types/filter.types'

import { reservationService } from '../services/reservation.service'

export const ipcMainReservation = () => {
  ipcMain.handle('getReservations', (_, data: IQueryParam) =>
    reservationService.getAll(data)
  )
}
