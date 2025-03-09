import { BrowserWindow, dialog } from 'electron'
import fs from 'fs'

import type {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@shared/types/event.types'
import type { IQueryParam } from '@shared/types/query.types'

import { axiosWithAuth } from '../api/interseptors'

export const eventService = {
  async getAll(queryData = {} as IQueryParam) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponseEvents>('/event', {
        params: queryData
      })

    return response
  },

  async getById(eventId: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IEvent>(`/event/${eventId}`)

    return response
  },

  async create(data: IEventFormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post(
      `/event`,
      data
    )
    return response
  },

  async update(data: IEventFormData, eventId: string) {
    const { headers, config, request, ...response } = await axiosWithAuth.patch(
      `/event/${eventId}`,
      data
    )
    return response
  },

  async delete(eventId: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`/event/${eventId}`)

    return response
  },

  async getReport() {
    const win = BrowserWindow.getFocusedWindow()
    if (!win) return

    const { filePath } = await dialog.showSaveDialog(win, {
      title: 'Сохранить отчёт',
      defaultPath: 'report.xlsx',
      filters: [{ name: 'Excel', extensions: ['xlsx'] }]
    })

    if (!filePath) return

    try {
      const response = await axiosWithAuth.get('/event/report', {
        responseType: 'arraybuffer'
      })

      fs.writeFileSync(filePath, response.data)
    } catch (error) {
      console.error('Ошибка загрузки отчёта:', error)
    }
  },

  async uploadImage(formData: FormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post<{
      url: string
      id: string
    }>('/event/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  },

  async deleteImage(fileName: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`/event/image/${fileName}`)

    return response
  }
}
