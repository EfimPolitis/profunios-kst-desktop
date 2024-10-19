import { isDev } from './is-dev.constants'

export const API_URL = isDev
  ? 'http://localhost:5000/api'
  : 'https://profunions/api'
