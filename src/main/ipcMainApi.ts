import { ipcMain } from 'electron'

import { IApplicationData } from '@shared/types/application.types'
import { IFormData } from '@shared/types/auth.types'
import { IEventFormData } from '@shared/types/event.types'
import { IGetData } from '@shared/types/sort.types'

import { applicationService } from './services/application.service'
import { authService } from './services/auth/auth.service'
import { categoryService } from './services/category.service'
import { eventService } from './services/events.service'
import { userService } from './services/user.service'

export const ipcMainApi = () => {
  ipcMainAuth()
  ipcMainUser()
  ipcMainEvent()
  ipcMainApplication()
  ipcMainCategory()
}

function ipcMainAuth() {
  ipcMain.handle('auth', (_, type: 'login' | 'register', data: IFormData) => {
    return authService.main(type, data)
  })

  ipcMain.handle('logout', () => {
    authService.logout()
  })
}

function ipcMainUser() {
  ipcMain.handle('getUsers', (_, search: IGetData) =>
    userService.getUsers(search)
  )

  ipcMain.handle('getUser', (_, userId: string) => userService.getUser(userId))

  ipcMain.handle('getProfile', () => userService.getProfile())

  ipcMain.handle('updateUser', (_, data: IFormData, userId: string) =>
    userService.updateUser(data, userId)
  )
}

function ipcMainEvent() {
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

function ipcMainApplication() {
  ipcMain.handle('createApplication', (_, data: IApplicationData) =>
    applicationService.create(data)
  )
}

function ipcMainCategory() {
  ipcMain.handle('getCategories', () => categoryService.getAll())
}
