import { ElectronAPI } from '@electron-toolkit/preload'

import { IFormData } from '@shared/types/auth.types'
import { IEventFormData } from '@shared/types/event.types'
import { IGetData } from '@shared/types/sort.types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      //auth
      auth: (type: 'login' | 'register', data: IFormData) => any
      logout: () => any
      getProfile: () => Promise<any>
      getAccessToken: () => Promise<string | null>

      //user
      getUser: (userId: string) => Promise<any>
      getUsers: (search: IGetData) => Promise<any>
      updateUser: (data: IFormData, userId: string) => Promise<any>

      //event
      getEvent: (eventId: string) => Promise<any>
      getEvents: (search: IGetData) => Promise<any>
      createEvents: (data: IEventFormData) => Promise<any>
      updateEvents: (data: IEventFormData, eventId: string) => Promise<any>
      deleteEvents: (eventId: string) => Promise<any>

      //window
      setWindowSize: (
        width: number,
        height: number,
        x: number,
        y: number
      ) => null
    }
  }
}
