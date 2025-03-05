import type { IAuthFormData, IAuthResponse } from '@shared/types/auth.types'

import { axiosClassic, axiosWithAuth } from '../../api/interseptors'

import {
  getRefreshToken,
  getRefreshTokenFromCookie,
  removeFromStorage,
  saveAccessToken,
  saveRefreshToken
} from './auth.helper'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken'
}

export const authService = {
  async main(type: 'login' | 'register', data: IAuthFormData) {
    const { request, config, headers, ...response } =
      type === 'login'
        ? await axiosClassic.post<IAuthResponse>('/auth/login', data)
        : await axiosWithAuth.post('/auth/register', data)

    const accessToken = response?.data.accessToken
    const refreshToken = getRefreshToken(headers)

    if (accessToken && refreshToken) {
      saveAccessToken(accessToken)
      saveRefreshToken(refreshToken)
    }

    return response
  },

  async getNewTokens() {
    const refreshTokenFromCookie = await getRefreshTokenFromCookie()

    if (!refreshTokenFromCookie) removeFromStorage()

    const { headers, config, request, ...response } =
      await axiosClassic.post<IAuthResponse>(
        '/auth/login/access-token',
        {},
        {
          withCredentials: true,
          headers: {
            Cookie: `refreshToken=${refreshTokenFromCookie}`
          }
        }
      )

    const accessToken = response?.data.accessToken
    const refreshToken = getRefreshToken(headers)

    if (accessToken && refreshToken) {
      saveAccessToken(accessToken)
      saveRefreshToken(refreshToken)
    }

    return response
  },

  async logout() {
    removeFromStorage()
  }
}
