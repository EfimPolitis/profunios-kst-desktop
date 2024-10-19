import { API_URL } from '@shared/constants/api.constants'

import { IResponseReservations } from '@shared/types/reservation.types'
import { IGetData } from '@shared/types/sort.types'

import { getUrlForRequest } from '@shared/hooks/getUrlForRequest'

import { axiosWithAuth } from '../api/interseptors'

export const reservationService = {
  async getAll(data: IGetData) {
    const { url } = getUrlForRequest(data)

    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponseReservations>(
        `${API_URL}/reservation?${url}`
      )
    return response
  },

  async delete(id: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`${API_URL}/reservation/${id}`)
    return response
  }
}
