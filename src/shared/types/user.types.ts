export enum ERole {
  ADMIN = 'ADMIN',
  MODER = 'MODER',
  USER = 'USER'
}

export interface IUser {
  userId: string
  firstName: string
  lastName: string
  middleName: string
  userName: string
  email: string
  password: string
  role: ERole
  createdAt: string
  updatedAt: string
}

export interface IResponseUsers {
  items: IUser[]
  countPage: number
}

export interface IProfileResponse {
  userId: string
  userName: string
  firstName: string
  lastName: string
  middleName?: string
  role: string
}
