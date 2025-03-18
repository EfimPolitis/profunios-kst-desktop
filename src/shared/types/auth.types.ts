import type { IUser } from './user.types'

export interface IAuthForm {
  userName: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  user: IUser
}

export interface IAuthFormData {
  userName: string
  firstName: string
  lastName: string
  middleName?: string
  email: string
  role: string
  password: string
}

export interface IChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface IResetPasswordForm {
  newPassword: string
  confirmPassword: string
}
