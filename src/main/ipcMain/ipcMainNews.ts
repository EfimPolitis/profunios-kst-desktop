import { ipcMain } from 'electron'

import { IQueryParam } from '@shared/types/filter.types'
import { INewsFormData } from '@shared/types/news.types'

import { newsService } from '../services/news.service'

export const ipcMainNews = () => {
  ipcMain.handle('getNewsById', (_, newsId: string) =>
    newsService.getById(newsId)
  )

  ipcMain.handle('getNews', (_, queryData: IQueryParam) =>
    newsService.getAll(queryData)
  )

  ipcMain.handle('createNews', (_, data: INewsFormData) =>
    newsService.create(data)
  )

  ipcMain.handle('updateNews', (_, data: INewsFormData, newsId: string) =>
    newsService.update(data, newsId)
  )

  ipcMain.handle('deleteNews', (_, newsId: string) =>
    newsService.delete(newsId)
  )

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
