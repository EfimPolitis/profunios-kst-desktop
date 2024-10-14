import { API_URL } from '@shared/constants/api.constants'

import type {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@shared/types/event.types'
import type { IGetData } from '@shared/types/sort.types'

import { getUrlForRequest } from '@shared/hooks/getUrlForRequest'

import { axiosClassic, axiosWithAuth } from '../api/interseptors'

export const eventService = {
  async getAll(data: IGetData) {
    const { url } = getUrlForRequest(data)
    const { headers, config, request, ...response } =
      await axiosClassic.get<IResponseEvents>(`${API_URL}/event?${url}`)

    return response
  },

  async getById(eventId: string) {
    const { headers, config, request, ...response } =
      await axiosClassic.get<IEvent>(`${API_URL}/event/${eventId}`)

    return response
  },

  async create(data: IEventFormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post(
      `${API_URL}/event`,
      data
    )
    return response
  },

  async update(data: IEventFormData, eventId: string) {
    const { headers, config, request, ...response } = await axiosWithAuth.patch(
      `${API_URL}/event/${eventId}`,
      data
    )
    return response
  },

  async delete(eventId: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`${API_URL}/event/${eventId}`)

    return response
  },

  async uploadImage(formData: FormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post<{
      url: string
      id: string
    }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  }
}
