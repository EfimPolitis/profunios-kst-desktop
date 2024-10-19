import { ElectronAPI } from '@electron-toolkit/preload'
import { AxiosResponse } from 'axios'

import {
  IApplicationData,
  IResponeApplications
} from '@shared/types/application.types'
import { IFormData } from '@shared/types/auth.types'
import { ICategory, IResponseCategories } from '@shared/types/category.types'
import {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@shared/types/event.types'
import { IGetData } from '@shared/types/sort.types'
import {
  IProfileResponse,
  IResponseUsers,
  IUser
} from '@shared/types/user.types'

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
      deleteUser: (id: string) => Promise<any>

      //event
      getEventById: (eventId: string) => AxiosResponse<IEvent, any> | undefined
      getEvents: (
        search: IGetData
      ) => AxiosResponse<IResponseEvents, any> | undefined
      createEvent: (data: IEventFormData) => Promise<any>
      updateEvent: (data: IEventFormData, eventId: string) => Promise<any>
      deleteEvent: (eventId: string) => Promise<any>

      //applications
      getApplications: (
        data: IGetData
      ) => AxiosResponse<IResponeApplications, any> | undefined
      createApplication: (
        data: IApplicationData
      ) => Promise<AxiosResponse<IApplication, any>>
      sendStatusApplication: (
        status: string,
        id: string
      ) => Promise<AxiosResponse<IResponeApplications, any>>

      //reservations
      getReservations: (
        data: IGetData
      ) => AxiosResponse<IResponseReservations, any> | undefined

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

      //category
      getCategories: () => Promise<AxiosResponse<IResponseCategory[], any>>
      createCategory: (
        data: ICategory
      ) => Promise<AxiosResponse<IResponseCategory, any>>
      updateCategory: (
        data: ICategory,
        id: string
      ) => Promise<AxiosResponse<IResponseCategory, any>>
      deleteCategory: (id: string) => Promise<any>

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
