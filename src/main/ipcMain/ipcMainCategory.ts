import { ipcMain } from 'electron'

import { ICategory } from '@shared/types/category.types'

import { categoryService } from '../services/category.service'

export const ipcMainCategory = () => {
  ipcMain.handle('getCategories', () => categoryService.getAll())

  ipcMain.handle('createCategory', (_, data: ICategory) =>
    categoryService.create(data)
  )

  ipcMain.handle('updateCategory', (_, data: ICategory, id: string) =>
    categoryService.update(id, data)
  )

  ipcMain.handle('deleteCategory', (_, id: string) =>
    categoryService.delete(id)
  )
}
