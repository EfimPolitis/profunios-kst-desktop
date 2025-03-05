import type {
  IEvent,
  IEventFormData,
  IResponseEvents
} from '@shared/types/event.types'
import type { IQueryParam } from '@shared/types/filter.types'

import { axiosClassic, axiosWithAuth } from '../api/interseptors'

export const eventService = {
  async getAll(queryData = {} as IQueryParam) {
    const { headers, config, request, ...response } =
      await axiosClassic.get<IResponseEvents>('/event', {
        params: queryData
      })

    return response
  },

  async getById(eventId: string) {
    const { headers, config, request, ...response } =
      await axiosClassic.get<IEvent>(`/event/${eventId}`)

    return response
  },

  async create(data: IEventFormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post(
      `/event`,
      data
    )
    return response
  },

  async update(data: IEventFormData, eventId: string) {
    const { headers, config, request, ...response } = await axiosWithAuth.patch(
      `/event/${eventId}`,
      data
    )
    return response
  },

  async delete(eventId: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`/event/${eventId}`)

    return response
  },

  async uploadImage(formData: FormData) {
    const { headers, config, request, ...response } = await axiosWithAuth.post<{
      url: string
      id: string
    }>('/event/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  },

  async deleteImage(fileName: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`/event/image/${fileName}`)

    return response
  }
}
