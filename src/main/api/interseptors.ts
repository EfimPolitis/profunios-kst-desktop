import axios, { type CreateAxiosDefaults } from 'axios'

import { API_URL } from '@shared/constants/api.constants'

import { getAccessToken, removeFromStorage } from '../services/auth/auth.helper'
import { authService } from '../services/auth/auth.service'

import { errorCatch, getContentType } from './api.helper'

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true
}

export const axiosClassic = axios.create(axiosOptions)

export const axiosWithAuth = axios.create(axiosOptions)

axiosWithAuth.interceptors.request.use(async config => {
  const accessToken = await getAccessToken()

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage()
      }
    }

    throw error
  }
)
