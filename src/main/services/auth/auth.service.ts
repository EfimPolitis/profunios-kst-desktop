import type { IAuthResponse, IFormData } from '@shared/types/auth.types'

import { axiosClassic, axiosWithAuth } from '@/api/interseptors'

import {
  getRefreshToken,
  removeFromStorage,
  saveAccessToken,
  saveRefreshToken
} from './auth.helper'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken'
}

export const authService = {
  async main(type: 'login' | 'register', data: IFormData) {
    const { request, config, headers, ...response } =
      type === 'login'
        ? await axiosClassic.post<IAuthResponse>(`/auth/login`, data)
        : await axiosWithAuth.post(`/auth/register`, data)

    const accessToken = response?.data.accessToken
    const refreshToken = getRefreshToken(headers)

    if (accessToken && refreshToken) {
      saveAccessToken(accessToken)
      saveRefreshToken(refreshToken)
    }

    return response
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>('/auth/login/access-token')

    if (response.data.accessToken) saveAccessToken(response.data.accessToken)

    return response
  },

  async logout() {
    removeFromStorage()
    // const response = await axiosClassic.post<boolean>('/auth/logout')

    // console.log(response)

    // if (response.data)

    // return response
  }
}
