import { ElectronAPI } from '@electron-toolkit/preload'
import { AxiosResponse } from 'axios'

import type {
  IApplicationData,
  IResponeApplications
} from '@shared/types/application.types'
import type { IFormData } from '@shared/types/auth.types'
import type {
  ICategory,
  IResponseCategories
} from '@shared/types/category.types'
import type {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@shared/types/event.types'
import type { IQueryParam } from '@shared/types/filter.types'
import type {
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
        queryData: IQueryParam
      ) => AxiosResponse<IResponseUsers, any> | undefined
      updateUser: (data: IFormData, userId: string) => Promise<any>
      deleteUser: (id: string) => Promise<any>

      //event
      getEventById: (eventId: string) => AxiosResponse<IEvent, any> | undefined
      getEvents: (
        queryData: IQueryParam
      ) => AxiosResponse<IResponseEvents, any> | undefined
      createEvent: (data: IEventFormData) => Promise<any>
      updateEvent: (data: IEventFormData, eventId: string) => Promise<any>
      deleteEvent: (eventId: string) => Promise<any>

      //applications
      getApplications: (
        queryData: IQueryParam
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
        queryData: IQueryParam
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
