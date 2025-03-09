import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import type { IApplicationData } from '@shared/types/application.types'
import type { IAuthFormData } from '@shared/types/auth.types'
import type { ICategory } from '@shared/types/category.types'
import type { IEventFormData } from '@shared/types/event.types'
import { INewsFormData } from '@shared/types/news.types'
import type { IQueryParam } from '@shared/types/query.types'

// Custom APIs for renderer
const api = {
  //auth
  auth: (type: 'login' | 'register', data: IAuthFormData) =>
    ipcRenderer.invoke('auth', type, data),
  logout: () => ipcRenderer.invoke('logout'),
  getAccessToken: () => ipcRenderer.invoke('getAccessToken'),

  //user
  getUser: (userId: string) => ipcRenderer.invoke('getUser', userId),
  getProfile: () => ipcRenderer.invoke('getProfile'),
  getUsers: (queryData: IQueryParam) =>
    ipcRenderer.invoke('getUsers', queryData),

  updateUser: (data: IAuthFormData, userId: string) =>
    ipcRenderer.invoke('updateUser', data, userId),
  deleteUser: (userId: string) => ipcRenderer.invoke('deleteUser', userId),

  //event
  getEventById: (eventId: string) =>
    ipcRenderer.invoke('getEventById', eventId),
  getEvents: (queryData: IQueryParam) =>
    ipcRenderer.invoke('getEvents', queryData),
  createEvent: (data: IEventFormData) =>
    ipcRenderer.invoke('createEvent', data),
  updateEvent: (data: IEventFormData, eventId: string) =>
    ipcRenderer.invoke('updateEvent', data, eventId),
  deleteEvent: (eventId: string) => ipcRenderer.invoke('deleteEvent', eventId),

  //news
  getNewsById: (newsId: string) => ipcRenderer.invoke('getNewsById', newsId),
  getNews: (queryData: IQueryParam) => ipcRenderer.invoke('getNews', queryData),
  createNews: (data: INewsFormData) => ipcRenderer.invoke('createNews', data),
  updateNews: (data: INewsFormData, newsId: string) =>
    ipcRenderer.invoke('updateNews', data, newsId),
  deleteNews: (newsId: string) => ipcRenderer.invoke('deleteNews', newsId),

  //buffer
  createBuffer: (arrayBuffer: ArrayBuffer) => Buffer.from(arrayBuffer),

  //application
  getApplications: (queryData: IQueryParam) =>
    ipcRenderer.invoke('getApplications', queryData),
  createApplication: (data: IApplicationData) =>
    ipcRenderer.invoke('createApplication', data),

  //category
  getCategories: () => ipcRenderer.invoke('getCategories'),
  createCategory: (data: ICategory) =>
    ipcRenderer.invoke('createCategory', data),
  updateCategory: (data: ICategory, id: string) =>
    ipcRenderer.invoke('updateCategory', data, id),
  deleteCategory: (id: string) => ipcRenderer.invoke('deleteCategory', id),

  //image
  uploadImage: (
    fileData: {
      buffer: Buffer
      name: string
      type: string
    },
    entity: 'event' | 'news'
  ) => {
    return entity === 'event'
      ? ipcRenderer.invoke('uploadEventImage', fileData)
      : ipcRenderer.invoke('uploadNewsImage', fileData)
  },
  deleteImage: (fileName: string, entity: 'event' | 'news') => {
    return entity === 'event'
      ? ipcRenderer.invoke('deleteEventImage', fileName)
      : ipcRenderer.invoke('deleteNewsImage', fileName)
  },

  //report
  getReport: (entity: 'event' | 'application' | 'user') => {
    switch (entity) {
      case 'application':
        return ipcRenderer.invoke('getApplicationReport')
      case 'event':
        return ipcRenderer.invoke('getEventReport')
      case 'user':
        return ipcRenderer.invoke('getUserReport')
    }
  },

  //window
  setTitle: (title: string) => ipcRenderer.send('setTitle', title),
  setWindowSize: (width: number, height: number, x: number, y: number) =>
    ipcRenderer.send('setWindowSize', width, height, x, y)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
