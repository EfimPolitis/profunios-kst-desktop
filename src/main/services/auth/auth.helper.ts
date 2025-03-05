import { session } from 'electron'

import { API_URL } from '@shared/constants/api.constants'

import { EnumTokens } from './auth.service'

export const getAccessToken = async () => {
  const cookies = await session.defaultSession.cookies.get({ url: API_URL })
  const accessToken = cookies.find(cookie => cookie.name === 'accessToken')
  return accessToken ? accessToken.value : null
}

export const getRefreshTokenFromCookie = async () => {
  const cookies = await session.defaultSession.cookies.get({ url: API_URL })
  const refreshToken = cookies.find(cookie => cookie.name === 'refreshToken')
  return refreshToken ? refreshToken.value : null
}

export const getRefreshToken = (headers: Record<string, any>) => {
  if (headers['set-cookie'] && Array.isArray(headers['set-cookie'])) {
    const cookieString = headers['set-cookie'].find((cookie: string) =>
      cookie.startsWith('refreshToken=')
    )

    if (cookieString) {
      const match = cookieString.match(/refreshToken=([^;]+)/)
      return match ? match[1] : null
    }
  }
  return null
}

export const saveAccessToken = async (accessToken: string) => {
  const date = Date.now() + 60 * 60 * 1000
  session.defaultSession.cookies.set({
    url: API_URL,
    name: EnumTokens.ACCESS_TOKEN,
    value: accessToken,
    expirationDate: date
  })
}

export const saveRefreshToken = async (refreshToken: string) => {
  const date = Date.now() + 7 * 24 * 60 * 60 * 1000
  session.defaultSession.cookies.set({
    url: API_URL,
    name: EnumTokens.REFRESH_TOKEN,
    value: refreshToken,
    expirationDate: date,
    secure: true,
    httpOnly: true
  })
}

export const removeFromStorage = () => {
  session.defaultSession.cookies.remove(API_URL, EnumTokens.ACCESS_TOKEN)
  session.defaultSession.cookies.remove(API_URL, EnumTokens.REFRESH_TOKEN)
}
