import { BrowserWindow, dialog, shell } from 'electron'
import fs from 'fs'
import os from 'os'
import { join } from 'path'

import { axiosWithAuth } from '../api/interseptors'

export const reportServise = {
  downloadReport: async (entity: 'event' | 'users' | 'application') => {
    const win = BrowserWindow.getFocusedWindow()
    if (!win) return

    try {
      // Запрос отчёта
      const response = await axiosWithAuth.get(`/${entity}/report`, {
        responseType: 'arraybuffer'
      })

      // Получаем имя файла из заголовка Content-Disposition
      const contentDisposion = response.headers['content-disposition']
      const fileNameMatch = contentDisposion?.match(/filename*=UTF-8''(.+)/)
      const fileName = fileNameMatch
        ? fileNameMatch[1]
        : `report_${entity}_${new Date(Date.now()).toISOString().slice(0, -14)}.xlsx`

      //Папка загрузок
      const downloadPath = join(os.homedir(), 'Downloads')
      const defaultFilePath = join(downloadPath, fileName)

      //Окно сохранения
      const { filePath } = await dialog.showSaveDialog(win, {
        title: 'Сохранить отчёт',
        defaultPath: defaultFilePath,
        filters: [{ name: 'Excel', extensions: ['xlsx'] }]
      })

      if (!filePath) return

      // Записываем файл
      fs.writeFileSync(filePath, response.data)

      // Открываем проводник с выделением файла
      shell.showItemInFolder(filePath)
    } catch (error) {
      console.error('Ошибка загрузки отчёта:', error)
    }
  }
}
