import { ipcMain } from 'electron'

import type { IEventFormData } from '@shared/types/event.types'
import type { IQueryParam } from '@shared/types/query.types'

import { eventService } from '../services/events.service'

export const ipcMainEvent = () => {
  ipcMain.handle('getEventById', (_, eventId: string) =>
    eventService.getById(eventId)
  )

  ipcMain.handle('getEvents', (_, search: IQueryParam) =>
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

  ipcMain.handle('getEventReport', () => eventService.getReport())

  ipcMain.handle('uploadEventImage', async (_, { buffer, name, type }) => {
    const formData = new FormData()
    const blob = new Blob([buffer], { type })
    formData.append('image', blob, name)

    const response = await eventService.uploadImage(formData)

    return response
  })

  ipcMain.handle('deleteEventImage', (_, fileName: string) =>
    eventService.deleteImage(fileName)
  )
}
