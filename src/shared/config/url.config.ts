class UrlPages {
  HOME = '/'
  LOGIN = '/login'

  MANAGE_USERS = '/users'
  CREATE_USER = `${this.MANAGE_USERS}/create`
  EDIT_USER = `${this.MANAGE_USERS}/edit`

  MANAGE_EVENTS = '/events'
  CREATE_EVENT = `${this.MANAGE_EVENTS}/create`
  EDIT_EVENT = `${this.MANAGE_EVENTS}/edit`

  MANAGE_NEWS = '/news'
  CREATE_NEWS = `${this.MANAGE_NEWS}/create`
  EDIT_NEWS = `${this.MANAGE_NEWS}/edit`

  MANAGE_APPLICATIONS = '/applications'
  MANAGE_CATEGORY = '/categories'
}

export const URL_PAGES = new UrlPages()
