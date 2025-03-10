import { ipcMain } from 'electron'

import type { ICategory } from '@shared/types/category.types'
import { IQueryParam } from '@shared/types/query.types'

import { categoryService } from '../services/category.service'

export const ipcMainCategory = () => {
  ipcMain.handle('getCategories', (_, queryData?: IQueryParam) =>
    categoryService.getAll(queryData)
  )

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
