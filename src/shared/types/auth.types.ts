import { IUser } from './user.types'

export interface IAuthForm {
  userName: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  user: IUser
}

export interface IFormData {
  userName: string
  firstName: string
  lastName: string
  middleName?: string
  email: string
  role: string
  password: string
}
