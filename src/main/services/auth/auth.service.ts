import type {
  IAuthFormData,
  IAuthResponse,
  IChangePasswordFormData
} from '@shared/types/auth.types'
import { ERole } from '@shared/types/user.types'

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

    if (type === 'login' && response.data.user.role !== ERole.USER) {
      const accessToken = response?.data.accessToken
      const refreshToken = getRefreshToken(headers)

      if (accessToken && refreshToken) {
        saveAccessToken(accessToken)
        saveRefreshToken(refreshToken)
      }
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
  },

  async changePassword(data: IChangePasswordFormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post(
      '/auth/change-password',
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }
    )

    return response
  }
}
