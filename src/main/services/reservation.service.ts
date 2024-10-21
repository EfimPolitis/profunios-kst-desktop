import { API_URL } from '@shared/constants/api.constants'

import { IQueryParam } from '@shared/types/filter.types'
import { IResponseReservations } from '@shared/types/reservation.types'

import { axiosWithAuth } from '../api/interseptors'

export const reservationService = {
  async getAll(queryData = {} as IQueryParam) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.get<IResponseReservations>(`${API_URL}/reservation`, {
        params: queryData
      })
    return response
  },

  async delete(id: string) {
    const { headers, config, request, ...response } =
      await axiosWithAuth.delete(`${API_URL}/reservation/${id}`)
    return response
  }
}
