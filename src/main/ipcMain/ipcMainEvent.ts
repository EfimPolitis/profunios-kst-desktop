import axios from 'axios'
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

  ipcMain.handle('createEvent', async (_, data: IEventFormData) => {
    try {
      const response = await eventService.create(data)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle(
    'updateEvent',
    async (_, data: IEventFormData, eventId: string) => {
      try {
        const response = await eventService.update(data, eventId)
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

  ipcMain.handle('deleteEvent', async (_, eventId: string) => {
    try {
      const response = await eventService.delete(eventId)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('getEventReport', () => eventService.getReport())

  ipcMain.handle('uploadEventImage', async (_, { buffer, name, type }) => {
    try {
      const formData = new FormData()
      const blob = new Blob([buffer], { type })
      formData.append('image', blob, name)

      const response = await eventService.uploadImage(formData)

      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('deleteEventImage', async (_, fileName: string) => {
    try {
      const response = await eventService.deleteImage(fileName)
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
