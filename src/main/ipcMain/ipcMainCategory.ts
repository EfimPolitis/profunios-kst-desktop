import axios from 'axios'
import { ipcMain } from 'electron'

import type { ICategory } from '@shared/types/category.types'
import { IQueryParam } from '@shared/types/query.types'

import { categoryService } from '../services/category.service'

export const ipcMainCategory = () => {
  ipcMain.handle('getCategories', async (_, queryData?: IQueryParam) => {
    try {
      const response = await categoryService.getAll(queryData)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('createCategory', async (_, data: ICategory) => {
    try {
      const response = await categoryService.create(data)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('updateCategory', async (_, data: ICategory, id: string) => {
    try {
      const response = await categoryService.update(id, data)
      return { success: true, response }
    } catch (error) {
      let message = 'Неизвестная ошибка'
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      return { success: false, message }
    }
  })

  ipcMain.handle('deleteCategory', async (_, id: string) => {
    try {
      const response = await categoryService.delete(id)
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
