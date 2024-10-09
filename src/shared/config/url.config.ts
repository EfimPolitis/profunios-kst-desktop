class UrlPages {
  HOME = '/'
  LOGIN = '/login'

  MANAGE_USERS = '/users'
  CREATE_USER = `${this.MANAGE_USERS}/create`
  EDIT_USER = `${this.MANAGE_USERS}/edit`

  MANAGE_EVENTS = '/events'
  CREATE_EVENT = `${this.MANAGE_EVENTS}/create`
  EDIT_EVENT = `${this.MANAGE_EVENTS}/edit`

  MANAGE_RESERVATIONS = '/reservations'
  MANAGE_APPLICATIONS = '/applications'
  MANAGE_NEWS = '/news'
  MANAGE_CATEGORY = '/category'
  MANAGE_REPORTS = '/reports'
}

export const URL_PAGES = new UrlPages()
