import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import { IApplicationData } from '@shared/types/application.types'
import { IFormData } from '@shared/types/auth.types'
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
  createApplication: (data: IApplicationData) =>
    ipcRenderer.invoke('createApplication', data),

  //category
  getCategories: () => ipcRenderer.invoke('getCategories'),

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
