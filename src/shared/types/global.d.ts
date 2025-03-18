import { ElectronAPI } from '@electron-toolkit/preload'
import { AxiosResponse } from 'axios'

import type {
  IApplicationData,
  IResponeApplications
} from '@shared/types/application.types'
import type {
  IAuthFormData,
  IChangePasswordFormData
} from '@shared/types/auth.types'
import type {
  ICategory,
  IResponseCategories
} from '@shared/types/category.types'
import type {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@shared/types/event.types'
import type {
  INews,
  INewsFormData,
  IResponseNews
} from '@shared/types/news.types'
import type { IQueryParam } from '@shared/types/query.types'
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
        data: IAuthFormData
      ) => Promise<IAuthResponse>
      logout: () => any
      getAccessToken: () => Promise<string | null>
      changePassword: (data: IChangePasswordFormData) => any

      //user
      getUser: (userId: string) => AxiosResponse<IUser, any> | undefined
      getProfile: () => AxiosResponse<IProfileResponse>
      getUsers: (
        queryData: IQueryParam
      ) => AxiosResponse<IResponseUsers, any> | undefined
      updateUser: (data: IAuthFormData, userId: string) => any
      deleteUser: (userId: string) => any

      //event
      getEventById: (eventId: string) => AxiosResponse<IEvent, any> | undefined
      getEvents: (
        queryData: IQueryParam
      ) => AxiosResponse<IResponseEvents, any> | undefined
      createEvent: (data: IEventFormData) => any
      updateEvent: (data: IEventFormData, eventId: string) => any
      deleteEvent: (eventId: string) => any

      //news
      getNewsById: (newsId: string) => AxiosResponse<INews, any> | undefined
      incrementView: (newsId: string) => any
      getNews: (
        queryData: IQueryParam
      ) => AxiosResponse<IResponseNews, any> | undefined
      createNews: (data: INewsFormData) => any
      updateNews: (data: INewsFormData, newsId: string) => any
      deleteNews: (newsId: string) => any

      //applications
      getApplications: (
        queryData: IQueryParam
      ) => AxiosResponse<IResponeApplications, any> | undefined
      createApplication: (data: IApplicationData) => any

      //buffer
      createBuffer: (arrayBuffer: ArrayBuffer) => any

      //category
      getCategories: (
        queryData?: IQueryParam
      ) => Promise<AxiosResponse<IResponseCategory[], any>>
      createCategory: (data: ICategory) => any
      updateCategory: (data: ICategory, id: string) => any
      deleteCategory: (id: string) => any

      //image
      uploadImage: (
        fileData: {
          buffer: Buffer
          name: string
          type: string
        },
        entity: 'event' | 'news'
      ) => AxiosResponse<
        {
          url: string
          id: string
        },
        any
      >
      deleteImage: (
        fileName: string,
        entity: 'event' | 'news'
      ) => AxiosResponse<any>

      //report
      getReport: (entity: 'event' | 'application' | 'user') => any

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
