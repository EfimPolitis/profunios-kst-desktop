class UrlPages {
  private root = '/'

  LOGIN = `${this.root}login`

  PROFILE = `${this.root}profile`

  MANAGE_USERS = `${this.root}users`
  CREATE_USER = `${this.MANAGE_USERS}/create`
  EDIT_USER = `${this.MANAGE_USERS}/edit`

  MANAGE_EVENTS = `${this.root}events`
  CREATE_EVENT = `${this.MANAGE_EVENTS}/create`
  EDIT_EVENT = `${this.MANAGE_EVENTS}/edit`

  MANAGE_NEWS = `${this.root}news`
  CREATE_NEWS = `${this.MANAGE_NEWS}/create`
  EDIT_NEWS = `${this.MANAGE_NEWS}/edit`

  MANAGE_APPLICATIONS = `${this.root}applications`
  MANAGE_CATEGORY = `${this.root}categories`

  CHANGE_PASSWORD = `${this.root}change-password`
  RESET_PASSORD = `${this.root}reset-password`

  REQUEST_EMAIL = `${this.root}request-email`

  OFFLINE = `${this.root}offline`
}

export const URL_PAGES = new UrlPages()
