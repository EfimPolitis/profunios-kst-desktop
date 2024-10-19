import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import { IApplicationData } from '@shared/types/application.types'
import { IFormData } from '@shared/types/auth.types'
import { ICategory } from '@shared/types/category.types'
import { IEventFormData } from '@shared/types/event.types'
import { IGetData } from '@shared/types/sort.types'

// Custom APIs for renderer
const api = {
  //auth
  auth: (type: 'login' | 'register', data: IFormData) =>
    ipcRenderer.invoke('auth', type, data),
  logout: () => ipcRenderer.invoke('logout'),
  getAccessToken: () => ipcRenderer.invoke('getAccessToken'),

  //user
  getUser: (userId: string) => ipcRenderer.invoke('getUser', userId),
  getProfile: () => ipcRenderer.invoke('getProfile'),
  getUsers: (search: IGetData) => ipcRenderer.invoke('getUsers', search),

  updateUser: (data: IFormData, userId: string) =>
    ipcRenderer.invoke('updateUser', data, userId),
  deleteUser: (id: string) => ipcRenderer.invoke('deleteUser', id),

  //event
  getEventById: (eventId: string) =>
    ipcRenderer.invoke('getEventById', eventId),
  getEvents: (search: IGetData) => ipcRenderer.invoke('getEvents', search),
  createEvent: (data: IEventFormData) =>
    ipcRenderer.invoke('createEvent', data),
  updateEvent: (data: IEventFormData, eventId: string) =>
    ipcRenderer.invoke('updateEvent', data, eventId),
  deleteEvent: (eventId: string) => ipcRenderer.invoke('deleteEvent', eventId),

  //image
  uploadImage: (fileData: { buffer: Buffer; name: string; type: string }) =>
    ipcRenderer.invoke('uploadImage', fileData),
  createBuffer: (arrayBuffer: ArrayBuffer) => Buffer.from(arrayBuffer),

  //application
  getApplications: (data: IGetData) =>
    ipcRenderer.invoke('getApplications', data),
  createApplication: (data: IApplicationData) =>
    ipcRenderer.invoke('createApplication', data),
  sendStatusApplication: (status: string, id: string) =>
    ipcRenderer.invoke('sendStatusApplication', status, id),

  //reservations
  getReservations: (data: IGetData) =>
    ipcRenderer.invoke('getReservations', data),

  //category
  getCategories: () => ipcRenderer.invoke('getCategories'),
  createCategory: (data: ICategory) =>
    ipcRenderer.invoke('createCategory', data),
  updateCategory: (data: ICategory, id: string) =>
    ipcRenderer.invoke('updateCategory', data, id),
  deleteCategory: (id: string) => ipcRenderer.invoke('deleteCategory', id),

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
