import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import { IFormData } from '@shared/types/auth.types'
import { IEventFormData } from '@shared/types/event.types'
import { IGetData } from '@shared/types/sort.types'

// Custom APIs for renderer
const api = {
  //auth
  auth: (type: 'login' | 'register', data: IFormData) =>
    ipcRenderer.invoke('auth', type, data),
  logout: () => ipcRenderer.invoke('logout'),
  getProfile: () => ipcRenderer.invoke('getProfile'),
  getAccessToken: () => ipcRenderer.invoke('getAccessToken'),

  //user
  getUser: (userId: string) => ipcRenderer.invoke('getUser', userId),
  getUsers: (search: IGetData) => ipcRenderer.invoke('getUsers', search),
  updateUser: (data: IFormData, userId: string) =>
    ipcRenderer.invoke('updateUser', data, userId),

  //event
  getEvent: (eventId: string) => ipcRenderer.invoke('getEvent', eventId),
  getEvents: (search: IGetData) => ipcRenderer.invoke('getEvents', search),
  createEvents: (data: IEventFormData) =>
    ipcRenderer.invoke('createEvents', data),
  updateEvents: (data: IEventFormData, eventId: string) =>
    ipcRenderer.invoke('updateEvents', data, eventId),
  deleteEvents: (eventId: string) =>
    ipcRenderer.invoke('deleteEvents', eventId),

  //window
  setWindowSize: (width: number, height: number, x: number, y: number) => {
    ipcRenderer.invoke('setWindowSize', width, height, x, y)
  }
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
