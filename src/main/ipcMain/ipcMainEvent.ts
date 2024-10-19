import { ipcMain } from 'electron'

import { IEventFormData } from '@shared/types/event.types'
import { IGetData } from '@shared/types/sort.types'

import { eventService } from '../services/events.service'

export const ipcMainEvent = () => {
  ipcMain.handle('getEventById', (_, eventId: string) =>
    eventService.getById(eventId)
  )

  ipcMain.handle('getEvents', (_, search: IGetData) =>
    eventService.getAll(search)
  )

  ipcMain.handle('createEvent', (_, data: IEventFormData) =>
    eventService.create(data)
  )

  ipcMain.handle('updateEvent', (_, data: IEventFormData, eventId: string) =>
    eventService.update(data, eventId)
  )

  ipcMain.handle('deleteEvent', (_, eventId: string) =>
    eventService.delete(eventId)
  )

  ipcMain.handle('uploadImage', async (_, { buffer, name, type }) => {
    const formData = new FormData()
    const blob = new Blob([buffer], { type })
    formData.append('image', blob, name)

    const response = await eventService.uploadImage(formData)
    return response
  })
}
