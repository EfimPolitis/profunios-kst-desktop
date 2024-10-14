import { ElectronAPI } from '@electron-toolkit/preload'
import { AxiosResponse } from 'axios'

import { IApplicationData } from '@shared/types/application.types'
import { IFormData } from '@shared/types/auth.types'
import { IResponseCategories } from '@shared/types/category.types'
import {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@shared/types/event.types'
import { IGetData } from '@shared/types/sort.types'
import { IResponseUsers, IUser } from '@shared/types/user.types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      //auth
      auth: (
        type: 'login' | 'register',
        data: IFormData
      ) => Promise<IAuthResponse>
      logout: () => any
      getAccessToken: () => Promise<string | null>

      //user
      getUser: (userId: string) => AxiosResponse<IUser, any> | undefined
      getProfile: () => Promise<IProfileResponse>
      getUsers: (
        search: IGetData
      ) => AxiosResponse<IResponseUsers, any> | undefined
      updateUser: (data: IFormData, userId: string) => Promise<any>

      //event
      getEventById: (eventId: string) => AxiosResponse<IEvent, any> | undefined
      getEvents: (
        search: IGetData
      ) => AxiosResponse<IResponseEvents, any> | undefined
      createEvent: (data: IEventFormData) => Promise<any>
      updateEvent: (data: IEventFormData, eventId: string) => Promise<any>
      deleteEvent: (eventId: string) => Promise<any>

      //image
      uploadImage: (fileData: {
        buffer: Buffer
        name: string
        type: string
      }) => AxiosResponse<
        {
          url: string
          id: string
        },
        any
      >
      createBuffer: (arrayBuffer: ArrayBuffer) => any

      //application
      createApplication: (data: IApplicationData) => Promise<any>

      //category
      getCategories: () => Promise<AxiosResponse<IResponseCategories[], any>>

      //window
      setTitle: (title: string) => null
      setWindowSize: (
        width: number,
        height: number,
        x: number,
        y: number
      ) => null
    }
  }
}
