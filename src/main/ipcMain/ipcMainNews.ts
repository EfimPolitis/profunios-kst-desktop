import axios from 'axios'
import { ipcMain } from 'electron'

import { INewsFormData } from '@shared/types/news.types'
import { IQueryParam } from '@shared/types/query.types'

import { newsService } from '../services/news.service'

export const ipcMainNews = () => {
  ipcMain.handle('getNewsById', (_, newsId: string) =>
    newsService.getById(newsId)
  )

  ipcMain.handle('incrementView', (_, newsId: string) =>
    newsService.incrementView(newsId)
  )

  ipcMain.handle('getNews', (_, queryData: IQueryParam) =>
    newsService.getAll(queryData)
  )

  ipcMain.handle('createNews', async (_, data: INewsFormData) => {
    try {
      const response = await newsService.create(data)
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
    'updateNews',
    async (_, data: INewsFormData, newsId: string) => {
      try {
        const response = await newsService.update(data, newsId)
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

  ipcMain.handle('deleteNews', async (_, newsId: string) => {
    try {
      const response = await newsService.delete(newsId)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('uploadNewsImage', async (_, { buffer, name, type }) => {
    const formData = new FormData()
    const blob = new Blob([buffer], { type })
    formData.append('image', blob, name)

    const response = await newsService.uploadImage(formData)

    return response
  })

  ipcMain.handle('deleteNewsImage', (_, fileName: string) =>
    newsService.deleteImage(fileName)
  )
}
