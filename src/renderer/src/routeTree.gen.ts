/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutUsersIndexImport } from './routes/_layout/users/index'
import { Route as LayoutNewsIndexImport } from './routes/_layout/news/index'
import { Route as LayoutEventsIndexImport } from './routes/_layout/events/index'
import { Route as LayoutCategoriesIndexImport } from './routes/_layout/categories/index'
import { Route as LayoutApplicationsIndexImport } from './routes/_layout/applications/index'
import { Route as LayoutUsersCreateImport } from './routes/_layout/users/create'
import { Route as LayoutNewsCreateImport } from './routes/_layout/news/create'
import { Route as LayoutNewsNewsIdImport } from './routes/_layout/news/$newsId'
import { Route as LayoutEventsCreateImport } from './routes/_layout/events/create'
import { Route as LayoutEventsEventIdImport } from './routes/_layout/events/$eventId'
import { Route as LayoutUsersEditUserIdImport } from './routes/_layout/users/edit.$userId'
import { Route as LayoutNewsEditNewsIdImport } from './routes/_layout/news/edit.$newsId'
import { Route as LayoutEventsEditEventIdImport } from './routes/_layout/events/edit.$eventId'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutUsersIndexRoute = LayoutUsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutNewsIndexRoute = LayoutNewsIndexImport.update({
  id: '/news/',
  path: '/news/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutEventsIndexRoute = LayoutEventsIndexImport.update({
  id: '/events/',
  path: '/events/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutCategoriesIndexRoute = LayoutCategoriesIndexImport.update({
  id: '/categories/',
  path: '/categories/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutApplicationsIndexRoute = LayoutApplicationsIndexImport.update({
  id: '/applications/',
  path: '/applications/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutUsersCreateRoute = LayoutUsersCreateImport.update({
  id: '/users/create',
  path: '/users/create',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutNewsCreateRoute = LayoutNewsCreateImport.update({
  id: '/news/create',
  path: '/news/create',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutNewsNewsIdRoute = LayoutNewsNewsIdImport.update({
  id: '/news/$newsId',
  path: '/news/$newsId',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutEventsCreateRoute = LayoutEventsCreateImport.update({
  id: '/events/create',
  path: '/events/create',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutEventsEventIdRoute = LayoutEventsEventIdImport.update({
  id: '/events/$eventId',
  path: '/events/$eventId',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutUsersEditUserIdRoute = LayoutUsersEditUserIdImport.update({
  id: '/users/edit/$userId',
  path: '/users/edit/$userId',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutNewsEditNewsIdRoute = LayoutNewsEditNewsIdImport.update({
  id: '/news/edit/$newsId',
  path: '/news/edit/$newsId',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutEventsEditEventIdRoute = LayoutEventsEditEventIdImport.update({
  id: '/events/edit/$eventId',
  path: '/events/edit/$eventId',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_layout/events/$eventId': {
      id: '/_layout/events/$eventId'
      path: '/events/$eventId'
      fullPath: '/events/$eventId'
      preLoaderRoute: typeof LayoutEventsEventIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/events/create': {
      id: '/_layout/events/create'
      path: '/events/create'
      fullPath: '/events/create'
      preLoaderRoute: typeof LayoutEventsCreateImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/news/$newsId': {
      id: '/_layout/news/$newsId'
      path: '/news/$newsId'
      fullPath: '/news/$newsId'
      preLoaderRoute: typeof LayoutNewsNewsIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/news/create': {
      id: '/_layout/news/create'
      path: '/news/create'
      fullPath: '/news/create'
      preLoaderRoute: typeof LayoutNewsCreateImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/users/create': {
      id: '/_layout/users/create'
      path: '/users/create'
      fullPath: '/users/create'
      preLoaderRoute: typeof LayoutUsersCreateImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/applications/': {
      id: '/_layout/applications/'
      path: '/applications'
      fullPath: '/applications'
      preLoaderRoute: typeof LayoutApplicationsIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/categories/': {
      id: '/_layout/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof LayoutCategoriesIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/events/': {
      id: '/_layout/events/'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof LayoutEventsIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/news/': {
      id: '/_layout/news/'
      path: '/news'
      fullPath: '/news'
      preLoaderRoute: typeof LayoutNewsIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/users/': {
      id: '/_layout/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof LayoutUsersIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/events/edit/$eventId': {
      id: '/_layout/events/edit/$eventId'
      path: '/events/edit/$eventId'
      fullPath: '/events/edit/$eventId'
      preLoaderRoute: typeof LayoutEventsEditEventIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/news/edit/$newsId': {
      id: '/_layout/news/edit/$newsId'
      path: '/news/edit/$newsId'
      fullPath: '/news/edit/$newsId'
      preLoaderRoute: typeof LayoutNewsEditNewsIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/users/edit/$userId': {
      id: '/_layout/users/edit/$userId'
      path: '/users/edit/$userId'
      fullPath: '/users/edit/$userId'
      preLoaderRoute: typeof LayoutUsersEditUserIdImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutEventsEventIdRoute: typeof LayoutEventsEventIdRoute
  LayoutEventsCreateRoute: typeof LayoutEventsCreateRoute
  LayoutNewsNewsIdRoute: typeof LayoutNewsNewsIdRoute
  LayoutNewsCreateRoute: typeof LayoutNewsCreateRoute
  LayoutUsersCreateRoute: typeof LayoutUsersCreateRoute
  LayoutApplicationsIndexRoute: typeof LayoutApplicationsIndexRoute
  LayoutCategoriesIndexRoute: typeof LayoutCategoriesIndexRoute
  LayoutEventsIndexRoute: typeof LayoutEventsIndexRoute
  LayoutNewsIndexRoute: typeof LayoutNewsIndexRoute
  LayoutUsersIndexRoute: typeof LayoutUsersIndexRoute
  LayoutEventsEditEventIdRoute: typeof LayoutEventsEditEventIdRoute
  LayoutNewsEditNewsIdRoute: typeof LayoutNewsEditNewsIdRoute
  LayoutUsersEditUserIdRoute: typeof LayoutUsersEditUserIdRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutEventsEventIdRoute: LayoutEventsEventIdRoute,
  LayoutEventsCreateRoute: LayoutEventsCreateRoute,
  LayoutNewsNewsIdRoute: LayoutNewsNewsIdRoute,
  LayoutNewsCreateRoute: LayoutNewsCreateRoute,
  LayoutUsersCreateRoute: LayoutUsersCreateRoute,
  LayoutApplicationsIndexRoute: LayoutApplicationsIndexRoute,
  LayoutCategoriesIndexRoute: LayoutCategoriesIndexRoute,
  LayoutEventsIndexRoute: LayoutEventsIndexRoute,
  LayoutNewsIndexRoute: LayoutNewsIndexRoute,
  LayoutUsersIndexRoute: LayoutUsersIndexRoute,
  LayoutEventsEditEventIdRoute: LayoutEventsEditEventIdRoute,
  LayoutNewsEditNewsIdRoute: LayoutNewsEditNewsIdRoute,
  LayoutUsersEditUserIdRoute: LayoutUsersEditUserIdRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/events/$eventId': typeof LayoutEventsEventIdRoute
  '/events/create': typeof LayoutEventsCreateRoute
  '/news/$newsId': typeof LayoutNewsNewsIdRoute
  '/news/create': typeof LayoutNewsCreateRoute
  '/users/create': typeof LayoutUsersCreateRoute
  '/applications': typeof LayoutApplicationsIndexRoute
  '/categories': typeof LayoutCategoriesIndexRoute
  '/events': typeof LayoutEventsIndexRoute
  '/news': typeof LayoutNewsIndexRoute
  '/users': typeof LayoutUsersIndexRoute
  '/events/edit/$eventId': typeof LayoutEventsEditEventIdRoute
  '/news/edit/$newsId': typeof LayoutNewsEditNewsIdRoute
  '/users/edit/$userId': typeof LayoutUsersEditUserIdRoute
}

export interface FileRoutesByTo {
  '': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/events/$eventId': typeof LayoutEventsEventIdRoute
  '/events/create': typeof LayoutEventsCreateRoute
  '/news/$newsId': typeof LayoutNewsNewsIdRoute
  '/news/create': typeof LayoutNewsCreateRoute
  '/users/create': typeof LayoutUsersCreateRoute
  '/applications': typeof LayoutApplicationsIndexRoute
  '/categories': typeof LayoutCategoriesIndexRoute
  '/events': typeof LayoutEventsIndexRoute
  '/news': typeof LayoutNewsIndexRoute
  '/users': typeof LayoutUsersIndexRoute
  '/events/edit/$eventId': typeof LayoutEventsEditEventIdRoute
  '/news/edit/$newsId': typeof LayoutNewsEditNewsIdRoute
  '/users/edit/$userId': typeof LayoutUsersEditUserIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/_layout/events/$eventId': typeof LayoutEventsEventIdRoute
  '/_layout/events/create': typeof LayoutEventsCreateRoute
  '/_layout/news/$newsId': typeof LayoutNewsNewsIdRoute
  '/_layout/news/create': typeof LayoutNewsCreateRoute
  '/_layout/users/create': typeof LayoutUsersCreateRoute
  '/_layout/applications/': typeof LayoutApplicationsIndexRoute
  '/_layout/categories/': typeof LayoutCategoriesIndexRoute
  '/_layout/events/': typeof LayoutEventsIndexRoute
  '/_layout/news/': typeof LayoutNewsIndexRoute
  '/_layout/users/': typeof LayoutUsersIndexRoute
  '/_layout/events/edit/$eventId': typeof LayoutEventsEditEventIdRoute
  '/_layout/news/edit/$newsId': typeof LayoutNewsEditNewsIdRoute
  '/_layout/users/edit/$userId': typeof LayoutUsersEditUserIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/events/$eventId'
    | '/events/create'
    | '/news/$newsId'
    | '/news/create'
    | '/users/create'
    | '/applications'
    | '/categories'
    | '/events'
    | '/news'
    | '/users'
    | '/events/edit/$eventId'
    | '/news/edit/$newsId'
    | '/users/edit/$userId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/login'
    | '/events/$eventId'
    | '/events/create'
    | '/news/$newsId'
    | '/news/create'
    | '/users/create'
    | '/applications'
    | '/categories'
    | '/events'
    | '/news'
    | '/users'
    | '/events/edit/$eventId'
    | '/news/edit/$newsId'
    | '/users/edit/$userId'
  id:
    | '__root__'
    | '/_layout'
    | '/login'
    | '/_layout/events/$eventId'
    | '/_layout/events/create'
    | '/_layout/news/$newsId'
    | '/_layout/news/create'
    | '/_layout/users/create'
    | '/_layout/applications/'
    | '/_layout/categories/'
    | '/_layout/events/'
    | '/_layout/news/'
    | '/_layout/users/'
    | '/_layout/events/edit/$eventId'
    | '/_layout/news/edit/$newsId'
    | '/_layout/users/edit/$userId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/login"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/events/$eventId",
        "/_layout/events/create",
        "/_layout/news/$newsId",
        "/_layout/news/create",
        "/_layout/users/create",
        "/_layout/applications/",
        "/_layout/categories/",
        "/_layout/events/",
        "/_layout/news/",
        "/_layout/users/",
        "/_layout/events/edit/$eventId",
        "/_layout/news/edit/$newsId",
        "/_layout/users/edit/$userId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_layout/events/$eventId": {
      "filePath": "_layout/events/$eventId.tsx",
      "parent": "/_layout"
    },
    "/_layout/events/create": {
      "filePath": "_layout/events/create.tsx",
      "parent": "/_layout"
    },
    "/_layout/news/$newsId": {
      "filePath": "_layout/news/$newsId.tsx",
      "parent": "/_layout"
    },
    "/_layout/news/create": {
      "filePath": "_layout/news/create.tsx",
      "parent": "/_layout"
    },
    "/_layout/users/create": {
      "filePath": "_layout/users/create.tsx",
      "parent": "/_layout"
    },
    "/_layout/applications/": {
      "filePath": "_layout/applications/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/categories/": {
      "filePath": "_layout/categories/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/events/": {
      "filePath": "_layout/events/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/news/": {
      "filePath": "_layout/news/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/users/": {
      "filePath": "_layout/users/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/events/edit/$eventId": {
      "filePath": "_layout/events/edit.$eventId.tsx",
      "parent": "/_layout"
    },
    "/_layout/news/edit/$newsId": {
      "filePath": "_layout/news/edit.$newsId.tsx",
      "parent": "/_layout"
    },
    "/_layout/users/edit/$userId": {
      "filePath": "_layout/users/edit.$userId.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
